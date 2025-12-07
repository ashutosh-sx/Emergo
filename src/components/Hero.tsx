"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { LiveMap } from "./LiveMap";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none z-10" />

            <div className="container mx-auto px-4 z-20 relative">
                <div className="max-w-4xl">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold font-heading text-slate-900 leading-[1.1] mb-8"
                    >
                        Faster Than <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500 text-glow">
                            Fear.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed mb-10"
                    >
                        Book the nearest emergency ambulance in seconds and bring help when every moment matters.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/book">
                            <Button size="lg" variant="premium" className="h-16 px-10 text-xl w-full sm:w-auto rounded-2xl shadow-red-900/20 shadow-xl hover:scale-105 active:scale-95 transition-all">
                                <Phone className="mr-3 w-6 h-6" />
                                Book Ambulance Now
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="h-16 px-10 text-xl w-full sm:w-auto rounded-2xl border-2 hover:bg-slate-100 bg-white/80 backdrop-blur-md">
                            <Clock className="mr-3 w-6 h-6" />
                            Check Wait Times
                        </Button>
                    </motion.div>

                    {/* Stats / Trust Float */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200/60 pt-8"
                    >
                        <div>
                            <div className="text-3xl font-bold text-slate-900">1K+</div>
                            <div className="text-sm text-slate-500 font-medium">5 Star Ratings</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">24/7</div>
                            <div className="text-sm text-slate-500 font-medium">Command Center</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">5k+</div>
                            <div className="text-sm text-slate-500 font-medium">Lives Assisted</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block z-0"
            >
                <div className="relative w-full h-full">
                    <img
                        src="/hero-ambulance.png"
                        alt="Emergency Ambulance in Action"
                        className="object-cover w-full h-full opacity-90 mask-image-gradient"
                        style={{ maskImage: 'linear-gradient(to right, transparent, black 20%)' }}
                    />
                </div>
            </motion.div>

        </section>
    );
}
