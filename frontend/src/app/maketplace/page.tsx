'use client'

type MarketplaceItem = {
	id: string
	title: string
	price: number
	seller: string
	location: string
	badge: 'Brand New' | 'High Quality' | 'Like New' | 'Gently Used' | 'Well Loved' | 'Used'
	category: 'Books' | 'Notes' | 'Calculators' | 'Lab Gear' | 'Art Supplies' | 'Other'
}

const items: MarketplaceItem[] = [
	{
		id: '1',
		title: 'Organic Chemistry Textbook',
		price: 45,
		seller: 'Alex J.',
		location: 'Library Pickup',
		badge: 'Gently Used',
		category: 'Books',
	},
	{
		id: '2',
		title: 'TI‑84 Plus Graphing Calculator',
		price: 80,
		seller: 'Sarah K.',
		location: 'Campus South',
		badge: 'Like New',
		category: 'Calculators',
	},
	{
		id: '3',
		title: 'Calculus II Exam Notes Bundle',
		price: 15,
		seller: 'Mike R.',
		location: 'Student Center',
		badge: 'High Quality',
		category: 'Notes',
	},
	{
		id: '4',
		title: 'Unisex Lab Coat (Size M)',
		price: 20,
		seller: 'David L.',
		location: 'West Dorms',
		badge: 'Brand New',
		category: 'Lab Gear',
	},
	{
		id: '5',
		title: 'Acrylic Master Set (12 colors)',
		price: 25,
		seller: 'Emma W.',
		location: 'North Gate',
		badge: 'Gently Used',
		category: 'Art Supplies',
	},
	{
		id: '6',
		title: 'Engineering Drafting Kit',
		price: 35,
		seller: 'Chris P.',
		location: 'Campus Market',
		badge: 'Well Loved',
		category: 'Other',
	},
	{
		id: '7',
		title: 'Physics II Lab Binder',
		price: 10,
		seller: 'Taylor B.',
		location: 'Lab Building',
		badge: 'Like New',
		category: 'Notes',
	},
	{
		id: '8',
		title: 'Noise Cancelling Headphones',
		price: 120,
		seller: 'Jordan M.',
		location: 'Main Quad',
		badge: 'Like New',
		category: 'Other',
	},
]

function formatPrice(value: number) {
	return `$${value.toFixed(2)}`
}

function badgeTone(badge: MarketplaceItem['badge']) {
	switch (badge) {
		case 'Brand New':
			return 'toneGreen'
		case 'High Quality':
			return 'toneGold'
		case 'Like New':
			return 'toneStone'
		case 'Gently Used':
			return 'toneStone'
		case 'Well Loved':
			return 'toneStone'
		case 'Used':
			return 'toneStone'
		default:
			return 'toneStone'
	}
}

function PlaceholderArt({ seed }: { seed: string }) {
	const colors = [
		['#f6efe7', '#e3d1c2'],
		['#eaf3ff', '#bcd3f2'],
		['#eef8f3', '#b7e2d0'],
		['#fff3e8', '#f2c6a0'],
		['#f2f2f2', '#c9c9c9'],
	]
	const index = Math.abs(
		Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0)
	)
	const [a, b] = colors[index % colors.length]

	return (
		<div className="art" aria-hidden="true">
			<div className="artGlow" />
			<div className="artInner" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} />
			<svg
				className="artMark"
				width="80"
				height="80"
				viewBox="0 0 80 80"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M20 56c10-18 30-30 40-32-2 10-14 30-32 40-4 2-9 2-12-1-3-3-3-8 0-12Z"
					stroke="rgba(40, 32, 24, 0.35)"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M44 28l8 8"
					stroke="rgba(40, 32, 24, 0.35)"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	)
}

