"use client";

import React from "react";

export type MarketplaceItem = {
	id: string;
	title: string;
	price: number;
	seller: string;
	conditionLabel: string;
	category: string;
	imageUrl: string;
	description?: string;
};

type PriceRange = "Any Price" | "Under $20" | "$20 - $50" | "$50 - $100" | "$100+";
type Condition =
	| "All Conditions"
	| "Brand New"
	| "Like New"
	| "Gently Used"
	| "Well Loved"
	| "High Quality";

type Filters = {
	category: string;
	priceRange: PriceRange;
	condition: Condition;
};

const ITEM_TEMPLATES: Omit<MarketplaceItem, "id">[] = [
	{
		title: "Organic Chemistry Textbook",
		price: 45,
		seller: "Alex J.",
		conditionLabel: "Gently Used",
		category: "Books",
		imageUrl: "https://placehold.co/800x600/png?text=Organic+Chemistry",
		description:
			"Clean pages, minimal highlights. Great for students who want a solid reference for problem sets.",
	},
	{
		title: "TI-84 Plus Graphing Calculator",
		price: 80,
		seller: "Sarah K.",
		conditionLabel: "Like New",
		category: "Calculators",
		imageUrl: "https://placehold.co/800x600/png?text=TI-84+Plus",
		description:
			"All buttons work, screen is clear, includes cover. Perfect for calculus and physics.",
	},
	{
		title: "Calculus II Exam Notes Pack",
		price: 15,
		seller: "Mike R.",
		conditionLabel: "High Quality",
		category: "Notes",
		imageUrl: "https://placehold.co/800x600/png?text=Calculus+Notes",
		description:
			"Organized summaries and practice problems. Great for quick revision before exams.",
	},
	{
		title: "Unisex Lab Coat",
		price: 20,
		seller: "David L.",
		conditionLabel: "Brand New",
		category: "Lab Gear",
		imageUrl: "https://placehold.co/800x600/png?text=Lab+Coat",
		description:
			"Never worn. Standard fit, suitable for chemistry and biology labs.",
	},
	{
		title: "Acrylic Master Set (Paints)",
		price: 25,
		seller: "Emma W.",
		conditionLabel: "Gently Used",
		category: "Art Supplies",
		imageUrl: "https://placehold.co/800x600/png?text=Acrylic+Set",
		description:
			"A few colors lightly used, most unopened. Great starter set for assignments.",
	},
	{
		title: "Engineering Drafting Kit",
		price: 35,
		seller: "Chris P.",
		conditionLabel: "Well Loved",
		category: "All Items",
		imageUrl: "https://placehold.co/800x600/png?text=Drafting+Kit",
		description:
			"Includes ruler, compass, and templates. Has signs of use but fully functional.",
	},
	{
		title: "Physics II Lab Binder",
		price: 10,
		seller: "Taylor B.",
		conditionLabel: "Like New",
		category: "Notes",
		imageUrl: "https://placehold.co/800x600/png?text=Lab+Binder",
		description:
			"Neatly organized lab printouts. Tabs included for each experiment.",
	},
	{
		title: "Noise Cancelling Headphones",
		price: 120,
		seller: "Jordan M.",
		conditionLabel: "Like New",
		category: "All Items",
		imageUrl: "https://placehold.co/800x600/png?text=Headphones",
		description:
			"Great for study sessions. Includes carrying case and charging cable.",
	},
];

function makeMockItems(count: number): MarketplaceItem[] {
	return Array.from({ length: count }, (_, index) => {
		const template = ITEM_TEMPLATES[index % ITEM_TEMPLATES.length];
		const n = Math.floor(index / ITEM_TEMPLATES.length) + 1;
		return {
			id: String(index + 1),
			...template,
			title: n === 1 ? template.title : `${template.title} • ${n}`,
			price: Number((template.price + (index % 5) * 2.5).toFixed(2)),
		};
	});
}

