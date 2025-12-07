import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const bookingSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    pickup: z.string().min(5),
    destination: z.string().min(5),
    type: z.string(),
    date: z.string(), // ISO date string
    userId: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = bookingSchema.parse(body);

        const booking = await prisma.booking.create({
            data: {
                guestName: validatedData.name,
                guestPhone: validatedData.phone,
                pickup: validatedData.pickup,
                destination: validatedData.destination,
                type: validatedData.type,
                date: new Date(validatedData.date),
                status: "confirmed", // Auto-confirm for demo
                userId: validatedData.userId || undefined,
            },
        });

        return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { success: false, error: "Invalid data or server error" },
            { status: 400 }
        );
    }
}
