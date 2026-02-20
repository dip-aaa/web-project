"use client";

import React from "react";
import { marketplaceAPI, reviewAPI } from "../../../lib/api";
import ImageCropModal from "../../profile/components/ImageCropModal";
import StarRating from "../../components/StarRating";

export type MarketplaceItem = {
	id: string;
	title: string;
	price: number;
	seller: string;
	conditionLabel: string;
	category: string;
	imageUrl: string;
	description?: string;
	avgRating?: number;
	reviewCount?: number;
};

type PriceRange = "Any Price" | "Under Rs 500" | "Rs 500 - Rs 1000" | "Rs 1000 - Rs 2000" | "Rs 2000+";
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

function matchesPriceRange(price: number, range: PriceRange): boolean {
	if (range === "Any Price") return true;
	if (range === "Under Rs 500") return price < 500;
	if (range === "Rs 500 - Rs 1000") return price >= 500 && price <= 1000;
	if (range === "Rs 1000 - Rs 2000") return price > 1000 && price <= 2000;
	return price > 2000;
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
	onCartClick,
}: {
	onReset: () => void;
	onCartClick?: () => void;
}) {
	const { getCartCount } = require('../../../hooks/useCart').useCart();
	const cartCount = getCartCount();

	return (
		<section className="mk-container pt-8">
			<div className="flex flex-col gap-3">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="mk-title">Stationery Marketplace</h1>
					</div>
					<div className="flex items-center gap-4">
						{onCartClick && (
							<button
								type="button"
								onClick={onCartClick}
								className="relative bg-[#6b4423] text-white font-extrabold px-6 py-3 rounded-xl hover:bg-[#573217] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
							>
								<span className="text-xl">🛒</span>
								My Cart
								{cartCount > 0 && (
									<span className="absolute -top-2 -right-2 bg-[#d32f2f] text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
										{cartCount}
									</span>
								)}
							</button>
						)}
						<button type="button" className="mk-subtle-link" onClick={onReset}>
							Reset Filters
						</button>
					</div>
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
							<option value="Under Rs 500">Under Rs 500</option>
							<option value="Rs 500 - Rs 1000">Rs 500 - Rs 1000</option>
							<option value="Rs 1000 - Rs 2000">Rs 1000 - Rs 2000</option>
							<option value="Rs 2000+">Rs 2000+</option>
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
				<div className="mk-price">Rs {item.price.toFixed(2)}</div>
				<div className="mk-card-meta">
					<span className="inline-flex items-center gap-1">
						<span aria-hidden>👤</span>
						<span>{item.seller}</span>
					</span>
					{item.reviewCount !== undefined && (
						<div className="flex items-center gap-1">
							<StarRating rating={item.avgRating || 0} size={14} />
							<span className="text-[10px] text-gray-500">({item.reviewCount})</span>
						</div>
					)}
				</div>
				<button type="button" className="mk-btn" onClick={() => onViewDetails(item)}>
					View Details
				</button>
			</div>
		</article>
	);
}

