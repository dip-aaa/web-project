import Sidebar from "@/src/components/Sidebar";

export default function MentorshipPage() {
	return (
		<div className="min-h-screen h-screen flex bg-gradient-to-br from-[#f9f6f3] via-[#fdfcfa] to-[#f5f0eb]">
			<Sidebar />
			<div className="flex-1 min-w-0 p-6 overflow-y-auto">
				<h1 className="text-2xl font-semibold">Mentorship</h1>
				<p className="mt-2 text-sm text-neutral-600">Select an option from the sidebar to navigate.</p>
			</div>
		</div>
	);
}

