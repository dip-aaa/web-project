import Sidebar from "../../components/sidebar";
import { MarketplaceView } from "./components";

export default function MarketplacePage() {
	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				background: "#f9f6f3",
			}}
		>
			{/* Sidebar */}
			<div style={{ minWidth: 220, maxWidth: 260, background: "#fff", borderRight: "1.5px solid #e8ddd4", zIndex: 2, position: "sticky", top: 0, height: "100vh" }}>
				<Sidebar animate={false} />
			</div>

			{/* Main content area */}
			<div
				style={{
					flex: 1,
					overflow: "auto",
				}}
			>
				<MarketplaceView />
			</div>
		</div>
	);
}

