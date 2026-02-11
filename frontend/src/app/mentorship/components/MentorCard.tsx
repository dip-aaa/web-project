"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "./theme";
import { Button } from "./ui";
import { MentorProfile } from "./data";
import { Avatar, RoleBadge, StarRating, SkillTag } from "./ui";

export default function MentorCard({ mentor }: { mentor: MentorProfile }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 12px 40px ${T.shadow}` }}
        style={{
          background: T.cardBg,
          borderRadius: 20,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          height: 340,
          width: "100%",
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ 
          padding: "20px 20px 16px 20px", 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box"
        }}>
          {/* Avatar & Name Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 16 }}>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Avatar name={mentor.name} size={64} online={mentor.online} />
              {mentor.verified && (
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 20, height: 20, borderRadius: "50%",
                  background: "linear-gradient(135deg, #5a9e6f, #3d7a52)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid white", fontSize: 11, color: "white", fontWeight: 800
                }}>✓</div>
              )}
            </div>
            <h3 style={{
              margin: "0 0 8px", fontSize: 18, fontWeight: 700,
              color: T.textDark, fontFamily: "'Inter', sans-serif"
            }}>
              {mentor.name}
            </h3>
            <div style={{ marginBottom: 8 }}>
              <RoleBadge role={mentor.role} />
            </div>
          </div>

          {/* Skills Section */}
          {mentor.skills.length > 0 && (
            <div style={{ marginBottom: 12, textAlign: "center" }}>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", overflow: "hidden" }}>
                {mentor.skills.slice(0, 2).map((skill) => (
                  <span key={skill} style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 10,
                    background: "rgba(139, 111, 71, 0.1)",
                    color: "#6b4423",
                    border: "1px solid rgba(139, 111, 71, 0.2)",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "nowrap"
                  }}>
                    {skill}
                  </span>
                ))}
                {mentor.skills.length > 2 && (
                  <span style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 10,
                    background: "rgba(139, 111, 71, 0.08)",
                    color: "#8b6f47",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    +{mentor.skills.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Essential Stats */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: 12,
            padding: "12px 16px",
            background: T.creamDark,
            borderRadius: 12
          }}>
            {mentor.rating > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#f7931e", fontSize: 16 }}>⭐</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: T.textDark, fontFamily: "'Inter', sans-serif" }}>
                  {mentor.rating}
                </span>
              </div>
            )}
            {mentor.fee > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#f7931e", fontSize: 16 }}>☕</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#f7931e", fontFamily: "'Inter', sans-serif" }}>
                  {mentor.fee}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: "flex", 
            gap: 8, 
            marginTop: "auto",
            paddingTop: 8
          }}>
            <Button 
              variant="primary" 
              size="md" 
              fullWidth
              onClick={() => {
                // Connect logic here
                console.log(`Connecting to ${mentor.name}`);
              }}
            >
              Connect
            </Button>
            <Button 
              variant="secondary" 
              size="md" 
              onClick={() => setModalOpen(true)}
            >
              View
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <MentorModal mentor={mentor} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Simplified Profile Modal ── */
function MentorModal({ mentor, onClose }: { mentor: MentorProfile; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"about" | "sessions" | "reviews">("about");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(62, 39, 35, 0.5)",
        backdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        style={{
          background: T.cardBg,
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          maxHeight: "88vh",
          overflow: "auto",
          boxShadow: `0 32px 80px rgba(62, 39, 35, 0.3)`,
        }}
      >
        {/* Hero Banner */}
        <div
          style={{
            height: 100,
            background: "linear-gradient(135deg, #f9f6f3 0%, #f5f0eb 50%, #ede5db 100%)", // Cream gradient
            position: "relative",
            borderRadius: "24px 24px 0 0",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(62, 39, 35, 0.1)",
              border: "none",
              color: T.textDark,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              backdropFilter: "blur(4px)",
            }}
          >
            ×
          </button>
        </div>

        {/* Profile Info */}
        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ marginTop: -32, marginBottom: 20, display: "flex", alignItems: "flex-end", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Avatar name={mentor.name} size={72} online={mentor.online} />
              {mentor.verified && (
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 22, height: 22, borderRadius: "50%",
                  background: "linear-gradient(135deg, #5a9e6f, #3d7a52)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid white", fontSize: 11, color: "white", fontWeight: 800
                }}>✓</div>
              )}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <RoleBadge role={mentor.role} />
            </div>
          </div>

          <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, fontFamily: "'Inter', sans-serif", color: T.textDark }}>{mentor.name}</h2>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>{mentor.year} · {mentor.branch}</p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 20, padding: "16px 0", borderTop: `1px solid ${T.borderLight}`, borderBottom: `1px solid ${T.borderLight}`, marginBottom: 20 }}>
            {mentor.rating > 0 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.textDark, fontFamily: "'Inter', sans-serif" }}>{mentor.rating}</div>
                <div style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>Rating</div>
              </div>
            )}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.textDark, fontFamily: "'Inter', sans-serif" }}>{mentor.sessions}</div>
              <div style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>Sessions</div>
            </div>
            {mentor.fee > 0 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#f7931e", fontFamily: "'Inter', sans-serif" }}>☕ {mentor.fee}</div>
                <div style={{ fontSize: 11, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>Coins/session</div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.creamDark, borderRadius: 12, padding: 4 }}>
            {(["about", "sessions", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 10,
                  border: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: activeTab === tab ? "white" : "transparent",
                  color: activeTab === tab ? T.text : T.textMuted,
                  boxShadow: activeTab === tab ? `0 2px 8px ${T.shadow}` : "none",
                  transition: "all 0.2s",
                  textTransform: "capitalize",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "about" && (
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.7, color: T.textSoft, fontFamily: "'Inter', sans-serif" }}>{mentor.bio}</p>

              <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.8px" }}>Skills</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {mentor.skills.map((s) => <SkillTag key={s} label={s} />)}
              </div>
            </div>
          )}

          {activeTab === "sessions" && (
            <div>
              {mentor.sessions > 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 48, fontWeight: 800, fontFamily: "'Inter', sans-serif", color: T.textDark }}>{mentor.sessions}</div>
                  <div style={{ fontSize: 14, color: T.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>sessions completed</div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "32px 0", color: T.textMuted, fontFamily: "'Inter', sans-serif", fontSize: 14 }}>No sessions yet. Be the first!</div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {mentor.rating > 0 ? (
                <div>
                  <div style={{ textAlign: "center", padding: "16px 0 24px" }}>
                    <div style={{ fontSize: 52, fontWeight: 800, fontFamily: "'Inter', sans-serif", color: T.textDark }}>{mentor.rating}</div>
                    <StarRating rating={mentor.rating} />
                    <div style={{ fontSize: 13, color: T.textMuted, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>Based on {mentor.sessions} reviews</div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "32px 0", color: T.textMuted, fontFamily: "'Inter', sans-serif", fontSize: 14 }}>No reviews yet</div>
              )}
            </div>
          )}

          {/* Connect CTA */}
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <Button variant="primary" size="md" fullWidth>
              {mentor.role === "mentee" ? "Offer to Help" : `Request Session — ☕ ${mentor.fee} coins`}
            </Button>
            <Button variant="secondary" size="md" onClick={onClose}>Close</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}