"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                            Emergo
                        </Link>
                        <p className="text-slate-400 text-sm mb-4">
                            Faster Than Fear. <br />
                            Created by Ashutosh Saxena.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Available at</h3>
                        <ul className="space-y-3 text-sm inline-block text-left">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                                <span>
                                    <span className="block text-white font-medium">Email Support</span>
                                    <a href="mailto:support@emergo.com" className="hover:text-white transition-colors">support@emergo.com</a>
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                                <span>
                                    <span className="block text-white font-medium">Headquarters</span>
                                    SH - 9 , Avalahalli , Yelahanka , <br />
                                    Bangalore , KA - 560064
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
