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
				<div className="flex flex-col gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
					<div className="flex items-center justify-between gap-3">
						<div className="text-sm font-semibold text-amber-950">
							Showing {filteredItems.length} items
						</div>
						<button
							type="button"
							className="mk-subtle-link"
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
					<div className="grid grid-cols-1 gap-4 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm md:grid-cols-3">
						<div className="overflow-hidden rounded-xl bg-amber-100 md:col-span-1">
							<img
								src={selectedItem.imageUrl}
								alt={selectedItem.title}
								className="h-56 w-full object-cover"
							/>
						</div>
						<div className="md:col-span-2">
							<div className="flex items-start justify-between gap-3">
								<div>
									<div className="text-lg font-semibold text-amber-950">{selectedItem.title}</div>
									<div className="mt-1 text-sm font-bold text-amber-950">
										${selectedItem.price.toFixed(2)}
									</div>
									<div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-amber-700">
										<span className="rounded-full bg-amber-100 px-3 py-1">
											{selectedItem.conditionLabel}
										</span>
										<span className="rounded-full bg-amber-100 px-3 py-1">
											{selectedItem.category}
										</span>
										<span className="rounded-full bg-amber-100 px-3 py-1">
											Seller: {selectedItem.seller}
										</span>
									</div>
								</div>
								<button
									type="button"
									className="mk-subtle-link"
									onClick={() => setSelectedItem(null)}
								>
									Close
								</button>
							</div>
							<div className="mt-3 text-sm text-amber-900">
								{selectedItem.description ??
									"No description provided. Ask the seller for details."}
							</div>
							<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
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
			className="grid grid-cols-1 gap-3 sm:grid-cols-2"
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
			<div className="sm:col-span-2">
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

			<div className="sm:col-span-2">
				<label className="mk-filter-label">IMAGE URL</label>
				<input
					className="mk-select"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					placeholder="https://..."
				/>
			</div>

			<div className="sm:col-span-2">
				<label className="mk-filter-label">DESCRIPTION</label>
				<textarea
					className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm text-amber-950 shadow-sm outline-none transition focus:ring-2 focus:ring-amber-200"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={3}
					placeholder="Add a short description (optional)"
				/>
			</div>

			<div className="sm:col-span-2">
				<button type="submit" className="mk-btn">
					Add Item
				</button>
				<div className="mt-2 text-xs text-amber-700">
					Tip: After adding, use filters to find it.
				</div>
			</div>
		</form>
	);
}
