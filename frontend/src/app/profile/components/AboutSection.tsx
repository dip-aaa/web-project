'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  isEditMode: boolean;
}

const skills = [
  'React', 'Node.js', 'TypeScript', 'Next.js', 'Python', 
  'AWS', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Docker'
];

const interests = ['Web Development', 'AI/ML', 'Cloud Computing', 'UI/UX Design'];

export default function AboutSection({ isEditMode }: AboutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 30,
        boxShadow: '0 4px 20px rgba(107, 68, 35, 0.08)',
        border: '2px solid #f0e6dc'
      }}
    >
      {/* About */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>📝</span> About
        </h3>
        <p style={{ 
          fontSize: 15, 
          color: '#6b4423', 
          lineHeight: 1.7 
        }}>
          Hi! I'm Aarav, a full-stack developer with over 8 years of experience building 
          web applications. I'm passionate about clean code, user experience, and helping 
          others learn to code. When I'm not coding, you'll find me exploring new coffee shops 
          or teaching at local coding bootcamps.
        </p>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>💡</span> Skills & Expertise
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                color: '#6b4423',
                fontSize: 14,
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(107, 68, 35, 0.15)'
              }}
            >
              {skill}
            </motion.span>
          ))}
          
          {isEditMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                background: '#f9f6f3',
                border: '2px dashed #d4a574',
                color: '#8b6f47',
                fontSize: 14,
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              + Add Skill
            </motion.button>
          )}
        </div>
      </div>

      {/* Interests */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>❤️</span> Interests
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {interests.map((interest) => (
            <span
              key={interest}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                background: '#fff',
                border: '2px solid #d4a574',
                color: '#6b4423',
                fontSize: 14,
                fontWeight: '600'
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#6b4423',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>🎓</span> Education
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {[
            {
              degree: 'M.S. Computer Science',
              school: 'Stanford University',
              year: '2018 - 2020'
            },
            {
              degree: 'B.S. Software Engineering',
              school: 'UC Berkeley',
              year: '2014 - 2018'
            }
          ].map((edu, index) => (
            <div 
              key={index}
              style={{
                padding: 15,
                borderRadius: 12,
                background: '#f9f6f3',
                border: '1.5px solid #f0e6dc'
              }}
            >
              <div style={{ 
                fontWeight: 'bold', 
                color: '#6b4423',
                marginBottom: 4,
                fontSize: 15
              }}>
                {edu.degree}
              </div>
              <div style={{ 
                color: '#8b6f47',
                fontSize: 14
              }}>
                {edu.school} • {edu.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
