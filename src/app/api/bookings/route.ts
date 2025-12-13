import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bookingSchema = z.object({
    patientName: z.string().min(2),
    condition: z.string().optional(),
    pickup: z.string().min(5),
    destination: z.string().min(5),
    type: z.string(),
    date: z.string(), // ISO date string
    userId: z.string().optional(),
    phone: z.string().min(10, "Phone number required"),
    alternatePhone: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = bookingSchema.parse(body);

        const booking = await prisma.booking.create({
            data: {
                patientName: validatedData.patientName,
                condition: validatedData.condition,
                pickup: validatedData.pickup,
                destination: validatedData.destination,
                type: validatedData.type,
                date: new Date(validatedData.date),
                status: "confirmed", // Auto-confirm for demo
                userId: validatedData.userId || undefined,
                guestPhone: validatedData.phone,
                alternatePhone: validatedData.alternatePhone,
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
