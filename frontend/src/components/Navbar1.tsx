"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
	label: string;
	href: string;
};

const navItems: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Mentorship", href: "/mentorship" },
	{ label: "Marketplace", href: "/marketplace" },
	{ label: "Chat", href: "/chat" },
];

export function Navbar1() {
	const pathname = usePathname() || "/";

	return (
		<header className="sticky top-0 z-50 w-full border-b border-amber-900/40 bg-amber-950 text-amber-50">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
				{/* Left: logo + title */}
				<Link href="/" className="flex items-center gap-3">
					<span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-900/60 ring-1 ring-amber-200/15">
						<img
							src="/win.svg"
							alt="KOSH"
							className="h-6 w-6"
						/>
					</span>
					<span className="text-base font-semibold tracking-wide">KOSH</span>
				</Link>

				{/* Center: nav */}
				<nav className="flex flex-1 items-center justify-center">
					<ul className="flex items-center gap-1 rounded-full bg-amber-900/15 p-1 ring-1 ring-amber-200/10">
						{navItems.map((item) => {
							const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

							return (
								<li key={item.href}>
									<Link
										href={item.href}
										aria-current={isActive ? "page" : undefined}
										className={
											"block rounded-full px-4 py-2 text-sm font-medium transition-colors " +
											(isActive
												? "bg-amber-200/10 text-amber-100"
												: "text-amber-50/90 hover:bg-amber-200/10 hover:text-amber-100")
										}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Right: profile */}
				<Link
					href="/dashboard"
					className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-amber-50/90 transition-colors hover:bg-amber-200/10 hover:text-amber-100"
				>
					<span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-900/60 ring-1 ring-amber-200/15">
						<span className="text-sm font-semibold">P</span>
					</span>
					<span>Profile</span>
				</Link>
			</div>
		</header>
	);
}

