"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Fixed positions to avoid SSR hydration mismatch
const fixedCars = [
    { id: 0, x: 15, y: 25, duration: 18 },
    { id: 1, x: 45, y: 60, duration: 22 },
    { id: 2, x: 70, y: 35, duration: 15 },
    { id: 3, x: 25, y: 80, duration: 20 },
    { id: 4, x: 85, y: 50, duration: 25 },
];

export function LiveMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Only render animated content after client mount to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

            {/* Pulsing Ambulances */}
            {fixedCars.map((car) => (
                <motion.div
                    key={car.id}
                    initial={{ left: `${car.x}%`, top: `${car.y}%` }}
                    animate={{
                        left: [`${car.x}%`, `${(car.x + 15) % 90}%`, `${(car.x - 10 + 100) % 90}%`],
                        top: [`${car.y}%`, `${(car.y + 10) % 90}%`, `${(car.y - 15 + 100) % 90}%`],
                    }}
                    transition={{
                        duration: car.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                    }}
                    className="absolute w-3 h-3"
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-red-500 rounded-full shadow-[0_0_10px_2px_rgba(239,68,68,0.5)]" />
                        <div className="absolute -inset-2 bg-red-500/30 rounded-full animate-ping" />
                    </div>
                </motion.div>
            ))}

            {/* Radar Scan Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-red-500/10 rounded-full animate-[spin_10s_linear_infinite] opacity-30">
                <div className="w-full h-full rounded-full border-t border-r border-transparent border-t-red-500/30 bg-gradient-to-tr from-transparent to-red-500/5 rotate-45" />
            </div>
        </div>
    );
}
