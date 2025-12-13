"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm border-white/20 py-3"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-24 h-12">
                        <Image
                            src="/logo-new.png"
                            alt="Emergo Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 shadow-sm gap-8">
                    <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/register-driver" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        Join as Driver
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        Stories
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 drop-shadow-[0_0_2px_rgba(6,182,212,0.5)]">Emergency Hotline</span>
                        <a href="tel:108" className="text-lg font-bold text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] hover:text-red-500 transition-colors leading-none">
                            108
                        </a>
                    </div>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold text-cyan-600 drop-shadow-[0_0_2px_rgba(8,145,178,0.3)] leading-none">{user.name}</p>
                                <button onClick={logout} className="text-[10px] font-medium text-red-500 hover:text-red-400 hover:underline">
                                    Sign Out
                                </button>
                            </div>
                            <Link href="/book">
                                <Button variant="premium" className="rounded-full px-6 shadow-red-500/20 shadow-lg">
                                    Book Now
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-500/20">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu size={24} />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 shadow-xl">
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="font-medium text-slate-900 border-b border-slate-50 pb-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link href="/about" className="font-medium text-slate-900 border-b border-slate-50 pb-2" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                        <Link href="/privacy" className="font-medium text-slate-900 border-b border-slate-50 pb-2" onClick={() => setMobileMenuOpen(false)}>Privacy Policy</Link>
                        <Link href="/register-driver" className="font-medium text-slate-900 border-b border-slate-50 pb-2" onClick={() => setMobileMenuOpen(false)}>Join as Driver</Link>

                        <div className="pt-2">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Customer Care</p>
                            <a href="mailto:support@emergo.com" className="text-red-600 font-medium">support@emergo.com</a>
                        </div>

                        {user ? (
                            <div className="pt-4 border-t border-slate-50 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.phone}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-red-600 text-white">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
