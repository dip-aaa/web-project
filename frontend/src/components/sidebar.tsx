'use client';

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ── Coffee-themed color palette matching the dashboard ── */
export const T = {
  sidebarBg: "linear-gradient(180deg, #f9f6f3 0%, #f5f0eb 50%, #f0e8e0 100%)",
  accent: "#8b6f47",
  accentLight: "#d4a574",
  accentDark: "#6b4423",
  gold: "#ffd89b",
  text: "#6b4423",
  textSoft: "#8b6f47",
  textMuted: "#a0826d",
  border: "#e8ddd4",
  cardBg: "#ffffff",
  hoverBg: "linear-gradient(135deg, #f5f0eb, #f0e8e0)",
  activeBg: "linear-gradient(135deg, #e8c5a0, #d4a574)",
};

const navItems: Array<{
  id: string;
  label: string;
  type: string;
  href?: string;
}> = [
  { id: "dashboard", label: "Dashboard", type: "grid", href: "/dashboard" },
  { id: "mentors", label: "Mentors", type: "users", href: "/mentorship" },
  { id: "market", label: "Marketplace", type: "shop", href: "/marketplace" },
  { id: "chat", label: "Chat", type: "chat", href: "/chat" },
  { id: "alerts", label: "Alerts", type: "bell" },
];

// Custom SVG Icons with coffee theme
export function Icon({ type, size = 22 }: { type: string; size?: number }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "grid":
      return (
        <svg {...commonProps}>
          <defs>
            <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="7" height="7" rx="2" stroke="url(#gridGrad)" />
          <rect x="14" y="3" width="7" height="7" rx="2" stroke="url(#gridGrad)" />
          <rect x="3" y="14" width="7" height="7" rx="2" stroke="url(#gridGrad)" />
          <rect x="14" y="14" width="7" height="7" rx="2" stroke="url(#gridGrad)" />
        </svg>
      );
    case "users":
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="7" r="4" stroke="currentColor" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" />
          <circle cx="17" cy="7" r="3" stroke="currentColor" opacity="0.7" />
          <path d="M16 21v-2a4 4 0 0 1 2-3.5" stroke="currentColor" opacity="0.7" />
        </svg>
      );
    case "shop":
      return (
        <svg {...commonProps}>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" />
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" />
          <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" />
        </svg>
      );
    case "chat":
      return (
        <svg {...commonProps}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" />
          <line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="9" y1="14" x2="13" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "bell":
      return (
        <svg {...commonProps}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" />
          <circle cx="18" cy="6" r="3" fill="#ff6b35" opacity="0.8" />
        </svg>
      );
    default:
      return null;
  }
}

