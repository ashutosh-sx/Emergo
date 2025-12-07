"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Ambulance } from "lucide-react";

const steps = [
    {
        num: "01",
        title: "One-Tap Request",
        desc: "Use our app or hotline. Your location is instantly pinpointed via GPS.",
        icon: <Phone className="w-8 h-8" />
    },
    {
        num: "02",
        title: "Smart Dispatch",
        desc: "AI assigns the nearest available ICU unit based on live traffic data.",
        icon: <MapPin className="w-8 h-8" />
    },
    {
        num: "03",
        title: "Rapid Arrival",
        desc: "Track the ambulance in real-time as it reaches you in minutes.",
        icon: <Ambulance className="w-8 h-8" />
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">
                        How It Works
                    </h2>
                    <p className="text-slate-600 text-lg max-w-xl mx-auto">
                        Seamless coordination between you, our command center, and the fleet.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="relative text-center"
                        >
                            <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-slate-100 flex items-center justify-center mb-8 relative z-10 shadow-xl">
                                <span className="text-primary">{step.icon}</span>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold shadow-lg text-black">
                                    {step.num}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-slate-900">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed px-4">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
