import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-transparent -z-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-heading">
            Ready for the Future of Emergency Care?
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
            Download our app or save our hotline number. Be prepared for anything.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="inline-flex items-center justify-center h-16 px-8 rounded-full bg-white text-primary font-bold text-xl hover:bg-slate-100 transition-colors shadow-2xl">
              Book Ambulance
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
