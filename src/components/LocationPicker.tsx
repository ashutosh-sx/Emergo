"use client";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";
import { MapPin, Navigation, Building2 } from "lucide-react";

interface LocationPickerProps {
    onLocationSelect: (location: string, coords?: { lat: number; lng: number }) => void;
    label: string;
    showHospitals?: boolean;
}

const containerStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '0.75rem'
};

const defaultCenter = {
    lat: 28.6139, // New Delhi
    lng: 77.2090
};

// Mock hospitals for demo (when API key is not available)
const mockHospitals = [
    { name: "AIIMS Delhi", lat: 28.5672, lng: 77.2100, distance: "2.1 km" },
    { name: "Safdarjung Hospital", lat: 28.5686, lng: 77.2070, distance: "2.8 km" },
    { name: "Apollo Hospital", lat: 28.5421, lng: 77.2012, distance: "4.2 km" },
    { name: "Max Hospital", lat: 28.5653, lng: 77.2150, distance: "3.1 km" },
];

export function LocationPicker({ onLocationSelect, label, showHospitals = false }: LocationPickerProps) {
    const [marker, setMarker] = useState(defaultCenter);
    const [selectedHospital, setSelectedHospital] = useState<typeof mockHospitals[0] | null>(null);
    // Using the provided key directly if env var fails
    const hasKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarker({ lat, lng });
            onLocationSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`, { lat, lng });
        }
    }, [onLocationSelect]);

    const selectHospital = (hospital: typeof mockHospitals[0]) => {
        setMarker({ lat: hospital.lat, lng: hospital.lng });
        onLocationSelect(hospital.name, { lat: hospital.lat, lng: hospital.lng });
        setSelectedHospital(hospital);
    };

    // Fallback UI when no API key
    if (!hasKey) {
        return (
            <div className="space-y-3">
                <div className="w-full h-40 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-100 to-green-100" />
                    <div className="text-center p-4 relative z-10">
                        <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs text-slate-500 mb-2">Map Preview (API Key Required)</p>
                        <button
                            type="button"
                            onClick={() => onLocationSelect("Location Selected (Demo)")}
                            className="px-3 py-1.5 bg-white shadow-sm border rounded-lg text-xs font-semibold hover:bg-slate-50"
                        >
                            Select Location
                        </button>
                    </div>
                </div>

                {showHospitals && (
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <Building2 size={14} /> Nearby Hospitals
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {mockHospitals.map((h, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => selectHospital(h)}
                                    className={`text-left p-2 rounded-lg border text-xs transition-all ${selectedHospital?.name === h.name
                                        ? "border-primary bg-red-50"
                                        : "border-slate-200 hover:border-slate-300 bg-white"
                                        }`}
                                >
                                    <div className="font-semibold text-slate-800 truncate">{h.name}</div>
                                    <div className="text-slate-500">{h.distance}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Real map with Google Maps API
    return (
        <div className="space-y-3">
            {/* LoadScript is now handled by the parent page to prevent multiple script loads */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={12}
                onClick={handleMapClick}
            >
                <Marker position={marker} />

                {showHospitals && mockHospitals.map((h, i) => (
                    <Marker
                        key={i}
                        position={{ lat: h.lat, lng: h.lng }}
                        icon={"https://maps.google.com/mapfiles/ms/icons/hospitals.png"}
                        onClick={() => selectHospital(h)}
                    />
                ))}

                {selectedHospital && (
                    <InfoWindow
                        position={{ lat: selectedHospital.lat, lng: selectedHospital.lng }}
                        onCloseClick={() => setSelectedHospital(null)}
                    >
                        <div className="p-1">
                            <div className="font-bold text-sm">{selectedHospital.name}</div>
                            <div className="text-xs text-gray-600">{selectedHospital.distance}</div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>

            {showHospitals && (
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Building2 size={14} /> Nearby Hospitals
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {mockHospitals.map((h, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => selectHospital(h)}
                                className={`text-left p-2 rounded-lg border text-xs transition-all ${selectedHospital?.name === h.name
                                    ? "border-primary bg-red-50"
                                    : "border-slate-200 hover:border-slate-300 bg-white"
                                    }`}
                            >
                                <div className="font-semibold text-slate-800 truncate">{h.name}</div>
                                <div className="text-slate-500">{h.distance}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