export function ProductGrid({
	items,
	onViewDetails,
}: {
	items: MarketplaceItem[];
	onViewDetails: (item: MarketplaceItem) => void;
}) {
	if (items.length === 0) {
		return (
			<section className="mk-container">
				<div style={{
					padding: '60px 20px',
					textAlign: 'center',
					color: '#8b6f47'
				}}>
					<div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
					<h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>No items found</h3>
					<p style={{ fontSize: 14 }}>Try adjusting your filters or be the first to list an item!</p>
				</div>
			</section>
		);
	}

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

// Product Details Component
function ProductDetails({ item, onBack }: { item: MarketplaceItem; onBack: () => void }) {
	const { addToCart, isInCart } = require('../../../hooks/useCart').useCart();
	const [isWishlisted, setIsWishlisted] = React.useState(false);
	const [reviews, setReviews] = React.useState<any[]>([]);
	const [avgRating, setAvgRating] = React.useState(item.avgRating || 0);
	const [reviewCount, setReviewCount] = React.useState(item.reviewCount || 0);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [newRating, setNewRating] = React.useState(5);
	const [newComment, setNewComment] = React.useState("");
	const router = require('next/navigation').useRouter();

	const fetchReviews = React.useCallback(async () => {
		try {
			const response = await reviewAPI.getItemReviews(parseInt(item.id));
			if (response.success) {
				setReviews(response.data);
				setAvgRating(response.averageRating);
				setReviewCount(response.count);
			}
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	}, [item.id]);

	React.useEffect(() => {
		setIsWishlisted(isInCart(item.id));
		fetchReviews();
	}, [isInCart, item.id, fetchReviews]);

	const details = {
		...item,
		originalPrice: item.price * 1.2,
		rating: 4.8,
		reviews: 12,
		sellerResponse: "within 2 hours",
		sellerJoined: "2023",
		sellerDept: "Computer Engineering",
		features: [
			"Like New Condition",
			"No highlighting or marks",
			"Latest Edition",
			"Includes protective cover"
		]
	};

	const handleAddToCart = () => {
		addToCart({
			id: item.id,
			title: item.title,
			price: item.price,
			seller: item.seller,
			imageUrl: item.imageUrl,
			category: item.category,
			conditionLabel: item.conditionLabel
		});
		alert('✅ Added to cart!');
	};

	const handleWishlist = () => {
		if (!isWishlisted) {
			addToCart({
				id: item.id,
				title: item.title,
				price: item.price,
				seller: item.seller,
				imageUrl: item.imageUrl,
				category: item.category,
				conditionLabel: item.conditionLabel
			});
			setIsWishlisted(true);
			alert('❤️ Added to cart!');
		}
	};

	const handleChatWithSeller = () => {
		router.push(`/chat?seller=${encodeURIComponent(item.seller)}`);
	};

	const handleRequest = async () => {
		try {
			const response = await marketplaceAPI.sendBuyRequest(item.id);
			if (response.success) {
				alert('✅ Request sent to seller! They will be notified of your interest.');
			} else {
				alert('❌ Failed to send request: ' + response.message);
			}
		} catch (error) {
			console.error('Error sending buy request:', error);
			alert('❌ Error sending request. Please try again.');
		}
	};

	const handleSubmitReview = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
			const response = await reviewAPI.createReview({
				rating: newRating,
				comments: newComment,
				itemId: parseInt(item.id)
			});

			if (response.success) {
				setNewComment("");
				setNewRating(5);
				fetchReviews();
				alert('✨ Thank you for your review!');
			} else {
				alert('❌ Failed to submit review: ' + response.message);
			}
		} catch (error) {
			console.error('Error submitting review:', error);
			alert('❌ Error submitting review.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mk-container animate-fade-in" style={{ maxWidth: 1400, margin: '0 auto' }}>
			{/* Breadcrumbs */}
			<div className="flex items-center gap-4 text-xl text-[#8b6f47] mb-10 mt-8 font-semibold">
				<button onClick={onBack} className="hover:underline hover:text-[#6b4423] transition-colors">Marketplace</button>
				<span className="text-[#d4b896] text-2xl">›</span>
				<span className="hover:text-[#6b4423] transition-colors">{item.category}</span>
				<span className="text-[#d4b896] text-2xl">›</span>
				<span className="font-bold text-[#6b4423]">{item.title}</span>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				{/* Left Column: Images */}
				<div className="lg:col-span-7 space-y-6">
					<div className="aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-md border-2 border-[#e8ddd4] relative group">
						<img
							src={item.imageUrl}
							alt={item.title}
							className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute top-6 left-6">
							<span className="bg-[#5a9e6f] text-white text-sm font-extrabold px-4 py-2 rounded-full shadow-lg">
								{item.conditionLabel}
							</span>
						</div>
						<button
							onClick={handleWishlist}
							className={`absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full transition-all shadow-lg hover:scale-110 ${isWishlisted ? 'text-[#d32f2f]' : 'text-[#8b6f47] hover:text-[#d32f2f]'}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
							</svg>
						</button>
					</div>

					{/* Thumbnails */}
					<div className="flex gap-4 overflow-x-auto pb-2">
						{[item.imageUrl, item.imageUrl, item.imageUrl].map((img, i) => (
							<button key={i} className={`flex-shrink-0 w-24 h-24 rounded-xl border-3 ${i === 0 ? 'border-[#6b4423] shadow-md' : 'border-[#e8ddd4]'} overflow-hidden hover:border-[#6b4423] transition-all`}>
								<img src={img} alt="" className="w-full h-full object-cover" />
							</button>
						))}
					</div>
				</div>

				{/* Right Column: Details */}
				<div className="lg:col-span-5 space-y-8">
					<div>
						<h1 className="text-2xl font-bold text-[#6b4423] mb-3 leading-tight">{item.title}</h1>
						<div className="flex items-center gap-4 mb-4">
							<div className="flex items-center gap-1">
								<StarRating rating={avgRating} size={16} />
								<span className="text-xs text-[#8b6f47] font-semibold ml-1">({reviewCount} reviews)</span>
							</div>
							<span className="text-[#e8ddd4]">|</span>
							<span className="text-[#5a9e6f] text-xs font-semibold flex items-center gap-1">
								<span className="w-2 h-2 rounded-full bg-[#5a9e6f]"></span>
								Verified Seller
							</span>
						</div>

						<div className="p-4 bg-gradient-to-br from-white to-[#f9f6f3] rounded-xl border border-[#e8ddd4] shadow-md">
							<div className="flex items-end gap-3 mb-2">
								<span className="text-3xl font-bold text-[#6b4423]">Rs. {item.price}</span>
								<span className="text-base text-[#a0826d] line-through mb-1">Rs. {details.originalPrice.toFixed(0)}</span>
								<span className="text-sm font-bold text-[#d32f2f] bg-[#ffebee] px-2 py-0.5 rounded mb-1">
									{Math.round(((details.originalPrice - item.price) / details.originalPrice) * 100)}% OFF
								</span>
							</div>
							<p className="text-xs text-[#8b6f47] font-medium mb-4">Inclusive of all taxes</p>

							<div className="flex gap-4">
								<button
									onClick={handleAddToCart}
									className="flex-1 bg-[#8b6f47] text-white font-bold text-sm py-2.5 px-5 rounded-xl hover:bg-[#6b4423] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
								>
									<span className="text-base">🛒</span> Add to Cart
								</button>
								<button
									onClick={handleRequest}
									className="flex-1 bg-[#f5f0eb] text-[#6b4423] font-bold text-sm py-2.5 px-5 rounded-xl hover:bg-[#e8ddd4] transition-all border border-[#e8ddd4] flex items-center justify-center gap-2 hover:shadow-md"
								>
									<span className="text-base">⚡</span> Request
								</button>
							</div>
						</div>
					</div>

					{/* Seller Card */}
					<div className="bg-gradient-to-br from-[#f9f6f3] to-[#f5f0eb] p-4 rounded-xl border border-[#e8ddd4] shadow-sm">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-bold text-[#6b4423] text-xs uppercase tracking-wide">Seller Details</h3>
							<button className="text-xs text-[#8b6f47] hover:text-[#6b4423] hover:underline font-semibold">View Store ›</button>
						</div>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 rounded-full bg-[#dcc6b0] flex items-center justify-center text-[#6b4423] font-bold text-base shadow-sm">
								{item.seller.charAt(0)}
							</div>
							<div className="flex-1">
								<div className="font-bold text-[#6b4423] text-sm">{item.seller}</div>
								<div className="text-xs text-[#8b6f47] font-medium">{details.sellerDept} • {details.sellerJoined}</div>
							</div>
							<button
								onClick={handleChatWithSeller}
								className="bg-[#6b4423] text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-[#573217] transition-all shadow-sm"
							>
								💬 Chat
							</button>
						</div>
						<div className="grid grid-cols-3 gap-2 text-center">
							<div className="bg-white p-2 rounded-lg border border-[#f0e6dc] shadow-sm">
								<div className="font-bold text-[#6b4423] text-sm">24</div>
								<div className="text-[10px] text-[#a0826d] uppercase font-semibold">Sold</div>
							</div>
							<div className="bg-white p-2 rounded-lg border border-[#f0e6dc] shadow-sm">
								<div className="font-bold text-[#6b4423] text-sm">{avgRating}</div>
								<div className="text-[10px] text-[#a0826d] uppercase font-semibold">Rating</div>
							</div>
							<div className="bg-white p-2 rounded-lg border border-[#f0e6dc] shadow-sm">
								<div className="font-bold text-[#6b4423] text-sm">100%</div>
								<div className="text-[10px] text-[#a0826d] uppercase font-semibold">Response</div>
							</div>
						</div>
					</div>

					{/* Features/Description */}
					<div>
						<h3 className="font-bold text-[#6b4423] mb-3 text-base">About this item</h3>
						<ul className="space-y-2">
							{details.features.map((feature, i) => (
								<li key={i} className="flex gap-2 text-sm text-[#4a3b32] font-medium">
									<span className="text-[#8b6f47] mt-0.5 font-semibold">•</span>
									{feature}
								</li>
							))}
						</ul>
						<div className="mt-3 text-sm text-[#8b6f47] leading-relaxed font-medium">
							{item.description || "No detailed description provided by the seller."}
						</div>
					</div>

					{/* Trust/Delivery */}
					<div className="bg-[#fff9c4] border-2 border-[#fbc02d] rounded-2xl p-5 flex gap-4 shadow-md">
						<div className="text-3xl">🚚</div>
						<div>
							<div className="font-extrabold text-[#f57f17] text-base">Campus Handover Available</div>
							<div className="text-sm text-[#f9a825] mt-1 font-medium">Available for pickup at Library Circle or Main Gate. Cash on delivery preferred.</div>
						</div>
					</div>

					<div className="flex gap-6 text-sm font-bold text-[#8b6f47]">
						<div className="flex items-center gap-2">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
							48h Handover
						</div>
						<div className="flex items-center gap-2">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
							KOSH Verified
						</div>
					</div>
				</div>
			</div>

			{/* Reviews Section */}
			<div className="mt-10 border-t border-[#e8ddd4] pt-8">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-bold text-[#6b4423]">Student Reviews</h2>
				</div>

				{/* Write a Review */}
				<div className="bg-[#fdfbf9] p-6 rounded-2xl border border-[#e8ddd4] mb-8 shadow-sm">
					<h3 className="font-bold text-[#6b4423] mb-4 text-sm">Rate this product</h3>
					<form onSubmit={handleSubmitReview} className="space-y-4">
						<div className="flex items-center gap-4">
							<span className="text-xs font-semibold text-[#8b6f47]">Your Rating:</span>
							<StarRating rating={newRating} interactive onChange={setNewRating} size={24} />
						</div>
						<textarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder="Share your experience with this item..."
							className="w-full p-4 rounded-xl border border-[#e8ddd4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6f47] min-h-[100px]"
						/>
						<button
							type="submit"
							disabled={isSubmitting}
							className="bg-[#6b4423] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#573217] transition-all disabled:opacity-50"
						>
							{isSubmitting ? &ldquo;Submitting...&rdquo; : &ldquo;Submit Review&rdquo;}
						</button>
					</form>
				</div>

				{reviews.length === 0 ? (
					<div className="text-center py-10 text-[#8b6f47]">
						<p className="text-sm italic">No reviews yet. Be the first to review!</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{reviews.map((rev) => (
							<div key={rev.id} className="bg-white p-4 rounded-xl border border-[#e8ddd4] shadow-sm hover:shadow-md transition-shadow">
								<div className="flex items-center gap-2 mb-2">
									<div className="w-8 h-8 rounded-full bg-[#e8ddd4] flex items-center justify-center text-[#6b4423] text-xs font-bold shadow-sm">
										{rev.buyer.user.profileImageUrl ? (
											<img src={rev.buyer.user.profileImageUrl} alt="" className="w-full h-full rounded-full object-cover" />
										) : (
											rev.buyer.user.name.charAt(0)
										)}
									</div>
									<div>
										<div className="text-sm font-bold text-[#6b4423]">{rev.buyer.user.name}</div>
										<div className="text-[10px] text-[#8b6f47] font-medium">{new Date(rev.date).toLocaleDateString()}</div>
									</div>
									<div className="ml-auto">
										<StarRating rating={rev.rating} size={12} />
									</div>
								</div>
								<p className="text-xs text-[#4a3b32] italic leading-relaxed">{rev.comments || "No comment provided."}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}


export function MarketplaceView() {
	const [items, setItems] = React.useState<MarketplaceItem[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [filters, setFilters] = React.useState<Filters>({
		category: "Select Category",
		priceRange: "Any Price",
		condition: "All Conditions",
	});
	const [selectedItem, setSelectedItem] = React.useState<MarketplaceItem | null>(null);
	const [showSellForm, setShowSellForm] = React.useState(false);
	const [showCart, setShowCart] = React.useState(false);

	// Fetch items from API
	const fetchItems = React.useCallback(async () => {
		try {
			setLoading(true);
			const response = await marketplaceAPI.getItems();
			if (response.success) {
				setItems(response.data);
			} else {
				console.error('Failed to fetch items:', response.message);
			}
		} catch (error) {
			console.error('Error fetching items:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	React.useEffect(() => {
		fetchItems();
	}, [fetchItems]);

	const filteredItems = React.useMemo(() => filterItems(items, filters), [items, filters]);

	function resetAll() {
		setFilters({ category: "Select Category", priceRange: "Any Price", condition: "All Conditions" });
		setSelectedItem(null);
		setShowCart(false);
	}

	async function handleAddItem(payload: Omit<MarketplaceItem, "id">) {
		try {
			const response = await marketplaceAPI.createItem({
				title: payload.title,
				price: payload.price,
				category: payload.category,
				condition: payload.conditionLabel,
				description: payload.description,
				imageUrl: payload.imageUrl
			});

			if (response.success) {
				// Refresh items list
				await fetchItems();
				setShowSellForm(false);
				setSelectedItem(null);
				alert('Item added successfully! 🎉');
			} else {
				alert('Failed to add item: ' + response.message);
			}
		} catch (error) {
			console.error('Error adding item:', error);
			alert('Failed to add item. Please make sure you are logged in.');
		}
	}

	// Import CartView dynamically
	const CartView = require('./CartView').CartView;

	return (
		<main className="mk-page min-h-[calc(100vh-4rem)] pb-24">
			{showCart ? (
				<CartView onBack={() => setShowCart(false)} />
			) : selectedItem ? (
				<ProductDetails item={selectedItem} onBack={() => setSelectedItem(null)} />
			) : showSellForm ? (
				<SellItemForm onAdd={handleAddItem} />
			) : (
				<>
					<MarketplaceHeader onReset={resetAll} onCartClick={() => setShowCart(true)} />
					<MarketplaceFilters filters={filters} onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))} />
					<section className="mk-container mt-8">
						<div className="flex items-center justify-between mb-6">
							<p className="text-[#8b6f47] font-medium">
								{loading ? "Loading..." : `${filteredItems.length} items available`}
							</p>
							<button
								type="button"
								className="mk-btn"
								onClick={() => setShowSellForm(true)}
							>
								+ Sell an Item
							</button>
						</div>

						{loading ? (
							<div className="text-center py-12 text-[#8b6f47]">Loading items...</div>
						) : filteredItems.length === 0 ? (
							<div className="text-center py-12 text-[#8b6f47]">No items found matching your filters.</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredItems.map((item) => (
									<ProductCard
										key={item.id}
										item={item}
										onViewDetails={() => setSelectedItem(item)}
									/>
								))}
							</div>
						)}
					</section>
				</>
			)}
		</main >
	);
}



function SellItemForm({ onAdd }: { onAdd: (item: Omit<MarketplaceItem, "id">) => void }) {
	const [title, setTitle] = React.useState("");
	const [price, setPrice] = React.useState("15");
	const [seller, setSeller] = React.useState("You");
	const [category, setCategory] = React.useState("Books");
	const [condition, setCondition] = React.useState<Condition>("Like New");
	const [description, setDescription] = React.useState("");
	const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
	const [imagePreview, setImagePreview] = React.useState<string>("");
	const [uploading, setUploading] = React.useState(false);

	// Crop modal states
	const [cropModalOpen, setCropModalOpen] = React.useState(false);
	const [tempImageSrc, setTempImageSrc] = React.useState('');

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 10 * 1024 * 1024) {
				alert('File size must be less than 10MB');
				return;
			}
			if (!file.type.startsWith('image/')) {
				alert('Please select an image file');
				return;
			}
			// Open crop modal instead of directly showing preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setTempImageSrc(reader.result as string);
				setCropModalOpen(true);
			};
			reader.readAsDataURL(file);
		}
		// Reset input so same file can be selected again
		e.target.value = '';
	};

	const handleCropComplete = (croppedImageBlob: Blob) => {
		// Convert blob to file
		const croppedFile = new File([croppedImageBlob], 'marketplace-item.jpg', { type: 'image/jpeg' });

		// Create preview URL
		const reader = new FileReader();
		reader.onloadend = () => {
			setSelectedImage(croppedFile);
			setImagePreview(reader.result as string);
		};
		reader.readAsDataURL(croppedFile);

		// Close crop modal
		setCropModalOpen(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const numericPrice = Number(price);
		if (!title.trim() || Number.isNaN(numericPrice)) return;

		setUploading(true);
		let imageUrl = "";

		try {
			// Upload image if selected
			if (selectedImage) {
				const uploadResponse = await marketplaceAPI.uploadImage(selectedImage);
				if (uploadResponse.success) {
					imageUrl = uploadResponse.data.url;
				} else {
					alert('Failed to upload image: ' + uploadResponse.message);
					setUploading(false);
					return;
				}
			}

			// Call onAdd with image URL
			onAdd({
				title: title.trim(),
				price: numericPrice,
				seller: seller.trim() || "You",
				category,
				conditionLabel: condition,
				imageUrl: imageUrl || "https://placehold.co/800x600/png?text=Item",
				description: description.trim() || undefined,
			});

			// Reset form
			setTitle("");
			setPrice("15");
			setDescription("");
			setSelectedImage(null);
			setImagePreview("");
		} catch (error) {
			console.error('Error uploading image:', error);
			alert('Failed to upload image. Please try again.');
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			<form
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 16,
					fontFamily: "system-ui, -apple-system, sans-serif"
				}}
				onSubmit={handleSubmit}
			>
				<div style={{ gridColumn: "1 / -1" }}>
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

				<div style={{ gridColumn: "1 / -1" }}>
					<label className="mk-filter-label">ITEM PHOTO</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
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
							fontFamily: "system-ui, -apple-system, sans-serif",
							cursor: "pointer"
						}}
					/>
					{imagePreview && (
						<div style={{ marginTop: 12 }}>
							<img
								src={imagePreview}
								alt="Preview"
								style={{
									maxWidth: "100%",
									maxHeight: 200,
									borderRadius: 12,
									border: "2px solid #f0e6dc"
								}}
							/>
						</div>
					)}
				</div>

				<div style={{ gridColumn: "1 / -1" }}>
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

				<div style={{ gridColumn: "1 / -1" }}>
					<button
						type="submit"
						className="mk-btn"
						disabled={uploading}
						style={{
							opacity: uploading ? 0.6 : 1,
							cursor: uploading ? 'not-allowed' : 'pointer'
						}}
					>
						{uploading ? 'Uploading...' : 'Add Item'}
					</button>
					<div style={{ marginTop: 8, fontSize: 12, color: "#a0826d", fontFamily: "system-ui, -apple-system, sans-serif" }}>
						Tip: After adding, use filters to find it.
					</div>
				</div>
			</form>

			{/* Image Crop Modal */}
			<ImageCropModal
				isOpen={cropModalOpen}
				imageSrc={tempImageSrc}
				onClose={() => setCropModalOpen(false)}
				onCropComplete={handleCropComplete}
				aspectRatio={4 / 3}
				cropShape="rect"
				title="🖼️ Adjust Item Photo"
			/>
		</>
	);
}
