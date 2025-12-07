export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 prose prose-slate">
                    <p className="mb-4">
                        Effective Date: {new Date().toLocaleDateString()}
                    </p>
                    <p className="mb-4">
                        At Emergo, we prioritize your privacy. This policy outlines how we collect, use, and protect your personal information.
                    </p>
                    <h2 className="text-xl font-bold mt-6 mb-2">Credits</h2>
                    <p>
                        This website is created by <strong>Ashutosh Saxena</strong>. All rights reserved.
                    </p>
                    {/* Add more real policy content here as needed */}
                </div>
            </div>
        </div>
    );
}
