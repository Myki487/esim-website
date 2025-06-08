import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
		<div>
			<div className="relative h-64 w-full">
						<Image
							src="/privacy-bg.jpg"
							alt="About Us Background"
							fill
							className="object-cover opacity-40"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<h1 className="text-5xl font-bold text-white drop-shadow-lg">Privacy Policy</h1>
						</div>
					</div>
			<div className="max-w-4xl mx-auto py-10 px-4">
				<p className="mb-4">
					At TravelsGo, we value your privacy. This policy explains how we collect, use, and protect your personal information.
				</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">1. Information Collection</h2>
				<p className="mb-4">
					We collect your name, email, device info, and purchase history to provide and improve our eSIM services.
				</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">2. Data Usage</h2>
				<p className="mb-4">
					Your data is used strictly for service delivery, support, and communication regarding your purchases.
				</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">3. Security</h2>
				<p className="mb-4">
					We implement appropriate measures to protect your data. We do not sell or share your information with third parties.
				</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to Policy</h2>
				<p>
					We may update this policy as needed. Any major changes will be communicated via our platform.
				</p>
			</div>
		</div>
  );
}
