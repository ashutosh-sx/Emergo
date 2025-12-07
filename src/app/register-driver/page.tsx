"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, CheckCircle2, ShieldCheck, Ambulance } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterDriverPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        licenseNumber: "",
        vehicleType: "Basic Life Support",
        vehicleRegNumber: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/driver/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Registration failed");
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Submitted!</h2>
                    <p className="text-slate-600 mb-8">
                        Your application has been received. Our team will verify your documents and approve your account within 24 hours.
                    </p>
                    <Button onClick={() => window.location.href = "/"} className="w-full">
                        Return Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50 px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

                {/* Info Section */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Ambulance size={200} />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Join Our Fleet</h1>
                        <p className="text-slate-300 mb-8">
                            Partner with Emergo and help save lives while earning efficiently. We provide the technology; you provide the care.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <ShieldCheck className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Verified Partner</h3>
                                    <p className="text-sm text-slate-400">Get the trusted badge and priority bookings.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Upload className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Easy Onboarding</h3>
                                    <p className="text-sm text-slate-400">Digital verification of your license and vehicle documents.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Driver Application</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={formData.name} onChange={handleChange} required placeholder="Driver Name" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 ..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="licenseNumber">Driving License Number</Label>
                            <Input id="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required placeholder="DL-..." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="vehicleType">Ambulance Type</Label>
                                <select
                                    id="vehicleType"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.vehicleType}
                                    onChange={handleChange}
                                >
                                    <option value="Basic Life Support">Basic</option>
                                    <option value="Advanced Life Support">ICU / Advanced</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vehicleRegNumber">Vehicle Reg No.</Label>
                                <Input id="vehicleRegNumber" value={formData.vehicleRegNumber} onChange={handleChange} required placeholder="MH-01-..." />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Submit Application
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