const MOCK_ITEMS: MarketplaceItem[] = makeMockItems(48);

function matchesPriceRange(price: number, range: PriceRange): boolean {
	if (range === "Any Price") return true;
	if (range === "Under $20") return price < 20;
	if (range === "$20 - $50") return price >= 20 && price <= 50;
	if (range === "$50 - $100") return price > 50 && price <= 100;
	return price > 100;
}

function filterItems(items: MarketplaceItem[], filters: Filters): MarketplaceItem[] {
	return items.filter((item) => {
		const categoryOk =
			filters.category === "All Items" ||
			filters.category === "Select Category" ||
			item.category === filters.category;
		const conditionOk =
			filters.condition === "All Conditions" || item.conditionLabel === filters.condition;
		const priceOk = matchesPriceRange(item.price, filters.priceRange);
		return categoryOk && conditionOk && priceOk;
	});
}


export function MarketplaceHeader({
	onReset,
}: {
	onReset: () => void;
}) {
	return (
		<section className="mk-container pt-8">
			<div className="flex flex-col gap-3">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="mk-title">Stationery Marketplace</h1>
					</div>
					<button type="button" className="mk-subtle-link" onClick={onReset}>
						Reset Filters
					</button>
				</div>
			</div>
		</section>
	);
}

export function MarketplaceFilters({
	filters,
	onChange,
}: {
	filters: Filters;
	onChange: (patch: Partial<Filters>) => void;
}) {
	return (
		<section className="mk-container mt-6">
			<div className="mk-filters">
				<div>
					<label className="mk-filter-label">CATEGORY</label>
					<div className="mk-select-wrap">
						<select
							className="mk-select"
							value={filters.category}
							onChange={(e) => onChange({ category: e.target.value })}
						>
							<option value="Select Category">Select Category</option>
							<option value="All Items">All Items</option>
							<option value="Books">Books</option>
							<option value="Notes">Notes</option>
							<option value="Calculators">Calculators</option>
							<option value="Lab Gear">Lab Gear</option>
							<option value="Art Supplies">Art Supplies</option>
						</select>
						<span className="mk-select-icon">▾</span>
					</div>
				</div>

				<div>
					<label className="mk-filter-label">PRICE RANGE</label>
					<div className="mk-select-wrap">
						<select
							className="mk-select"
							value={filters.priceRange}
							onChange={(e) =>
								onChange({ priceRange: e.target.value as PriceRange })
							}
						>
							<option value="Any Price">Any Price</option>
							<option value="Under $20">Under $20</option>
							<option value="$20 - $50">$20 - $50</option>
							<option value="$50 - $100">$50 - $100</option>
							<option value="$100+">$100+</option>
						</select>
						<span className="mk-select-icon">▾</span>
					</div>
				</div>

				<div>
					<label className="mk-filter-label">CONDITION</label>
					<div className="mk-select-wrap">
						<select
							className="mk-select"
							value={filters.condition}
							onChange={(e) =>
								onChange({ condition: e.target.value as Condition })
							}
						>
							<option value="All Conditions">All Conditions</option>
							<option value="Brand New">Brand New</option>
							<option value="Like New">Like New</option>
							<option value="Gently Used">Gently Used</option>
							<option value="Well Loved">Well Loved</option>
							<option value="High Quality">High Quality</option>
						</select>
						<span className="mk-select-icon">▾</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export function ProductCard({
	item,
	onViewDetails,
}: {
	item: MarketplaceItem;
	onViewDetails: (item: MarketplaceItem) => void;
}) {
	return (
		<article className="mk-card">
			<div className="mk-card-media">
				<img
					src={item.imageUrl}
					alt={item.title}
					className="h-full w-full object-cover"
					loading="lazy"
				/>
				<span className="mk-badge">{item.conditionLabel}</span>
			</div>
			<div className="mk-card-body">
				<h3 className="mk-card-title">{item.title}</h3>
				<div className="mk-price">${item.price.toFixed(2)}</div>
				<div className="mk-card-meta">
					<span className="inline-flex items-center gap-1">
						<span aria-hidden>👤</span>
						<span>{item.seller}</span>
					</span>
				</div>
				<button type="button" className="mk-btn" onClick={() => onViewDetails(item)}>
					View Details
				</button>
			</div>
		</article>
	);
}

export function ProductGrid({
	items = MOCK_ITEMS,
	onViewDetails,
}: {
	items?: MarketplaceItem[];
	onViewDetails: (item: MarketplaceItem) => void;
}) {
	return (
		<section className="mk-container">
			<div className="mk-grid">
				{items.map((item) => (
					<ProductCard key={item.id} item={item} onViewDetails={onViewDetails} />
				))}
			</div>
		</section>
	);
}

export function MarketplacePagination() {
	return (
		<div className="mk-container">
			<div className="mk-pagination">
				<button type="button" className="mk-page-btn" aria-label="Previous page">
					‹
				</button>
				<button type="button" className="mk-page-btn mk-page-btn--active">
					1
				</button>
				<button type="button" className="mk-page-btn">
					2
				</button>
				<button type="button" className="mk-page-btn">
					3
				</button>
				<span className="px-2 text-xs text-amber-700">…</span>
				<button type="button" className="mk-page-btn">
					12
				</button>
				<button type="button" className="mk-page-btn" aria-label="Next page">
					›
				</button>
			</div>
		</div>
	);
}

export function SellItemButton() {
	return (
		<button type="button" className="mk-fab">
			<span aria-hidden>＋</span>
			<span>Sell Item</span>
		</button>
	);
}

export function MarketplaceView() {
	const [items, setItems] = React.useState<MarketplaceItem[]>(MOCK_ITEMS);
	const [filters, setFilters] = React.useState<Filters>({
		category: "Select Category",
		priceRange: "Any Price",
		condition: "All Conditions",
	});
	const [selectedItem, setSelectedItem] = React.useState<MarketplaceItem | null>(null);
	const [showSellForm, setShowSellForm] = React.useState(false);

	const filteredItems = React.useMemo(() => filterItems(items, filters), [items, filters]);

	function resetAll() {
		setFilters({ category: "Select Category", priceRange: "Any Price", condition: "All Conditions" });
		setSelectedItem(null);
	}

	function handleAddItem(payload: Omit<MarketplaceItem, "id">) {
		setItems((prev) => [{ id: String(Date.now()), ...payload }, ...prev]);
		setShowSellForm(false);
		setSelectedItem(null);
	}

	return (
		<main className="mk-page min-h-[calc(100vh-4rem)] pb-24">
			<MarketplaceHeader onReset={resetAll} />
			<MarketplaceFilters
				filters={filters}
				onChange={(patch) => {
					setFilters((prev) => ({ ...prev, ...patch }));
					setSelectedItem(null);
				}}
			/>

			<section className="mk-container mt-4">
				<div 
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 12,
						borderRadius: 24,
						background: "rgba(255, 255, 255, 0.9)",
						border: "1px solid #f0e6dc",
						padding: 24,
						boxShadow: "0 4px 20px rgba(139, 111, 71, 0.08)",
						backdropFilter: "blur(10px)",
						fontFamily: "system-ui, -apple-system, sans-serif"
					}}
				>
					<div 
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 12
						}}
					>
						<div 
							style={{
								fontSize: 16,
								fontWeight: 600,
								color: "#6b4423",
								fontFamily: "system-ui, -apple-system, sans-serif"
							}}
						>
							Showing {filteredItems.length} items
						</div>
						<button
							type="button"
							className="mk-subtle-link"
							style={{
								padding: "8px 16px",
								borderRadius: 12,
								background: showSellForm ? "linear-gradient(135deg, #f0e6dc, #e8ddd4)" : "transparent",
								border: "1px solid #f0e6dc",
								transition: "all 0.2s ease"
							}}
							onClick={() => setShowSellForm((v) => !v)}
						>
							{showSellForm ? "Close Sell Form" : "Sell an Item"}
						</button>
					</div>

					{showSellForm ? <SellItemForm onAdd={handleAddItem} /> : null}
				</div>
			</section>

			{selectedItem ? (
				<section className="mk-container mt-4">
					<div 
						style={{
							display: "grid",
							gridTemplateColumns: "1fr",
							gap: 16,
							borderRadius: 24,
							background: "rgba(255, 255, 255, 0.9)",
							border: "1px solid #f0e6dc",
							padding: 24,
							boxShadow: "0 4px 20px rgba(139, 111, 71, 0.08)",
							backdropFilter: "blur(10px)",
							fontFamily: "system-ui, -apple-system, sans-serif"
						}}
					>
						<div className="overflow-hidden rounded-xl" style={{background: "linear-gradient(135deg, #f9f6f3, #f5f0eb)"}}>
							<img
								src={selectedItem.imageUrl}
								alt={selectedItem.title}
								style={{
									height: 280,
									width: "100%",
									objectFit: "cover"
								}}
							/>
						</div>
						<div>
							<div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12}}>
								<div>
									<div style={{fontSize: 24, fontWeight: 700, color: "#6b4423", fontFamily: "system-ui, -apple-system, sans-serif"}}>{selectedItem.title}</div>
									<div style={{marginTop: 4, fontSize: 20, fontWeight: 700, color: "#8b6f47", fontFamily: "system-ui, -apple-system, sans-serif"}}>
										${selectedItem.price.toFixed(2)}
									</div>
									<div style={{marginTop: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, fontSize: 12, color: "#a0826d"}}>
										<span style={{borderRadius: 16, background: "rgba(240, 230, 220, 0.6)", padding: "6px 12px", color: "#6b4423", fontWeight: 600}}>
											{selectedItem.conditionLabel}
										</span>
										<span style={{borderRadius: 16, background: "rgba(240, 230, 220, 0.6)", padding: "6px 12px", color: "#6b4423", fontWeight: 600}}>
											{selectedItem.category}
										</span>
										<span style={{borderRadius: 16, background: "rgba(240, 230, 220, 0.6)", padding: "6px 12px", color: "#6b4423", fontWeight: 600}}>
											Seller: {selectedItem.seller}
										</span>
									</div>
								</div>
								<button
									type="button"
									className="mk-subtle-link"
									style={{
										padding: "8px 16px",
										borderRadius: 12,
										background: "linear-gradient(135deg, #f0e6dc, #e8ddd4)",
										border: "1px solid #f0e6dc",
										transition: "all 0.2s ease"
									}}
									onClick={() => setSelectedItem(null)}
								>
									Close
								</button>
							</div>
							<div style={{marginTop: 16, fontSize: 15, color: "#8b6f47", lineHeight: 1.6, fontFamily: "system-ui, -apple-system, sans-serif"}}>
								{selectedItem.description ??
									"No description provided. Ask the seller for details."}
							</div>
							<div style={{marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
								<button type="button" className="mk-btn" onClick={() => setShowSellForm(true)}>
									Sell Similar
								</button>
								<button type="button" className="mk-btn" onClick={() => setSelectedItem(null)}>
									Back to Grid
								</button>
							</div>
						</div>
					</div>
				</section>
			) : null}

			<ProductGrid
				items={filteredItems}
				onViewDetails={(item) => {
					setSelectedItem(item);
					setShowSellForm(false);
				}}
			/>
			<MarketplacePagination />
			<button type="button" className="mk-fab" onClick={() => setShowSellForm(true)}>
				<span aria-hidden>＋</span>
				<span>Sell Item</span>
			</button>
		</main>
	);
}

