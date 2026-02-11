'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { T } from "./theme";
import { Avatar, Button, Card } from "./ui";
import { MOCK_MENTORS, MOCK_CALLOUTS, type CalloutPost } from "./data";

const TYPE_CONFIG = {
  opportunity: { label: "Opportunity", emoji: "🎯", bg: "rgba(90, 158, 111, 0.12)", color: "#3d7a52", border: "rgba(90, 158, 111, 0.3)" },
  request: { label: "Looking For", emoji: "🔍", bg: "rgba(123, 142, 200, 0.12)", color: "#5a6fb0", border: "rgba(123, 142, 200, 0.3)" },
  event: { label: "Event", emoji: "📅", bg: "rgba(247, 147, 30, 0.12)", color: "#c97b1a", border: "rgba(247, 147, 30, 0.3)" },
  collab: { label: "Collab", emoji: "🤝", bg: "rgba(201, 127, 110, 0.12)", color: "#a0684a", border: "rgba(201, 127, 110, 0.3)" },
};

function CalloutCard({ post, delay = 0 }: { post: CalloutPost; delay?: number }) {
  const [liked, setLiked] = useState(false);
  const [responded, setResponded] = useState(false);
  const author = MOCK_MENTORS.find((m) => m.id === post.authorId);
  const tc = TYPE_CONFIG[post.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card style={{ padding: "20px 22px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
          {author && <Avatar name={author.name} size={40} online={author.online} />}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.textDark, fontFamily: "'Inter', sans-serif" }}>
                {author?.name ?? "A Student"}
              </span>
              <span style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>
                {author?.year} · {author?.branch}
              </span>
            </div>
            <span style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>{post.timestamp}</span>
          </div>

          {/* Type Badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 12px", borderRadius: 12,
            background: tc.bg, color: tc.color,
            border: `1.5px solid ${tc.border}`,
            fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif",
            whiteSpace: "nowrap",
          }}>
            {tc.emoji} {tc.label}
          </span>
        </div>

        {/* Content */}
        <h3 style={{
          margin: "0 0 8px",
          fontSize: 16,
          fontWeight: 800,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: T.textDark,
          lineHeight: 1.3,
        }}>
          {post.title}
        </h3>
        <p style={{
          margin: "0 0 14px",
          fontSize: 13,
          lineHeight: 1.7,
          color: T.textSoft,
          fontFamily: "'Inter', sans-serif",
        }}>
          {post.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {post.tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 10,
              background: T.tagBg, color: T.accent,
              border: `1.5px solid ${T.borderLight}`,
              fontWeight: 600, fontFamily: "'Inter', sans-serif"
            }}>#{t}</span>
          ))}
        </div>

        {/* Meta info */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          {post.spots !== undefined && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16 }}>👥</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: post.spotsLeft === 1 ? "#e55b4d" : T.success, fontFamily: "'Inter', sans-serif" }}>
                  {post.spotsLeft} spot{post.spotsLeft !== 1 ? "s" : ""} left
                </div>
                <div style={{ fontSize: 10, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>of {post.spots}</div>
              </div>
              {/* Spot progress */}
              <div style={{ width: 60, height: 4, background: T.borderLight, borderRadius: 4, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((post.spots! - post.spotsLeft!) / post.spots!) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #8b6f47, #6b4423)", borderRadius: 4 }}
                />
              </div>
            </div>
          )}
          {post.deadline && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>
              <span>📅</span>
              <span>Deadline: <strong style={{ color: T.text }}>{post.deadline}</strong></span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 14,
          borderTop: `1px solid ${T.borderLight}`,
        }}>
          <div style={{ display: "flex", gap: 16 }}>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setLiked((l) => !l)}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, color: liked ? "#e55b4d" : T.textMuted,
                fontFamily: "'Inter', sans-serif", fontWeight: 600,
              }}
            >
              {liked ? "❤️" : "🤍"} {post.likes + (liked ? 1 : 0)}
            </motion.button>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>
              💬 {post.responses + (responded ? 1 : 0)}
            </span>
          </div>
          <Button
            variant={responded ? "secondary" : "primary"}
            size="sm"
            onClick={() => setResponded(true)}
          >
            {responded ? "✓ Applied" : post.type === "request" ? "Offer Help" : "Apply Now"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

/* ── New Callout Form ── */
function NewCalloutForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<CalloutPost["type"]>("opportunity");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: `2px solid ${T.border}`,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: T.textDark,
    background: T.cream,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: T.cardBg,
        borderRadius: 20,
        border: `1.5px solid ${T.border}`,
        padding: 24,
        marginBottom: 24,
        boxShadow: `0 8px 32px ${T.shadowMd}`,
      }}
    >
      <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: T.textDark }}>
        Post a Callout ✦
      </h3>

      {/* Type Selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {(Object.keys(TYPE_CONFIG) as CalloutPost["type"][]).map((t) => {
          const tc = TYPE_CONFIG[t];
          return (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                padding: "7px 14px",
                borderRadius: 12,
                border: `2px solid ${type === t ? tc.border : T.border}`,
                background: type === t ? tc.bg : "transparent",
                color: type === t ? tc.color : T.textMuted,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
              }}
            >
              {tc.emoji} {tc.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          placeholder="Title — e.g. 'Looking for 2 React mentees for project'"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Describe what you're offering or looking for..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={onClose}>Post Callout</Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Full Callout Feed ── */
export function CalloutFeed() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | CalloutPost["type"]>("all");

  const filtered = filter === "all" ? MOCK_CALLOUTS : MOCK_CALLOUTS.filter((c) => c.type === filter);

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flex: 1, flexWrap: "wrap" }}>
          {(["all", "opportunity", "request", "event", "collab"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "7px 16px",
                borderRadius: 12,
                border: `1.5px solid ${filter === f ? T.accent : T.border}`,
                background: filter === f ? T.tagBgActive : "transparent",
                color: filter === f ? T.text : T.textMuted,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {f === "all" ? "All Posts" : TYPE_CONFIG[f].emoji + " " + TYPE_CONFIG[f].label}
            </button>
          ))}
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowForm((s) => !s)}
          icon={<span style={{ fontSize: 14 }}>+</span>}
        >
          Post
        </Button>
      </div>

      {showForm && <NewCalloutForm onClose={() => setShowForm(false)} />}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map((post, i) => (
          <CalloutCard key={post.id} post={post} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}
