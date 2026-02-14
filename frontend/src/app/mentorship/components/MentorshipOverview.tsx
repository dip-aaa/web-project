'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { T } from "./theme";
import { Avatar, RoleBadge, StarRating, SkillTag, Button, Card, SectionHeading, CoffeeDivider } from "./ui";
import { MentorCard } from "./MentorCard";
import { MOCK_CALLOUTS, MOCK_MENTORS, MY_PROFILE, type MentorProfile } from "./data";
import { mentorshipAPI } from "../../../lib/api";

/* ── Featured Mentor Strip ── */
function FeaturedMentors() {
  const [featured, setFeatured] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await mentorshipAPI.getMentors();
        
        if (response.success && response.data) {
          // Transform and take first 3 mentors
          // Backend now only returns actual mentors
          const transformedMentors: MentorProfile[] = response.data
            .slice(0, 3)
            .map((user: any) => ({
              id: user.id.toString(),
              name: user.name,
              year: "Mentor",
              branch: user.department || "Not specified",
              role: "mentor",
              skills: user.expertiseArea ? [user.expertiseArea] : ["General Guidance"],
              lookingFor: [],
              bio: `Mentor from ${user.department || 'the college'}`,
              rating: 4.5,
              sessions: 0,
              followers: 0,
              online: false,
              badges: [],
              linkedinStyle: `${user.department || 'Student'} · ${user.email}`,
              achievements: [],
              openFor: ["1-on-1 mentoring"],
              fee: 0,
              verified: true
            }));
          setFeatured(transformedMentors);
        }
      } catch (error) {
        console.error('Error fetching featured mentors:', error);
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <Card>
      <SectionHeading
        title="⭐ Featured Mentors"
        sub="Available mentors from your college"
        action={<Button variant="ghost" size="sm">See all</Button>}
      />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px', color: T.textMuted }}>
          Loading mentors...
        </div>
      ) : featured.length > 0 ? (
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
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: T.textMuted }}>
          No mentors available yet
        </div>
      )}
    </Card>
  );
}

/* ── Become a Mentor Card ── */
function BecomeMentorCard() {
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expertiseArea, setExpertiseArea] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await mentorshipAPI.checkMentorStatus();
        if (response.success) {
          setIsMentor(response.data.isMentor);
          if (response.data.expertiseArea) {
            setExpertiseArea(response.data.expertiseArea);
          }
        }
      } catch (error) {
        console.error('Error checking mentor status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  const handleBecomeMentor = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      const response = await mentorshipAPI.becomeMentor(expertiseArea.trim() || undefined);
      
      if (response.success) {
        setIsMentor(true);
        setShowForm(false);
        alert('🎉 Congratulations! You are now a mentor. Your profile will appear in the "Find Mentors" section.');
      } else {
        alert('Failed to register as mentor: ' + response.message);
      }
    } catch (error) {
      console.error('Error becoming mentor:', error);
      alert('Failed to register as mentor. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '20px', color: T.textMuted }}>
          Loading...
        </div>
      </Card>
    );
  }

  if (isMentor) {
    return (
      <Card>
        <div style={{
          padding: "20px",
          background: "linear-gradient(135deg, rgba(90, 158, 111, 0.1), rgba(61, 122, 82, 0.08))",
          borderRadius: 14,
          border: "1.5px solid rgba(90, 158, 111, 0.2)",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#3d7a52",
            marginBottom: 8,
            fontFamily: "'Playfair Display', serif"
          }}>
            You're a Mentor!
          </div>
          <div style={{
            fontSize: 13,
            color: T.textMuted,
            fontFamily: "'Inter', sans-serif",
            marginBottom: 12
          }}>
            Your profile is visible to students looking for guidance.
            {expertiseArea && (
              <div style={{ marginTop: 8, fontSize: 12 }}>
                <strong>Expertise:</strong> {expertiseArea}
              </div>
            )}
          </div>
          <div style={{
            fontSize: 11,
            color: "#5a9e6f",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif"
          }}>
            ✓ Connection requests will appear in your Alerts section
          </div>
        </div>
      </Card>
    );
  }

  if (showForm) {
    return (
      <Card>
        <SectionHeading
          title="🎓 Become a Mentor"
          sub="Share your knowledge with juniors"
        />
        <div style={{ padding: "16px 0" }}>
          <label style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            color: T.textDark,
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif"
          }}>
            Your Area of Expertise (Optional)
          </label>
          <input
            type="text"
            value={expertiseArea}
            onChange={(e) => setExpertiseArea(e.target.value)}
            placeholder="e.g., Web Development, Machine Learning, Career Guidance..."
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: `2px solid ${T.border}`,
              background: "white",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: T.textDark,
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          <div style={{
            marginTop: 16,
            padding: "14px",
            background: "rgba(139, 111, 71, 0.06)",
            borderRadius: 10,
            fontSize: 12,
            color: T.textMuted,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.5
          }}>
            <strong>As a mentor, you will:</strong>
            <ul style={{ margin: "8px 0 0 20px", padding: 0 }}>
              <li>Appear in the "Find Mentors" section</li>
              <li>Receive connection requests from students</li>
              <li>Help guide juniors in their academic journey</li>
            </ul>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Button
              variant="primary"
              size="md"
              onClick={handleBecomeMentor}
              disabled={submitting}
            >
              {submitting ? "Registering..." : "Register as Mentor"}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowForm(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div style={{
        padding: "24px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎓</div>
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          color: T.textDark,
          marginBottom: 10,
          fontFamily: "'Playfair Display', serif"
        }}>
          Become a Mentor
        </div>
        <div style={{
          fontSize: 14,
          color: T.textMuted,
          fontFamily: "'Inter', sans-serif",
          marginBottom: 20,
          lineHeight: 1.6
        }}>
          Share your knowledge and experience with juniors. Help them navigate their academic journey and build meaningful connections.
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowForm(true)}
        >
          Get Started
        </Button>
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
        </div>
        <div>
          <BecomeMentorCard />
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