// Coffee Cup SVG for logo
const CoffeeCupLogo = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="cupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#ffd89b" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    {/* Cup */}
    <path d="M25 40 Q22 50 25 70 L75 70 Q78 50 75 40 Z" fill="url(#cupGrad)" />
    <ellipse cx="50" cy="40" rx="25" ry="8" fill="#f5f0eb" />
    {/* Handle */}
    <path
      d="M77 45 Q90 45 90 57.5 Q90 70 77 70"
      stroke="#ffd89b"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    {/* Steam */}
    <motion.path
      d="M40 30 Q38 20 40 10"
      stroke="#d4a574"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M50 32 Q48 22 50 12"
      stroke="#d4a574"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      animate={{ opacity: [0.7, 0.3, 0.7], y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.path
      d="M60 30 Q62 20 60 10"
      stroke="#d4a574"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    />
  </svg>
);

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        width: collapsed ? 85 : 260,
        minHeight: "100vh",
        flexShrink: 0,
        background: T.sidebarBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 0 28px",
        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        boxShadow: "8px 0 32px rgba(107, 68, 35, 0.12)",
        zIndex: 10,
        borderRight: `1px solid ${T.border}`,
      }}
    >
      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 12,
          marginBottom: 42,
          overflow: "hidden",
          width: "100%",
          justifyContent: collapsed ? "center" : "flex-start",
          paddingLeft: collapsed ? 0 : 20,
        }}
      >
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
          transition={{ duration: 0.5 }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            flexShrink: 0,
            background: "linear-gradient(135deg, #8b6f47, #6b4423)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(107, 68, 35, 0.35)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <CoffeeCupLogo />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  color: T.text,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                }}
              >
                KOSH
              </div>
              <div
                style={{
                  color: T.accent,
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  marginTop: -2,
                }}
              >
                COLLEGE CAFFEINE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <nav
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: collapsed ? "0 12px" : "0 16px",
        }}
      >
        {navItems.map((item, idx) => {
          const isActive = item.href
            ? pathname === item.href || pathname.startsWith(`${item.href}/`)
            : false;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (item.href) router.push(item.href);
              }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: 14,
                padding: collapsed ? "16px 0" : "14px 18px",
                borderRadius: 16,
                border: "none",
                cursor: "pointer",
                width: "100%",
                outline: "none",
                background: isActive ? T.activeBg : "transparent",
                color: isActive ? "#3e2723" : T.text,
                fontWeight: isActive ? 700 : 600,
                fontSize: 15,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                boxShadow: isActive
                  ? "0 4px 16px rgba(212, 165, 116, 0.4), inset 0 1px 0 rgba(255,255,255,0.4)"
                  : "none",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = T.hoverBg;
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(139, 111, 71, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    style={{
                      position: "absolute",
                      left: collapsed ? 0 : -16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 5,
                      height: "60%",
                      borderRadius: "0 8px 8px 0",
                      background: "linear-gradient(180deg, #8b6f47, #6b4423)",
                      boxShadow: "0 0 12px rgba(107, 68, 35, 0.5)",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Shine effect */}
              {isActive && (
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    pointerEvents: "none",
                  }}
                />
              )}

              <motion.span
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  flexShrink: 0,
                  width: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isActive ? "#6b4423" : T.accent,
                  filter: isActive ? "drop-shadow(0 2px 4px rgba(107,68,35,0.3))" : "none",
                }}
              >
                <Icon type={item.type} />
              </motion.span>

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{
                      fontSize: 15,
                      fontWeight: isActive ? 700 : 600,
                      fontFamily: "'Inter', sans-serif",
                      color: isActive ? "#3e2723" : T.text,
                      letterSpacing: "0.2px",
                    }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Notification badge for Alerts */}
              {item.id === "alerts" && !collapsed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  style={{
                    marginLeft: "auto",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff6b35, #f7931e)",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(255, 107, 53, 0.4)",
                  }}
                >
                  3
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          width: collapsed ? 40 : "calc(100% - 32px)",
          height: 1,
          background: "linear-gradient(90deg, transparent, #d4a574, transparent)",
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{
          marginTop: "auto",
          width: collapsed ? 56 : "calc(100% - 32px)",
          padding: 0,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "linear-gradient(135deg, #ffffff, #f9f6f3)",
            borderRadius: 18,
            padding: collapsed ? "14px 0" : "16px",
            display: "flex",
            alignItems: "center",
            gap: collapsed ? 0 : 12,
            justifyContent: collapsed ? "center" : "flex-start",
            border: `2px solid ${T.border}`,
            boxShadow: "0 4px 16px rgba(107, 68, 35, 0.15)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              flexShrink: 0,
              background: "linear-gradient(135deg, #8b6f47, #6b4423)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(107, 68, 35, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            A
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                style={{ flex: 1 }}
              >
                <div
                  style={{
                    color: T.text,
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Aarav
                </div>
                <div
                  style={{
                    color: T.accent,
                    fontSize: 11,
                    fontWeight: 600,
                    marginTop: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>Level 3</span>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <span>1250 XP</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* XP Progress Bar (only when expanded) */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              width: "calc(100% - 32px)",
              marginTop: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: T.textMuted,
                marginBottom: 8,
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Progress to Level 4</span>
              <span>62%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 8,
                background: "rgba(139, 111, 71, 0.15)",
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "62.5%" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #8b6f47, #6b4423)",
                  borderRadius: 10,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCollapsed((c) => !c)}
        style={{
          position: "absolute",
          right: -18,
           top: "60%",
          transform: "translateY(-50%)",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "3px solid #f9f6f3",
          background: "linear-gradient(135deg, #d4a574, #c9a27b)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(107, 68, 35, 0.3)",
          transition: "all 0.3s ease",
          zIndex: 20,
        }}
      >
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          animate={{ rotate: collapsed ? 0 : 180 }}
          transition={{ duration: 0.4 }}
        >
          <path d="M3 6l6-4v8z" fill="#ffffff" />
        </motion.svg>
      </motion.button>

      {/* Decorative coffee bean */}
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          y: [0, -3, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          opacity: collapsed ? 0 : 0.15,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 40 40">
          <ellipse
            cx="20"
            cy="20"
            rx="10"
            ry="14"
            fill="#8b6f47"
            transform="rotate(-30 20 20)"
          />
          <ellipse
            cx="20"
            cy="20"
            rx="4"
            ry="6"
            fill="#6b4423"
            transform="rotate(-30 20 20)"
          />
        </svg>
      </motion.div>
    </motion.aside>
  );
}