export default function MarketplacePage() {
	const categories = ['All Items', 'Books', 'Notes', 'Calculators', 'Lab Gear', 'Art Supplies'] as const

	return (
		<div className="page">
			<header className="topbar" role="banner">
				<div className="topbarInner">
					<div className="brand">
						<div className="logoMark" aria-hidden="true">
							<span className="logoDot" />
						</div>
						<span className="brandName">KOSH</span>
					</div>

					<label className="search" aria-label="Search">
						<span className="searchIcon" aria-hidden="true">
							⌕
						</span>
						<input
							className="searchInput"
							placeholder="Search for textbooks, notes, or gear…"
							type="search"
						/>
					</label>

					<nav className="nav" aria-label="Primary">
						<a className="navLink navActive" href="#">
							Marketplace
						</a>
						<a className="navLink" href="#">
							Learning
						</a>
						<a className="navLink" href="#">
							Mentorship
						</a>
					</nav>

					<div className="actions">
						<button className="iconBtn" aria-label="Notifications">
							🔔
						</button>
						<button className="iconBtn" aria-label="Messages">
							💬
						</button>
						<button className="avatar" aria-label="Profile">
							<span aria-hidden="true">A</span>
						</button>
					</div>

					{/* Mobile topbar */}
					<div className="mobileTopbar" aria-hidden="true">
						<button className="iconBtn" tabIndex={-1}>
							←
						</button>
						<div className="mobileTitle">Marketplace</div>
						<button className="iconBtn" tabIndex={-1}>
							🔔
						</button>
					</div>
				</div>
			</header>

			<main className="content" role="main">
				<section className="hero">
					<div className="heroRow">
						<div>
							<h1 className="title">Stationery Marketplace</h1>
							<p className="subtitle">Buy & sell textbooks, notes, and study gear on campus.</p>
						</div>
						<a className="reset" href="#">
							Reset Filters
						</a>
					</div>

					<div className="pills" role="tablist" aria-label="Categories">
						{categories.map((c, idx) => (
							<a
								key={c}
								className={idx === 0 ? 'pill pillActive' : 'pill'}
								href="#"
								role="tab"
								aria-selected={idx === 0}
							>
								{c}
							</a>
						))}
					</div>

					<div className="filters" aria-label="Filters">
						<div className="filterBlock">
							<div className="filterLabel">Category</div>
							<button className="select" aria-label="Select category">
								<span>Select Category</span>
								<span aria-hidden="true">▾</span>
							</button>
						</div>
						<div className="filterBlock">
							<div className="filterLabel">Price Range</div>
							<button className="select" aria-label="Select price range">
								<span>Any Price</span>
								<span aria-hidden="true">▾</span>
							</button>
						</div>
						<div className="filterBlock">
							<div className="filterLabel">Condition</div>
							<button className="select" aria-label="Select condition">
								<span>All Conditions</span>
								<span aria-hidden="true">▾</span>
							</button>
						</div>
					</div>
				</section>

				{/* Desktop grid */}
				<section className="gridWrap" aria-label="Items">
					<div className="grid">
						{items.map((item) => (
							<article key={item.id} className="card">
								<div className="cardMedia">
									<span className={`badge ${badgeTone(item.badge)}`}>{item.badge}</span>
									<PlaceholderArt seed={item.title} />
								</div>
								<div className="cardBody">
									<div className="cardTitle" title={item.title}>
										{item.title}
									</div>
									<div className="cardPrice">{formatPrice(item.price)}</div>
									<div className="cardMeta">
										<span className="metaUser">👤 {item.seller}</span>
										<span className="metaDot" aria-hidden="true">
											•
										</span>
										<span className="metaLoc">📍 {item.location}</span>
									</div>
									<div className="cardActions">
										<a className="btn" href="#">
											View Details
										</a>
									</div>
								</div>
							</article>
						))}
					</div>

					<div className="pagination" aria-label="Pagination">
						<button className="pageBtn" aria-label="Previous page">
							‹
						</button>
						<button className="pageNum pageNumActive" aria-current="page">
							1
						</button>
						<button className="pageNum">2</button>
						<button className="pageNum">3</button>
						<span className="pageDots" aria-hidden="true">
							…
						</span>
						<button className="pageNum">12</button>
						<button className="pageBtn" aria-label="Next page">
							›
						</button>
					</div>
				</section>

				{/* Mobile section + bottom nav (visual only) */}
				<section className="mobileOnly" aria-label="Mobile marketplace">
					<div className="mobileSearch">
						<span className="searchIcon" aria-hidden="true">
							⌕
						</span>
						<input className="searchInput" placeholder="Search books, calculators, stationery…" type="search" />
					</div>

					<div className="pills mobilePills" role="tablist" aria-label="Mobile categories">
						{categories.slice(0, 4).map((c, idx) => (
							<a
								key={c}
								className={idx === 0 ? 'pill pillActive' : 'pill'}
								href="#"
								role="tab"
								aria-selected={idx === 0}
							>
								{c}
								{c !== 'All Items' && <span className="pillCaret" aria-hidden="true">▾</span>}
							</a>
						))}
					</div>

					<div className="mobileSectionHead">
						<div className="mobileSectionTitle">Recently Added</div>
						<a className="seeAll" href="#">
							See all
						</a>
					</div>

					<div className="mobileGrid">
						{items.map((item) => (
							<article key={`m-${item.id}`} className="mCard">
								<div className="mMedia">
									<span className={`mBadge ${badgeTone(item.badge)}`}>{item.badge.toUpperCase()}</span>
									<PlaceholderArt seed={`${item.title}-m`} />
								</div>
								<div className="mBody">
									<div className="mTitle" title={item.title}>
										{item.title}
									</div>
									<div className="mPrice">{formatPrice(item.price)}</div>
									<div className="mLoc">{item.location}</div>
								</div>
							</article>
						))}
					</div>
				</section>

				<footer className="footer" role="contentinfo">
					<div className="footerInner">
						<div className="footerBrand">
							<div className="brand">
								<div className="logoMark" aria-hidden="true">
									<span className="logoDot" />
								</div>
								<span className="brandName">KOSH</span>
							</div>
							<div className="footerNote">
								The college community hub for smart sharing, sustainable learning, and peer‑to‑peer mentorship.
							</div>
							<div className="footerCopyright">© {new Date().getFullYear()} KOSH. All rights reserved.</div>
						</div>
						<div className="footerCols" aria-label="Footer links">
							<div className="footerCol">
								<div className="footerTitle">Marketplace</div>
								<a href="#">Selling Guide</a>
								<a href="#">Safety Tips</a>
								<a href="#">Featured Listings</a>
							</div>
							<div className="footerCol">
								<div className="footerTitle">Community</div>
								<a href="#">Mentorship Hub</a>
								<a href="#">Discussion Boards</a>
								<a href="#">Events</a>
							</div>
							<div className="footerCol">
								<div className="footerTitle">Support</div>
								<a href="#">Help Center</a>
								<a href="#">Report a Scam</a>
								<a href="#">Contact Us</a>
							</div>
						</div>
						<div className="footerLegal">
							<a href="#">Terms of Service</a>
							<a href="#">Privacy Policy</a>
						</div>
					</div>
				</footer>
			</main>

			<button className="sellFab" aria-label="Sell item">
				<span className="sellPlus" aria-hidden="true">
					+
				</span>
				<span className="sellText">Sell Item</span>
			</button>

			<nav className="bottomNav" aria-label="Bottom navigation">
				<a className="bNavItem bNavActive" href="#">
					<span aria-hidden="true">⌂</span>
					<span>Home</span>
				</a>
				<a className="bNavItem" href="#">
					<span aria-hidden="true">🛍</span>
					<span>Shop</span>
				</a>
				<a className="bNavItem" href="#">
					<span aria-hidden="true">⧉</span>
					<span>Mentors</span>
				</a>
				<a className="bNavItem" href="#">
					<span aria-hidden="true">💬</span>
					<span>Chat</span>
				</a>
				<a className="bNavItem" href="#">
					<span aria-hidden="true">👤</span>
					<span>Profile</span>
				</a>
			</nav>

			<style jsx>{`
				:global(:root) {
					--bg: #fbf7f1;
					--surface: rgba(255, 255, 255, 0.75);
					--surface2: rgba(255, 255, 255, 0.9);
					--stroke: rgba(40, 32, 24, 0.12);
					--text: #231b13;
					--muted: rgba(35, 27, 19, 0.65);
					--brand: #6b4b35;
					--brand2: #8a5a3d;
					--shadow: 0 14px 45px rgba(20, 14, 9, 0.08);
					--radius: 20px;
				}

				.page {
					min-height: 100vh;
					background: radial-gradient(1200px 600px at 40% -20%, rgba(107, 75, 53, 0.12), transparent 60%),
						radial-gradient(900px 500px at 120% 20%, rgba(138, 90, 61, 0.08), transparent 55%), var(--bg);
					color: var(--text);
				}

				.topbar {
					position: sticky;
					top: 0;
					z-index: 50;
					backdrop-filter: blur(14px);
					background: rgba(251, 247, 241, 0.75);
					border-bottom: 1px solid var(--stroke);
				}

				.topbarInner {
					max-width: 1200px;
					margin: 0 auto;
					padding: 14px 16px;
					display: grid;
					grid-template-columns: auto 1fr auto auto;
					gap: 14px;
					align-items: center;
				}

				.brand {
					display: flex;
					align-items: center;
					gap: 10px;
					font-weight: 800;
					letter-spacing: 0.6px;
				}

				.logoMark {
					width: 28px;
					height: 28px;
					border-radius: 10px;
					background: rgba(107, 75, 53, 0.12);
					border: 1px solid rgba(107, 75, 53, 0.22);
					display: grid;
					place-items: center;
				}

				.logoDot {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background: var(--brand);
					box-shadow: 0 0 0 6px rgba(107, 75, 53, 0.12);
				}

				.brandName {
					font-size: 14px;
				}

				.search {
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 10px 12px;
					border-radius: 999px;
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.72);
					box-shadow: 0 10px 25px rgba(20, 14, 9, 0.06);
				}

				.searchIcon {
					color: rgba(35, 27, 19, 0.55);
					font-size: 14px;
					line-height: 1;
				}

				.searchInput {
					width: 100%;
					border: 0;
					outline: none;
					background: transparent;
					color: var(--text);
					font-size: 14px;
				}

				.nav {
					display: flex;
					gap: 18px;
					align-items: center;
					justify-content: center;
				}

				.navLink {
					font-size: 13px;
					text-decoration: none;
					color: rgba(35, 27, 19, 0.72);
					padding: 8px 10px;
					border-radius: 999px;
					transition: background 160ms ease, color 160ms ease;
				}

				.navLink:hover {
					background: rgba(107, 75, 53, 0.08);
					color: var(--text);
				}

				.navActive {
					color: var(--text);
					font-weight: 700;
				}

				.actions {
					display: flex;
					gap: 10px;
					align-items: center;
					justify-content: flex-end;
				}

				.iconBtn {
					width: 36px;
					height: 36px;
					border-radius: 999px;
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.72);
					box-shadow: 0 10px 25px rgba(20, 14, 9, 0.06);
					cursor: pointer;
				}

				.avatar {
					width: 36px;
					height: 36px;
					border-radius: 999px;
					border: 1px solid rgba(107, 75, 53, 0.25);
					background: rgba(107, 75, 53, 0.12);
					color: var(--brand);
					font-weight: 800;
					cursor: pointer;
				}

				.mobileTopbar {
					display: none;
					grid-column: 1 / -1;
					grid-template-columns: auto 1fr auto;
					align-items: center;
					gap: 10px;
				}

				.mobileTitle {
					text-align: center;
					font-weight: 900;
					font-size: 22px;
					letter-spacing: 0.3px;
				}

				.content {
					max-width: 1200px;
					margin: 0 auto;
					padding: 24px 16px 110px;
				}

				.hero {
					background: rgba(255, 255, 255, 0.55);
					border: 1px solid var(--stroke);
					border-radius: 26px;
					padding: 22px 22px 18px;
					box-shadow: var(--shadow);
				}

				.heroRow {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					gap: 16px;
					margin-bottom: 14px;
				}

				.title {
					font-size: 34px;
					letter-spacing: -0.8px;
					margin-bottom: 6px;
				}

				.subtitle {
					color: var(--muted);
					font-size: 14px;
				}

				.reset {
					font-size: 12px;
					color: var(--brand);
					text-decoration: none;
					padding: 10px 12px;
					border-radius: 999px;
					border: 1px solid rgba(107, 75, 53, 0.22);
					background: rgba(255, 255, 255, 0.55);
					white-space: nowrap;
				}

				.pills {
					display: flex;
					flex-wrap: wrap;
					gap: 10px;
					margin-bottom: 16px;
				}

				.pill {
					display: inline-flex;
					gap: 6px;
					align-items: center;
					text-decoration: none;
					padding: 10px 14px;
					border-radius: 999px;
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.72);
					color: rgba(35, 27, 19, 0.82);
					font-size: 13px;
				}

				.pillActive {
					background: rgba(107, 75, 53, 0.12);
					border-color: rgba(107, 75, 53, 0.24);
					color: var(--text);
					font-weight: 700;
				}

				.pillCaret {
					opacity: 0.6;
					font-size: 12px;
				}

				.filters {
					display: grid;
					grid-template-columns: repeat(3, minmax(0, 1fr));
					gap: 14px;
					align-items: end;
				}

				.filterLabel {
					color: rgba(35, 27, 19, 0.6);
					font-size: 11px;
					letter-spacing: 0.12em;
					text-transform: uppercase;
					margin: 0 0 6px;
				}

				.select {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 10px;
					border-radius: 999px;
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.72);
					padding: 12px 14px;
					cursor: pointer;
					color: rgba(35, 27, 19, 0.85);
					font-size: 13px;
				}

				.gridWrap {
					margin-top: 18px;
				}

				.grid {
					display: grid;
					grid-template-columns: repeat(4, minmax(0, 1fr));
					gap: 18px;
				}

				.card {
					border-radius: 22px;
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.66);
					box-shadow: 0 14px 40px rgba(20, 14, 9, 0.06);
					overflow: hidden;
					display: grid;
					grid-template-rows: auto 1fr;
					min-height: 280px;
				}

				.cardMedia {
					position: relative;
					padding: 14px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.4));
				}

				.badge {
					position: absolute;
					top: 12px;
					left: 12px;
					font-size: 11px;
					padding: 6px 10px;
					border-radius: 999px;
					border: 1px solid rgba(35, 27, 19, 0.14);
					background: rgba(255, 255, 255, 0.75);
					font-weight: 700;
				}

				.toneGreen {
					background: rgba(23, 163, 98, 0.14);
					border-color: rgba(23, 163, 98, 0.24);
					color: #0f6b42;
				}

				.toneGold {
					background: rgba(180, 122, 45, 0.14);
					border-color: rgba(180, 122, 45, 0.24);
					color: #7e4f17;
				}

				.toneStone {
					background: rgba(107, 75, 53, 0.14);
					border-color: rgba(107, 75, 53, 0.22);
					color: var(--brand);
				}

				.art {
					height: 132px;
					border-radius: 18px;
					position: relative;
					overflow: hidden;
					border: 1px solid rgba(40, 32, 24, 0.12);
					background: rgba(255, 255, 255, 0.55);
				}

				.artGlow {
					position: absolute;
					inset: -30px;
					background: radial-gradient(circle at 30% 30%, rgba(107, 75, 53, 0.14), transparent 55%);
				}

				.artInner {
					position: absolute;
					inset: 0;
				}

				.artMark {
					position: absolute;
					right: 10px;
					bottom: 8px;
					opacity: 0.55;
				}

				.cardBody {
					padding: 14px 14px 16px;
					display: grid;
					gap: 8px;
					align-content: start;
				}

				.cardTitle {
					font-weight: 800;
					font-size: 13px;
					line-height: 1.25;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.cardPrice {
					font-weight: 900;
					color: var(--brand);
				}

				.cardMeta {
					display: flex;
					align-items: center;
					gap: 8px;
					color: rgba(35, 27, 19, 0.62);
					font-size: 12px;
					flex-wrap: wrap;
				}

				.metaDot {
					opacity: 0.5;
				}

				.cardActions {
					margin-top: 4px;
				}

				.btn {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					padding: 10px 12px;
					border-radius: 999px;
					border: 1px solid rgba(107, 75, 53, 0.22);
					background: rgba(255, 255, 255, 0.75);
					text-decoration: none;
					color: rgba(35, 27, 19, 0.85);
					font-size: 12px;
					font-weight: 700;
				}

				.pagination {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 10px;
					margin: 22px 0 6px;
				}

				.pageBtn {
					width: 34px;
					height: 34px;
					border-radius: 999px;
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.72);
					cursor: pointer;
				}

				.pageNum {
					width: 34px;
					height: 34px;
					border-radius: 999px;
					border: 1px solid transparent;
					background: transparent;
					cursor: pointer;
					color: rgba(35, 27, 19, 0.7);
				}

				.pageNumActive {
					background: rgba(107, 75, 53, 0.14);
					border-color: rgba(107, 75, 53, 0.22);
					color: var(--text);
					font-weight: 800;
				}

				.pageDots {
					color: rgba(35, 27, 19, 0.55);
					padding: 0 4px;
				}

				.footer {
					margin-top: 22px;
					padding: 28px 0 10px;
					border-top: 1px solid var(--stroke);
				}

				.footerInner {
					display: grid;
					grid-template-columns: 1.2fr 1.4fr;
					gap: 20px;
					align-items: start;
				}

				.footerBrand {
					display: grid;
					gap: 10px;
				}

				.footerNote {
					color: rgba(35, 27, 19, 0.62);
					font-size: 13px;
					max-width: 420px;
				}

				.footerCopyright {
					color: rgba(35, 27, 19, 0.55);
					font-size: 12px;
				}

				.footerCols {
					display: grid;
					grid-template-columns: repeat(3, minmax(0, 1fr));
					gap: 16px;
				}

				.footerCol {
					display: grid;
					gap: 8px;
				}

				.footerTitle {
					font-weight: 900;
					font-size: 13px;
					margin-bottom: 4px;
				}

				.footerCol a {
					text-decoration: none;
					color: rgba(35, 27, 19, 0.65);
					font-size: 13px;
				}

				.footerLegal {
					grid-column: 1 / -1;
					display: flex;
					justify-content: flex-end;
					gap: 16px;
					margin-top: 8px;
				}

				.footerLegal a {
					text-decoration: none;
					color: rgba(35, 27, 19, 0.55);
					font-size: 12px;
				}

				.sellFab {
					position: fixed;
					right: 18px;
					bottom: 94px;
					z-index: 60;
					display: inline-flex;
					align-items: center;
					gap: 10px;
					padding: 12px 14px;
					border-radius: 999px;
					border: 1px solid rgba(107, 75, 53, 0.25);
					background: rgba(107, 75, 53, 0.92);
					color: #fff;
					box-shadow: 0 18px 45px rgba(20, 14, 9, 0.18);
					cursor: pointer;
				}

				.sellPlus {
					width: 26px;
					height: 26px;
					border-radius: 999px;
					display: grid;
					place-items: center;
					background: rgba(255, 255, 255, 0.14);
					font-weight: 900;
				}

				.sellText {
					font-weight: 800;
					font-size: 13px;
				}

				.bottomNav {
					display: none;
					position: fixed;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 55;
					background: rgba(251, 247, 241, 0.9);
					backdrop-filter: blur(14px);
					border-top: 1px solid var(--stroke);
					padding: 10px 14px;
					justify-content: space-between;
				}

				.bNavItem {
					display: grid;
					gap: 6px;
					justify-items: center;
					text-decoration: none;
					color: rgba(35, 27, 19, 0.55);
					font-size: 11px;
					width: 20%;
				}

				.bNavActive {
					color: var(--brand);
					font-weight: 800;
				}

				.mobileOnly {
					display: none;
				}

				.mobileSearch {
					margin-top: 12px;
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 12px 14px;
					border-radius: 18px;
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.75);
					box-shadow: 0 10px 25px rgba(20, 14, 9, 0.06);
				}

				.mobileSectionHead {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 14px 0 10px;
				}

				.mobileSectionTitle {
					font-size: 22px;
					font-weight: 900;
				}

				.seeAll {
					color: var(--brand);
					text-decoration: none;
					font-weight: 800;
				}

				.mobileGrid {
					display: grid;
					grid-template-columns: repeat(2, minmax(0, 1fr));
					gap: 14px;
				}

				.mCard {
					border: 1px solid var(--stroke);
					background: rgba(255, 255, 255, 0.72);
					border-radius: 18px;
					overflow: hidden;
					box-shadow: 0 14px 40px rgba(20, 14, 9, 0.06);
				}

				.mMedia {
					position: relative;
					padding: 12px;
				}

				.mBadge {
					position: absolute;
					top: 10px;
					left: 10px;
					font-size: 10px;
					padding: 6px 10px;
					border-radius: 999px;
					border: 1px solid rgba(35, 27, 19, 0.12);
					background: rgba(255, 255, 255, 0.8);
					font-weight: 900;
					letter-spacing: 0.04em;
				}

				.mBody {
					padding: 10px 12px 12px;
					display: grid;
					gap: 6px;
				}

				.mTitle {
					font-weight: 900;
					font-size: 13px;
					line-height: 1.2;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.mPrice {
					color: var(--brand);
					font-weight: 900;
				}

				.mLoc {
					color: rgba(35, 27, 19, 0.62);
					font-size: 12px;
				}

				@media (max-width: 980px) {
					.topbarInner {
						grid-template-columns: auto 1fr auto;
					}
					.nav {
						display: none;
					}
					.grid {
						grid-template-columns: repeat(3, minmax(0, 1fr));
					}
				}

				@media (max-width: 720px) {
					.topbarInner {
						grid-template-columns: 1fr;
					}
					.brand,
					.search,
					.actions {
						display: none;
					}
					.mobileTopbar {
						display: grid;
					}
					.content {
						padding-top: 14px;
						padding-bottom: 140px;
					}
					.hero,
					.gridWrap {
						display: none;
					}
					.mobileOnly {
						display: block;
					}
					.bottomNav {
						display: flex;
					}
					.sellFab {
						bottom: 88px;
						right: 16px;
						padding: 14px 16px;
					}
					.sellText {
						display: inline;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.navLink,
					.pill {
						transition: none;
					}
				}
			`}</style>
		</div>
	)
}
