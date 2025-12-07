export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 prose prose-slate">
                    <p className="mb-4">
                        Emergo is dedicated to providing the fastest reliable ambulance service in India. Our mission is to save lives by reducing response times through technology.
                    </p>
                    <h2 className="text-xl font-bold mt-6 mb-2">Our Creator</h2>
                    <p>
                        This website is created by <strong>Ashutosh Saxena</strong>.
                        We are committed to excellence in emergency response.
                    </p>
                </div>
            </div>
        </div>
    );
}
