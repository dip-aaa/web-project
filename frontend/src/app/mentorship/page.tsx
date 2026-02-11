'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MentorshipOverview } from "./components/MentorshipOverview";
import { MentorBrowse } from "./components/MentorBrowse";
import { CalloutFeed } from "./components/CalloutFeed";
import Sidebar from "../../components/sidebar";

/* ──────────────────────────────────────────────
   Types
────────────────────────────────────────────── */
export type Tab = "overview" | "browse" | "callouts";

/* ──────────────────────────────────────────────
   Navigation Cards
────────────────────────────────────────────── */
function NavigationCards({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const cards = [
    { id: "overview" as Tab, label: "Overview", emoji: "🏠" },
    { id: "browse" as Tab, label: "Find Mentors", emoji: "🔍" },
    { id: "callouts" as Tab, label: "Callouts", emoji: "📢" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: 16,
        padding: 8,
        boxShadow: "0 2px 20px rgba(139, 111, 71, 0.06)",
        border: "1px solid #f0e6dc",
        marginBottom: 40,
      }}
    >
      {cards.map((card) => {
        const isActive = active === card.id;
        return (
          <motion.div
            key={card.id}
            onClick={() => onChange(card.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 16px",
              borderRadius: 12,
              cursor: "pointer",
              background: isActive
                ? "linear-gradient(135deg, #f0e6dc, #e8ddd4)"
                : "transparent",
              color: isActive ? "#6b4423" : "#a0826d",
              transition: "all 0.2s ease",
              boxShadow: isActive ? "0 2px 12px rgba(139, 111, 71, 0.15)" : "none",
            }}
          >
            <span style={{ fontSize: 18 }}>{card.emoji}</span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {card.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Page Header
────────────────────────────────────────────── */
function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 32 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Icon */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "linear-gradient(135deg, #f0e6dc, #e8ddd4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            boxShadow: "0 4px 16px rgba(139, 111, 71, 0.15)",
          }}
        >
          🧑‍🎓
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "#6b4423",
              letterSpacing: "-0.5px",
            }}
          >
            Mentorship Hub
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 14,
              color: "#a0826d",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Connect with seniors, guide juniors, grow together — all within your college
          </p>
        </div>

        {/* Status chip */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 12,
            background: "rgba(90, 158, 111, 0.1)",
            border: "1px solid rgba(90, 158, 111, 0.2)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#5a9e6f",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#5a9e6f",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            IIT Bombay Campus
          </span>
        </div>
        {/* Coffee coins display */}
        <div
          style={{
            marginLeft: 18,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 18px",
            borderRadius: 12,
            background: "#fff8e1",
            border: "1px solid #f0e6dc",
            boxShadow: "0 2px 12px rgba(139, 111, 71, 0.08)",
          }}
        >
          <span style={{ fontSize: 20 }}>☕</span>
          <span style={{ fontWeight: 700, color: "#bfa77a", fontSize: 18, fontFamily: "system-ui, -apple-system, sans-serif" }}>320</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main Page
────────────────────────────────────────────── */
export default function MentorsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to-br, #f9f6f3, #fdfcfa, #f5f0eb)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div style={{ minWidth: 220, maxWidth: 260, background: "#fff", borderRight: "1.5px solid #f0e6dc", zIndex: 2, position: "sticky", top: 0, height: "100vh" }}>
        <Sidebar animate={false} />
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          maxWidth: "none",
          margin: 0,
          padding: "32px 40px",
          overflow: "auto",
          background: "transparent",
          height: "100vh",
          scrollBehavior: "smooth",
        }}
      >
        <PageHeader />
        <NavigationCards active={activeTab} onChange={setActiveTab} />

        {/* Page content based on selection */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === "overview" && <MentorshipOverview />}
            {activeTab === "browse" && <MentorBrowse />}
            {activeTab === "callouts" && <CalloutFeed />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
