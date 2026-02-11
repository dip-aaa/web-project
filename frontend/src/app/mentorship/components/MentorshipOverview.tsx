'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { T } from "./theme";
import { Avatar, RoleBadge, StarRating, SkillTag, Button, Card, SectionHeading, CoffeeDivider } from "./ui";
import { MentorCard } from "./MentorCard";
import { MOCK_MENTORS, MOCK_CALLOUTS, MY_PROFILE } from "./data";

/* ── Featured Mentor Strip ── */
function FeaturedMentors() {
  const featured = MOCK_MENTORS.filter((m) => m.verified && m.role !== "mentee").slice(0, 3);
  return (
    <Card>
      <SectionHeading
        title="⭐ Featured Mentors"
        sub="Top rated this week"
        action={<Button variant="ghost" size="sm">See all</Button>}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {featured.map((mentor, i) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              background: "linear-gradient(135deg, #fdf8f4, #f5ede4)",
              borderRadius: 16,
              border: `1.5px solid ${T.borderLight}`,
              cursor: "pointer",
            }}
          >
            <Avatar name={mentor.name} size={44} online={mentor.online} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: T.textDark, fontFamily: "'Playfair Display', serif" }}>{mentor.name}</div>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>{mentor.year} · {mentor.branch}</div>
              <div style={{ marginTop: 4, display: "flex", gap: 5 }}>
                {mentor.skills.slice(0, 2).map((s) => <SkillTag key={s} label={s} small />)}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
              <StarRating rating={mentor.rating} />
              <span style={{ fontSize: 11, color: "#f7931e", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                ☕ {mentor.fee} coins
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

/* ── Recent Callouts Preview ── */
function RecentCallouts() {
  const recent = MOCK_CALLOUTS.slice(0, 3);
  const typeColors: Record<string, string> = {
    opportunity: "#3d7a52",
    request: "#5a6fb0",
    event: "#c97b1a",
    collab: "#a0684a",
  };
  const typeEmoji: Record<string, string> = {
    opportunity: "🎯", request: "🔍", event: "📅", collab: "🤝"
  };

  return (
    <Card>
      <SectionHeading
        title="📢 Latest Callouts"
        sub="Posts from your college"
        action={<Button variant="ghost" size="sm">View all</Button>}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {recent.map((post, i) => {
          const author = MOCK_MENTORS.find((m) => m.id === post.authorId);
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                padding: "14px 16px",
                background: "#fff",
                borderRadius: 14,
                border: `1.5px solid ${T.borderLight}`,
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                {author && <Avatar name={author.name} size={32} />}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.textDark, fontFamily: "'Inter', sans-serif" }}>
                      {author?.name}
                    </span>
                    <span style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 8,
                      color: typeColors[post.type],
                      background: `${typeColors[post.type]}18`,
                      fontWeight: 700, fontFamily: "'Inter', sans-serif",
                    }}>
                      {typeEmoji[post.type]} {post.type}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.3 }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                    ❤️ {post.likes} · 💬 {post.responses} · {post.timestamp}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}

/* ── My Upcoming Sessions ── */
function UpcomingSessions() {
  const sessions = [
    { mentor: "Arjun Sharma", topic: "System Design Basics", date: "Today, 3 PM", type: "mentee" as const },
    { mentor: "Rahul Mehta", topic: "ML Research Guidance", date: "Feb 18, 4 PM", type: "mentee" as const },
    { mentor: "Sneha R.", topic: "React Help", date: "Feb 16, 2 PM", type: "mentor" as const },
  ];

  return (
    <Card>
      <SectionHeading title="📅 Upcoming Sessions" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sessions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              background: s.type === "mentor" ? "rgba(90, 158, 111, 0.07)" : "linear-gradient(135deg, #fdf8f4, #f5ede4)",
              borderRadius: 14,
              border: `1.5px solid ${s.type === "mentor" ? "rgba(90, 158, 111, 0.2)" : T.borderLight}`,
            }}
          >
            <Avatar name={s.mentor} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, fontFamily: "'Inter', sans-serif" }}>
                {s.topic}
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>
                with {s.mentor} · {s.date}
              </div>
            </div>
            <span style={{
              fontSize: 10, padding: "3px 9px", borderRadius: 8,
              background: s.type === "mentor" ? "rgba(90, 158, 111, 0.15)" : "rgba(139, 111, 71, 0.12)",
              color: s.type === "mentor" ? "#3d7a52" : T.accent,
              fontWeight: 700, fontFamily: "'Inter', sans-serif",
            }}>
              {s.type === "mentor" ? "🧑‍🏫 Mentoring" : "📚 Learning"}
            </span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

/* ── Main Export ── */
export function MentorshipOverview({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Main 2-col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <FeaturedMentors />
          <UpcomingSessions />
        </div>
        <div>
          <RecentCallouts />
        </div>
      </div>

      {/* Coffee Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          padding: "18px 22px",
          borderRadius: 18,
          background: "linear-gradient(135deg, rgba(212, 165, 116, 0.15), rgba(139, 111, 71, 0.1))",
          border: `1.5px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 28 }}>☕</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Inter', sans-serif" }}>
            Coffee Coins Tip
          </div>
          <div style={{ fontSize: 12, color: T.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
            Complete your profile to earn 50 free coins. Mentor 5 sessions to unlock the "Rising Star" badge. Coins can be used to book sessions with senior mentors!
          </div>
        </div>
      </motion.div>
    </div>
  );
}
