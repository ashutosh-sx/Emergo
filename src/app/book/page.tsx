"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Ambulance, Cross, PhoneCall, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LocationPicker } from "@/components/LocationPicker";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

const bookingSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    pickup: z.string().min(5, "Pickup location is required"),
    destination: z.string().min(5, "Destination is required"),
    type: z.enum(["Basic", "ICU"]),
    date: z.string(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const libraries: Libraries = ["places"];

const ambulanceTypes = [
    {
        id: "Basic",
        title: "Basic Life Support",
        icon: <Ambulance className="w-6 h-6" />,
        desc: "For non-critical patients.",
        price: "₹1,500",
    },
    {
        id: "ICU",
        title: "ICU / Advanced",
        icon: <Cross className="w-6 h-6" />,
        desc: "Ventilator & critical care.",
        price: "₹4,500",
    },
];

export default function BookingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login?redirect=/book");
        }
    }, [user, loading, router]);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            type: "Basic",
            date: new Date().toISOString().split('T')[0],
            name: user?.name || "",
            phone: "",
        },
    });

    // Update form when user data is loaded
    useEffect(() => {
        if (user) {
            form.setValue("name", user.name);
        }
    }, [user, form]);

    const onSubmit = async (data: BookingFormValues) => {
        if (!user) return;

        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, userId: user.id }),
            });

            if (!response.ok) throw new Error("Failed to book");

            setSuccess(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-slate-600 mb-4">
                        An ambulance has been assigned. Our dispatch team will call you shortly.
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">Booking ID</span>
                            <span className="font-mono font-bold text-slate-900">EMG-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">ETA</span>
                            <span className="font-bold text-green-600">8-12 mins</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button onClick={() => window.location.href = "/track"} className="w-full bg-red-600 hover:bg-red-700 text-white">
                            <Navigation className="mr-2 w-4 h-4" />
                            Track Your Ride
                        </Button>
                        <Button onClick={() => window.location.href = "/"} variant="outline" className="w-full">
                            Return Home
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100"
                    >
                        <h1 className="text-3xl font-bold font-heading mb-6 text-slate-900">
                            Book an Ambulance
                        </h1>

                        {isLoaded ? (
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Patient Name</Label>
                                        <Input id="name" {...form.register("name")} placeholder="John Doe" />
                                        {form.formState.errors.name && (
                                            <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" {...form.register("phone")} placeholder="(555) 123-4567" />
                                        {form.formState.errors.phone && (
                                            <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Pickup Location</Label>
                                    <LocationPicker
                                        label="Pickup Location"
                                        onLocationSelect={(loc) => form.setValue("pickup", loc)}
                                    />
                                    <Input id="pickup" {...form.register("pickup")} placeholder="Or type manually..." className="mt-2" />
                                    {form.formState.errors.pickup && (
                                        <p className="text-red-500 text-xs">{form.formState.errors.pickup.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Destination Hospital</Label>
                                    <LocationPicker
                                        label="Destination"
                                        showHospitals={true}
                                        onLocationSelect={(loc) => form.setValue("destination", loc)}
                                    />
                                    <Input id="destination" {...form.register("destination")} placeholder="Or type hospital name..." className="mt-2" />
                                    {form.formState.errors.destination && (
                                        <p className="text-red-500 text-xs">{form.formState.errors.destination.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Ambulance Type</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {ambulanceTypes.map((type) => (
                                            <div
                                                key={type.id}
                                                onClick={() => form.setValue("type", type.id as any)}
                                                className={cn(
                                                    "cursor-pointer border-2 rounded-xl p-3 hover:bg-slate-50 transition-all",
                                                    form.watch("type") === type.id
                                                        ? "border-primary bg-red-50/50"
                                                        : "border-slate-100"
                                                )}
                                            >
                                                <div className={cn("mb-2", form.watch("type") === type.id ? "text-primary" : "text-slate-500")}>
                                                    {type.icon}
                                                </div>
                                                <div className="font-semibold text-sm">{type.title}</div>
                                                <div className="text-xs text-slate-500">{type.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" type="date" {...form.register("date")} />
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full text-lg h-12 bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Confirm Booking"
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div className="flex justify-center py-20">
                                <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
                            </div>
                        )}
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden md:block space-y-6"
                    >
                        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Emergency Assistance</h3>
                            <p className="text-slate-300 mb-6">
                                If this is a life-threatening emergency, please call 108 directly instead of using this form.
                            </p>
                            <div className="flex items-center gap-4 text-3xl font-bold bg-red-600 p-4 rounded-xl">
                                <PhoneCall className="w-8 h-8" />
                                108
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-4">Why Emergo?</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    GPS Tracking Live
                                </li>
                                <li className="flex items-center gap-2 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Instant Confirmation
                                </li>
                                <li className="flex items-center gap-2 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Insurance Compatible
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
