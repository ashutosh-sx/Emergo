"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Phone, Clock, Ambulance, CheckCircle2, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Libraries } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '1rem'
};

const center = {
    lat: 28.6139,
    lng: 77.2090
};

// Use a stable, static ID for the mock data to prevent hydration mismatches.
// In a real app, this ID comes from the backend via props.
const MOCK_BOOKING_ID = "EMG-8X92DL";

// Mock data (in a real app, this would come from the backend/props)
const rideData = {
    bookingId: MOCK_BOOKING_ID,
    driver: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        vehicle: "Tata Winger ICU",
        licensePlate: "DL 01 AB 1234"
    },
    pickup: "Connaught Place, New Delhi",
    destination: "AIIMS Delhi",
    eta: 15 // Initial estimate
};

const libraries: Libraries = ["places"];

export default function TrackPage() {
    const [eta, setEta] = useState<string | number>(rideData.eta);
    const [status, setStatus] = useState<"enroute" | "arriving" | "arrived">("enroute");
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [mapError, setMapError] = useState<string | null>(null);

    // Using simple fallback strings if API key is missing to avoid crash, but key is present
    const hasKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: hasKey,
        libraries,
    });

    const directionsCallback = (response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        if (status === 'OK' && response !== null) {
            if (response.routes[0]?.legs[0]?.duration?.text) {
                setEta(response.routes[0].legs[0].duration.text);
            }
            // Only update if we don't have a response yet to avoid infinite loops
            if (!directionsResponse) {
                setDirectionsResponse(response);
            }
        } else {
            // Only log and set error if it wasn't already set to avoid loops, and only if meaningful error
            if (!mapError && status !== 'OK') {
                console.error("Directions request failed due to " + status);
                if (status === 'REQUEST_DENIED' as any) {
                    setMapError("Map services are currently unavailable. Please verify API key permissions.");
                } else if (status !== 'OVER_QUERY_LIMIT' as any) {
                    // Don't show error for over query limit to avoid spam, just fallback
                    setMapError("Unable to calculate route at this time.");
                }
            }
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-2xl">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Track Your Ambulance</h1>
                    <p className="text-slate-500">Booking ID: <span className="font-mono font-bold">{rideData.bookingId}</span></p>
                </div>

                {/* Map Error Banner */}
                {mapError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-3"
                    >
                        <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-sm">Tracking Unavailable</p>
                            <p className="text-xs mt-1">{mapError}</p>
                        </div>
                    </motion.div>
                )}

                {/* Tracking Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`p-6 rounded-2xl mb-6 ${status === "arrived"
                        ? "bg-green-100 border-2 border-green-500"
                        : status === "arriving"
                            ? "bg-yellow-100 border-2 border-yellow-500"
                            : "bg-white border border-slate-200"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className={`text-sm font-semibold mb-1 ${status === "arrived" ? "text-green-700" : status === "arriving" ? "text-yellow-700" : "text-slate-500"
                                }`}>
                                {status === "arrived" ? "Ambulance Arrived!" : status === "arriving" ? "Almost There!" : "En Route"}
                            </div>
                            <div className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                                <Clock className="w-6 h-6" />
                                {status === "arrived" ? "Arrived" : eta}
                            </div>
                        </div>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${status === "arrived" ? "bg-green-500" : status === "arriving" ? "bg-yellow-500" : "bg-slate-900"
                            }`}>
                            {status === "arrived" ? (
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            ) : (
                                <Ambulance className="w-8 h-8 text-white" />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Real Google Map */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-200 rounded-2xl h-80 mb-6 relative overflow-hidden shadow-lg border-2 border-slate-100"
                >
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={12}
                        >
                            {/* Directions Service to fetch route */}
                            {!directionsResponse && !mapError && (
                                <DirectionsService
                                    options={{
                                        destination: rideData.destination,
                                        origin: rideData.pickup,
                                        travelMode: "DRIVING" as google.maps.TravelMode
                                    }}
                                    callback={directionsCallback}
                                />
                            )}

                            {/* Render the route on the map */}
                            {directionsResponse && (
                                <DirectionsRenderer
                                    options={{
                                        directions: directionsResponse
                                    }}
                                />
                            )}
                        </GoogleMap>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 animate-pulse">
                            <span className="text-slate-400 font-medium">Loading Map...</span>
                        </div>
                    )}
                </motion.div>

                {/* Driver Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 mb-6"
                >
                    <h3 className="font-bold text-slate-900 mb-4">Driver Details</h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
                            <User className="w-7 h-7 text-slate-500" />
                        </div>
                        <div>
                            <div className="font-bold text-lg text-slate-900">{rideData.driver.name}</div>
                            <div className="text-sm text-slate-500">{rideData.driver.vehicle}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <div className="text-slate-500 mb-1">License Plate</div>
                            <div className="font-mono font-bold">{rideData.driver.licensePlate}</div>
                        </div>
                        <a href={`tel:${rideData.driver.phone}`} className="bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors">
                            <div className="text-green-600 mb-1 flex items-center gap-1">
                                <Phone size={14} /> Call Driver
                            </div>
                            <div className="font-bold text-green-700">{rideData.driver.phone}</div>
                        </a>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="flex gap-4">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">
                        <Phone className="mr-2 w-4 h-4" />
                        Emergency: 108
                    </Button>
                </div>

            </div>
        </div>
    );
}
