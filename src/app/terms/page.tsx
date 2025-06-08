import Image from 'next/image'

export default function TermsPage() {
  return (
		<div>
			<div className="relative h-64 w-full">
					<Image
						src="/terms-bg.jpg"
						alt="About Us Background"
						fill
						className="object-cover opacity-40"
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<h1 className="text-5xl font-bold text-white drop-shadow-lg">Terms & Conditions</h1>
					</div>
				</div>
			<div className="max-w-4xl mx-auto py-10 px-4">
				<p className="text-2xl mb-4">
					Welcome to TravelsGo!
				</p>
				<p className='text-md'>By using our website and purchasing our eSIM services, you agree to the following terms and conditions.</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">1. Services</h2>
				<p className="mb-4">
					TravelsGo provides prepaid eSIM data plans for travelers. All services are subject to availability and device compatibility.
				</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">2. Refund Policy</h2>
				<p className="mb-4">
					All purchases are non-refundable once the eSIM QR code is issued and activated unless the issue is due to technical fault on our end.
				</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">3. User Responsibility</h2>
				<p className="mb-4">
					You are responsible for ensuring your device supports eSIM and for entering correct personal and device information.
				</p>
				<h2 className="text-xl font-semibold mt-6 mb-2">4. Modification</h2>
				<p>
					We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of those changes.
				</p>
			</div>
		</div>
  );
}
