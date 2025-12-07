import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Basic server-side validation
        if (!data.name || !data.phone || !data.licenseNumber || !data.vehicleRegNumber) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const checkExisting = await prisma.driver.findFirst({
            where: {
                OR: [
                    { phone: data.phone },
                    { licenseNumber: data.licenseNumber },
                    { vehicleRegNumber: data.vehicleRegNumber }
                ]
            }
        });

        if (checkExisting) {
            return NextResponse.json({ error: "Driver or Vehicle already registered" }, { status: 400 });
        }

        const driver = await prisma.driver.create({
            data: {
                name: data.name,
                phone: data.phone,
                licenseNumber: data.licenseNumber,
                vehicleType: data.vehicleType,
                vehicleRegNumber: data.vehicleRegNumber,
                isVerified: false, // Default to unverified
            },
        });

        return NextResponse.json({ success: true, driverId: driver.id });
    } catch (error) {
        console.error("Driver Registration Error:", error);
        return NextResponse.json({ error: "Failed to register driver" }, { status: 500 });
    }
}