function SellItemForm({ onAdd }: { onAdd: (item: Omit<MarketplaceItem, "id">) => void }) {
	const [title, setTitle] = React.useState("");
	const [price, setPrice] = React.useState("15");
	const [seller, setSeller] = React.useState("You");
	const [category, setCategory] = React.useState("Books");
	const [condition, setCondition] = React.useState<Condition>("Like New");
	const [imageUrl, setImageUrl] = React.useState("https://placehold.co/800x600/png?text=Your+Item");
	const [description, setDescription] = React.useState("");

	return (
		<form
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 16,
				fontFamily: "system-ui, -apple-system, sans-serif"
			}}
			onSubmit={(e) => {
				e.preventDefault();
				const numericPrice = Number(price);
				if (!title.trim() || Number.isNaN(numericPrice)) return;
				onAdd({
					title: title.trim(),
					price: numericPrice,
					seller: seller.trim() || "You",
					category,
					conditionLabel: condition,
					imageUrl: imageUrl.trim() || "https://placehold.co/800x600/png?text=Item",
					description: description.trim() || undefined,
				});
				setTitle("");
				setPrice("15");
				setDescription("");
			}}
		>
			<div style={{gridColumn: "1 / -1"}}>
				<label className="mk-filter-label">TITLE</label>
				<input
					className="mk-select"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="e.g., Calculus Notes Pack"
				/>
			</div>

			<div>
				<label className="mk-filter-label">PRICE</label>
				<input
					className="mk-select"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					inputMode="decimal"
					placeholder="e.g., 25"
				/>
			</div>

			<div>
				<label className="mk-filter-label">SELLER</label>
				<input
					className="mk-select"
					value={seller}
					onChange={(e) => setSeller(e.target.value)}
					placeholder="Your name"
				/>
			</div>

			<div>
				<label className="mk-filter-label">CATEGORY</label>
				<div className="mk-select-wrap">
					<select className="mk-select" value={category} onChange={(e) => setCategory(e.target.value)}>
						<option>Books</option>
						<option>Notes</option>
						<option>Calculators</option>
						<option>Lab Gear</option>
						<option>Art Supplies</option>
					</select>
					<span className="mk-select-icon">▾</span>
				</div>
			</div>

			<div>
				<label className="mk-filter-label">CONDITION</label>
				<div className="mk-select-wrap">
					<select
						className="mk-select"
						value={condition}
						onChange={(e) => setCondition(e.target.value as Condition)}
					>
						<option value="Brand New">Brand New</option>
						<option value="Like New">Like New</option>
						<option value="Gently Used">Gently Used</option>
						<option value="Well Loved">Well Loved</option>
						<option value="High Quality">High Quality</option>
					</select>
					<span className="mk-select-icon">▾</span>
				</div>
			</div>

			<div style={{gridColumn: "1 / -1"}}>
				<label className="mk-filter-label">IMAGE URL</label>
				<input
					className="mk-select"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					placeholder="https://..."
				/>
			</div>

			<div style={{gridColumn: "1 / -1"}}>
				<label className="mk-filter-label">DESCRIPTION</label>
				<textarea
					style={{
						width: "100%",
						borderRadius: 16,
						border: "1px solid #f0e6dc",
						background: "rgba(255, 255, 255, 0.9)",
						padding: "12px 16px",
						fontSize: 14,
						color: "#6b4423",
						boxShadow: "0 2px 12px rgba(139, 111, 71, 0.06)",
						outline: "none",
						transition: "all 0.2s ease",
						fontFamily: "system-ui, -apple-system, sans-serif"
					}}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={3}
					placeholder="Add a short description (optional)"
				/>
			</div>

			<div style={{gridColumn: "1 / -1"}}>
				<button type="submit" className="mk-btn">
					Add Item
				</button>
				<div style={{marginTop: 8, fontSize: 12, color: "#a0826d", fontFamily: "system-ui, -apple-system, sans-serif"}}>
					Tip: After adding, use filters to find it.
				</div>
			</div>
		</form>
	);
}
