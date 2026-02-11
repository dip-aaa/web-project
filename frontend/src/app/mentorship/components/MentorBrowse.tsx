'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { T, SKILLS_LIST, BRANCHES, YEARS } from "./theme";
import { SkillTag, Button } from "./ui";
import MentorCard from "./MentorCard";
import { MOCK_MENTORS, type MentorProfile } from "./data";

export function MentorBrowse() {
  const [query, setQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"all" | "mentor" | "mentee">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_MENTORS.filter((m) => {
      const matchQuery =
        !query ||
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
        m.branch.toLowerCase().includes(query.toLowerCase());

      const matchSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((sk) => m.skills.includes(sk));

      const matchYear = !selectedYear || m.year === selectedYear;

      const matchRole =
        roleFilter === "all" ||
        m.role === roleFilter ||
        m.role === "both";

      return matchQuery && matchSkills && matchYear && matchRole;
    });
  }, [query, selectedSkills, selectedYear, roleFilter]);

  const toggleSkill = (s: string) =>
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <div>
      {/* Search Bar */}
      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 20,
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <div style={{ flex: 1, position: "relative", minWidth: 200 }}>
          <div style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, skill, or branch…"
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              borderRadius: 16,
              border: `2px solid ${T.border}`,
              background: "white",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: T.textDark,
              outline: "none",
              boxSizing: "border-box",
              boxShadow: `0 2px 12px ${T.shadow}`,
            }}
          />
        </div>
        <Button
          variant={showFilters ? "primary" : "secondary"}
          size="sm"
          onClick={() => setShowFilters((s) => !s)}
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
          }
        >
          Filters {selectedSkills.length + (selectedYear ? 1 : 0) > 0 ? `(${selectedSkills.length + (selectedYear ? 1 : 0)})` : ""}
        </Button>
      </div>

      {/* Role filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["all", "mentor", "mentee"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            style={{
              padding: "7px 18px",
              borderRadius: 12,
              border: `1.5px solid ${roleFilter === r ? T.accent : T.border}`,
              background: roleFilter === r ? T.tagBgActive : "transparent",
              color: roleFilter === r ? T.text : T.textMuted,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {r === "all" ? "All Students" : r === "mentor" ? "🧑‍🏫 Mentors" : "📚 Mentees"}
          </button>
        ))}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            background: "white",
            borderRadius: 18,
            border: `1.5px solid ${T.border}`,
            padding: 20,
            marginBottom: 20,
            boxShadow: `0 4px 20px ${T.shadow}`,
          }}
        >
          {/* Year Filter */}
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: T.text, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Year
            </h4>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(selectedYear === y ? "" : y)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 10,
                    border: `1.5px solid ${selectedYear === y ? T.accent : T.border}`,
                    background: selectedYear === y ? T.tagBgActive : "transparent",
                    color: selectedYear === y ? T.text : T.textMuted,
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Filter */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h4 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: T.text, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                Skills
              </h4>
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setSelectedSkills([])}
                  style={{ fontSize: 11, color: T.textMuted, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                >
                  Clear all
                </button>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {SKILLS_LIST.slice(0, 16).map((s) => (
                <SkillTag
                  key={s}
                  label={s}
                  active={selectedSkills.includes(s)}
                  onClick={() => toggleSkill(s)}
                  small
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Results count */}
      <div style={{ marginBottom: 16, fontSize: 13, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>
        Showing <strong style={{ color: T.text }}>{filtered.length}</strong> student{filtered.length !== 1 ? "s" : ""} from your college
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          justifyItems: "center"
        }}>
          {filtered.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: T.textMuted,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>☕</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 8 }}>No matches found</div>
          <div style={{ fontSize: 14 }}>Try adjusting your filters or search term</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setSelectedSkills([]);
              setSelectedYear("");
              setRoleFilter("all");
            }}
            style={{ marginTop: 16 } as any}
          >
            Clear filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}
