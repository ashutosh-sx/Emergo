import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Basic server-side validation
        const requiredFields = ['name', 'phone', 'licenseNumber', 'vehicleRegNumber', 'driverPhoto', 'ambulanceFrontPhoto', 'ambulanceInsidePhoto', 'ambulanceSidePhoto', 'driverIdPhoto', 'driverLicensePhoto'];
        const missing = requiredFields.filter(field => !data[field]);

        if (missing.length > 0) {
            return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
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

                // Save Photos
                driverPhoto: data.driverPhoto,
                ambulanceFrontPhoto: data.ambulanceFrontPhoto,
                ambulanceInsidePhoto: data.ambulanceInsidePhoto,
                ambulanceSidePhoto: data.ambulanceSidePhoto,
                driverIdPhoto: data.driverIdPhoto,
                driverLicensePhoto: data.driverLicensePhoto,

                isVerified: false, // Default to unverified
            },
        });

        return NextResponse.json({ success: true, driverId: driver.id });
    } catch (error) {
        console.error("Driver Registration Error:", error);
        return NextResponse.json({ error: "Failed to register driver" }, { status: 500 });
    }
}
