import Sidebar from "@/src/components/Sidebar";
import { MarketplaceView } from "./components";

export default function MarketplacePage() {
	return (
		<div className="min-h-screen h-screen flex bg-gradient-to-br from-[#f9f6f3] via-[#fdfcfa] to-[#f5f0eb]">
			<Sidebar />
			<div className="flex-1 min-w-0 overflow-y-auto">
				<MarketplaceView />
			</div>
		</div>
	);
}


