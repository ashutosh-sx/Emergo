import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Return success even if user not found to prevent enumeration, or return specific error if prefered for this practice app
            // For now, let's be honest for debugging
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Generate Token
        const token = randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 3600000); // 1 hour from now

        await prisma.user.update({
            where: { email },
            data: {
                resetToken: token,
                resetTokenExpiry: expiry,
            },
        });

        // Simulate sending email by logging to console
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;
        console.log("----------------------------------------");
        console.log("PASSWORD RESET LINK FOR:", email);
        console.log(resetLink);
        console.log("----------------------------------------");

        return NextResponse.json({ message: "Reset link sent" });
    } catch (error) {
        console.error("Forgot Password error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
