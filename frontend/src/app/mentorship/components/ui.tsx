'use client';

import { motion } from "framer-motion";
import { T } from "./theme";

/* ── Skill Tag ── */
export function SkillTag({
  label,
  active = false,
  onClick,
  small = false,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  small?: boolean;
}) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: small ? "3px 10px" : "5px 14px",
        borderRadius: 20,
        fontSize: small ? 11 : 12,
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        background: active ? T.activeBg : T.tagBg,
        color: active ? T.accentDark : T.accent,
        border: `1.5px solid ${active ? T.accentLight : T.borderLight}`,
        cursor: onClick ? "pointer" : "default",
        letterSpacing: "0.3px",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {label}
    </motion.span>
  );
}

/* ── Role Badge ── */
export function RoleBadge({ role }: { role: "mentor" | "mentee" | "both" }) {
  const config = {
    mentor: { label: "Mentor", bg: "linear-gradient(135deg, #8b6f47, #6b4423)", color: "#fff" },
    mentee: { label: "Mentee", bg: "linear-gradient(135deg, #5a9e6f, #3d7a52)", color: "#fff" },
    both: { label: "Mentor & Mentee", bg: "linear-gradient(135deg, #d4a574, #8b6f47)", color: "#fff" },
  };
  const c = config[role];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        background: c.bg,
        color: c.color,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        fontFamily: "'Inter', sans-serif",
        boxShadow: "0 2px 8px rgba(107, 68, 35, 0.25)",
      }}
    >
      {c.label}
    </span>
  );
}

/* ── Avatar ── */
export function Avatar({
  name,
  size = 44,
  src,
  online = false,
}: {
  name: string;
  size?: number;
  src?: string;
  online?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate deterministic color from name
  const colors = [
    ["#8b6f47", "#6b4423"],
    ["#5a9e6f", "#3d7a52"],
    ["#c9956e", "#a0684a"],
    ["#7b8ec8", "#5a6fb0"],
    ["#c97b7b", "#a55555"],
    ["#82a87a", "#5d8255"],
  ];
  const idx = name.charCodeAt(0) % colors.length;
  const [from, to] = colors[idx];

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${from}, ${to})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.36,
          fontWeight: 800,
          color: "#fff",
          fontFamily: "'Playfair Display', Georgia, serif",
          boxShadow: `0 4px 12px rgba(107, 68, 35, 0.25)`,
          border: "2.5px solid rgba(255,255,255,0.6)",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      {online && (
        <div
          style={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: "50%",
            background: "#5a9e6f",
            border: "2px solid #fff",
          }}
        />
      )}
    </div>
  );
}

/* ── Star Rating ── */
export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i < Math.floor(rating) ? "#f7931e" : i < rating ? "#f7931e" : "none"}
            stroke="#f7931e"
            strokeWidth="1.5"
            opacity={i >= Math.ceil(rating) ? 0.3 : 1}
          />
        </svg>
      ))}
      <span
        style={{
          fontSize: 12,
          color: T.textMuted,
          fontWeight: 600,
          marginLeft: 3,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

/* ── Section Heading ── */
export function SectionHeading({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 800,
            fontFamily: "'Playfair Display', Georgia, serif",
            color: T.textDark,
            letterSpacing: "0.3px",
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 14,
              color: T.textMuted,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {sub}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/* ── Coffee Divider ── */
export function CoffeeDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "24px 0",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #d4a574)" }} />
      <svg width="16" height="16" viewBox="0 0 40 40">
        <ellipse cx="20" cy="20" rx="10" ry="14" fill="#d4a574" transform="rotate(-30 20 20)" />
        <ellipse cx="20" cy="20" rx="4" ry="6" fill="#8b6f47" transform="rotate(-30 20 20)" />
      </svg>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #d4a574, transparent)" }} />
    </div>
  );
}

/* ── Button ── */
export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  fullWidth = false,
  icon,
  style = {},
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const styles = {
    primary: {
      background: "linear-gradient(135deg, #f5ede4, #f0e8e0)", // More brownish creamy light
      color: T.textDark,
      border: `1.5px solid ${T.borderLight}`,
      boxShadow: "0 2px 8px rgba(139, 111, 71, 0.07)",
    },
    secondary: {
      background: "linear-gradient(135deg, #fdf8f4, #f5ede4)",
      color: T.text,
      border: `2px solid ${T.border}`,
      boxShadow: "0 2px 8px rgba(107, 68, 35, 0.1)",
    },
    ghost: {
      background: "transparent",
      color: T.accent,
      border: `1.5px solid ${T.border}`,
      boxShadow: "none",
    },
    danger: {
      background: "linear-gradient(135deg, #e55b4d, #c0392b)",
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 16px rgba(229, 91, 77, 0.35)",
    },
  };

  const sizes = {
    sm: { padding: "7px 16px", fontSize: 12 },
    md: { padding: "10px 22px", fontSize: 14 },
    lg: { padding: "14px 28px", fontSize: 16 },
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        ...sizes[size],
        borderRadius: 14,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        width: fullWidth ? "100%" : "auto",
        justifyContent: fullWidth ? "center" : "flex-start",
        letterSpacing: "0.3px",
        transition: "all 0.2s ease",
        visibility: "visible", // Ensure button is always visible
        zIndex: 1, // Ensure button is above other elements
        ...style, // Allow custom styles to override
      }}
    >
      {icon}
      {children}
    </motion.button>
  );
}

/* ── Card wrapper ── */
export function Card({
  children,
  style = {},
  hover = true,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: `0 16px 40px rgba(107, 68, 35, 0.18)` } : undefined}
      onClick={onClick}
      style={{
        background: T.cardBg,
        borderRadius: 20,
        border: `1.5px solid ${T.border}`,
        padding: 24,
        boxShadow: `0 4px 20px ${T.shadow}`,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
