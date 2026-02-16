"use client";

import React from "react";
import { marketplaceAPI } from "../../../lib/api";
import ImageCropModal from "../../profile/components/ImageCropModal";

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

			{loading ? (
				<section className="mk-container mt-4">
					<div style={{
						padding: '60px 20px',
						textAlign: 'center',
						color: '#8b6f47'
					}}>
						<div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
						<h3 style={{ fontSize: 20, fontWeight: 'bold' }}>Loading items...</h3>
					</div>
				</section>
			) : (
				<>
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
										Rs {selectedItem.price.toFixed(2)}
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
							<div style={{marginTop: 20, display: "flex", justifyContent: "flex-end"}}>
								<button type="button" className="mk-btn" onClick={() => setSelectedItem(null)}>
									Back to Grid
								</button>
							</div>
						</div>

						{/* Comments Section */}
						<CommentsSection itemId={selectedItem.id} />
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
				</>
			)}
		</main>
	);
}

function CommentsSection({ itemId }: { itemId: string }) {
	const [comments, setComments] = React.useState<Array<{
		id: number;
		text: string;
		createdAt: string;
		user: {
			id: number;
			name: string;
			email: string;
		};
	}>>([]);
	const [newComment, setNewComment] = React.useState("");
	const [loading, setLoading] = React.useState(true);
	const [submitting, setSubmitting] = React.useState(false);

	// Fetch comments
	const fetchComments = React.useCallback(async () => {
		try {
			setLoading(true);
			const response = await marketplaceAPI.getComments(itemId);
			if (response.success) {
				setComments(response.data);
			}
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setLoading(false);
		}
	}, [itemId]);

	React.useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	const handleAddComment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim() || submitting) return;

		try {
			setSubmitting(true);
			const response = await marketplaceAPI.addComment(itemId, newComment.trim());
			if (response.success) {
				setNewComment("");
				await fetchComments();
			} else {
				alert('Failed to add comment: ' + response.message);
			}
		} catch (error) {
			console.error('Error adding comment:', error);
			alert('Failed to add comment. Please make sure you are logged in.');
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteComment = async (commentId: number) => {
		if (!confirm('Are you sure you want to delete this comment?')) return;

		try {
			const response = await marketplaceAPI.deleteComment(commentId);
			if (response.success) {
				await fetchComments();
			} else {
				alert('Failed to delete comment: ' + response.message);
			}
		} catch (error) {
			console.error('Error deleting comment:', error);
			alert('Failed to delete comment.');
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		if (days < 7) return `${days}d ago`;
		return date.toLocaleDateString();
	};

	const currentUserId = typeof window !== 'undefined' ? 
		JSON.parse(localStorage.getItem('user') || '{}').id : null;

	return (
		<div style={{
			marginTop: 24,
			paddingTop: 24,
			borderTop: '2px solid #f0e6dc'
		}}>
			<h3 style={{
				fontSize: 20,
				fontWeight: 700,
				color: '#6b4423',
				marginBottom: 16,
				fontFamily: 'system-ui, -apple-system, sans-serif'
			}}>
				Comments ({comments.length})
			</h3>

			{/* Add Comment Form */}
			<form onSubmit={handleAddComment} style={{ marginBottom: 20 }}>
				<textarea
					style={{
						width: '100%',
						borderRadius: 12,
						border: '1px solid #f0e6dc',
						background: 'rgba(255, 255, 255, 0.9)',
						padding: '12px 16px',
						fontSize: 14,
						color: '#6b4423',
						boxShadow: '0 2px 12px rgba(139, 111, 71, 0.06)',
						outline: 'none',
						transition: 'all 0.2s ease',
						fontFamily: 'system-ui, -apple-system, sans-serif',
						resize: 'vertical',
						minHeight: '80px'
					}}
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="Add a comment..."
					disabled={submitting}
				/>
				<button
					type="submit"
					className="mk-btn"
					disabled={!newComment.trim() || submitting}
					style={{
						marginTop: 8,
						opacity: (!newComment.trim() || submitting) ? 0.5 : 1
					}}
				>
					{submitting ? 'Posting...' : 'Post Comment'}
				</button>
			</form>

			{/* Comments List */}
			{loading ? (
				<div style={{
					textAlign: 'center',
					padding: '20px',
					color: '#8b6f47',
					fontSize: 14
				}}>
					Loading comments...
				</div>
			) : comments.length === 0 ? (
				<div style={{
					textAlign: 'center',
					padding: '40px 20px',
					color: '#a0826d',
					fontSize: 14
				}}>
					No comments yet. Be the first to comment!
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
					{comments.map((comment) => (
						<div
							key={comment.id}
							style={{
								background: 'rgba(249, 246, 243, 0.6)',
								borderRadius: 12,
								padding: 16,
								border: '1px solid #f0e6dc'
							}}
						>
							<div style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								marginBottom: 8
							}}>
								<div>
									<div style={{
										fontSize: 14,
										fontWeight: 600,
										color: '#6b4423',
										fontFamily: 'system-ui, -apple-system, sans-serif'
									}}>
										{comment.user.name}
									</div>
									<div style={{
										fontSize: 12,
										color: '#a0826d',
										marginTop: 2
									}}>
										{formatDate(comment.createdAt)}
									</div>
								</div>
								{currentUserId === comment.user.id && (
									<button
										type="button"
										onClick={() => handleDeleteComment(comment.id)}
										style={{
											background: 'transparent',
											border: 'none',
											color: '#d32f2f',
											cursor: 'pointer',
											fontSize: 12,
											padding: '4px 8px',
											borderRadius: 6,
											transition: 'background 0.2s ease'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = 'rgba(211, 47, 47, 0.1)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = 'transparent';
										}}
									>
										Delete
									</button>
								)}
							</div>
							<div style={{
								fontSize: 14,
								color: '#6b4423',
								lineHeight: 1.5,
								fontFamily: 'system-ui, -apple-system, sans-serif'
							}}>
								{comment.text}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
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
				<div style={{marginTop: 8, fontSize: 12, color: "#a0826d", fontFamily: "system-ui, -apple-system, sans-serif"}}>
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
