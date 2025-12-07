"use client";

import { motion } from "framer-motion";
import { Stethoscope, HeartPulse, Truck, PhoneCall, Award, Users, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Rapid Deployment Fleet",
        desc: "GPS-enabled units stationed at strategic high-density zones.",
        icon: <Truck className="w-6 h-6 text-white" />,
        color: "bg-blue-500",
        className: "md:col-span-2",
    },
    {
        title: "ICU on Wheels",
        desc: "Ventilators, Defibrillators, and Oxygen on every certified unit.",
        icon: <HeartPulse className="w-6 h-6 text-white" />,
        color: "bg-red-500",
        className: "",
    },
    {
        title: "Tele-Medicine",
        desc: "Live video feed to ER doctors during transit.",
        icon: <Stethoscope className="w-6 h-6 text-white" />,
        color: "bg-indigo-500",
        className: "",
    },
    {
        title: "Zero-Surge Pricing",
        desc: "Fixed transparent rates even during peak emergencies or weather.",
        icon: <ShieldCheck className="w-6 h-6 text-white" />,
        color: "bg-green-500",
        className: "md:col-span-2",
    },
];

export function Features() {
    return (
        <section id="services" className="py-24 relative">
            <div className="container mx-auto px-4">

                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">
                        Engineered for <span className="text-primary">Survival</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Technology meets healthcare. We've redesigned the emergency response experience from the ground up.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                                item.className
                            )}
                        >
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg", item.color)}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed max-w-sm">
                                {item.desc}
                            </p>

                            {/* Decorative Gradient Blob */}
                            <div className={cn(
                                "absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity",
                                item.color
                            )} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
