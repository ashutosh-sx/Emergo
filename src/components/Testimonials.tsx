"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "The GPS tracking was a lifesaver. We knew exactly when help would arrive.",
        name: "Rohit Jaiswal",
        role: "Father",
        location: "Mumbai, MH"
    },
    {
        quote: "Professionalism at its peak. The ICU facilities inside were state-of-the-art.",
        name: "Dr. Priyanshu Sharma",
        role: "Cardiologist",
        location: "Delhi, DL"
    },
    {
        quote: "They arrived in 6 minutes. Fastest emergency response I've ever seen.",
        name: "Harsh Bharti",
        role: "Business Owner",
        location: "Bangalore, KA"
    },
    {
        quote: "Compassionate care during a very difficult time. Thank you Emergo.",
        name: "Ananya Iyer",
        role: "Teacher",
        location: "Chennai, TN"
    },
    {
        quote: "The app is so easy to use. One tap and help was on the way.",
        name: "Vikram Singh",
        role: "Software Engineer",
        location: "Hyderabad, TS"
    },
    {
        quote: "Exceptional service! They handled my grandmother with so much care.",
        name: "Meera Patel",
        role: "Architect",
        location: "Ahmedabad, GJ"
    }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 overflow-hidden">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-4xl font-bold font-heading mb-4 text-slate-900">
                    Trusted by <span className="text-primary">Thousands</span>
                </h2>
                <p className="text-slate-600">Real stories from families across India.</p>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradients to fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex gap-6 animate-scroll whitespace-nowrap py-4 hover:pause">
                    {[...testimonials, ...testimonials].map((item, i) => (
                        <div
                            key={i}
                            className="w-[400px] h-64 bg-white rounded-2xl shadow-sm hover:shadow-md p-8 border border-slate-100 flex-shrink-0 whitespace-normal flex flex-col justify-between transition-all"
                        >
                            <div>
                                <Quote className="text-red-100 w-10 h-10 mb-4" />
                                <p className="text-slate-700 text-lg leading-relaxed font-medium">"{item.quote}"</p>
                            </div>
                            <div className="flex items-center gap-4 mt-6">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{item.name}</div>
                                    <div className="text-sm text-slate-500">{item.role} • {item.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
