import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import { playBubblePop } from '../../utils/audio';

/**
 * Interactive Frutiger Aero Skills Station
 * Organizes Elyuzar's technical capabilities into domain decks
 * with interactive proof-of-work highlights and capability spotlights.
 */
export default function AeroSkillsStation() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const activeCategory = skillCategories[selectedCategory];

  const handleCategoryChange = (idx) => {
    setSelectedCategory(idx);
    setSelectedSkill(null);
    playBubblePop(440 + idx * 60);
  };

  const handleSkillClick = (skill) => {
    if (selectedSkill?.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
      playBubblePop(560);
    }
  };

  return (
    <div className="aero-panel" style={{ padding: 'var(--space-lg)' }}>
      {/* Category selector pills */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-xs)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-lg)',
          borderBottom: 'var(--rule-hair) solid var(--color-rule)',
          paddingBottom: 'var(--space-md)',
        }}
      >
        {skillCategories.map((cat, idx) => {
          const isActive = selectedCategory === idx;
          return (
            <button
              key={cat.id || cat.name}
              type="button"
              onClick={() => handleCategoryChange(idx)}
              className={`aero-btn${isActive ? ' aero-btn-primary' : ''}`}
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-xs) var(--space-md)',
                transform: isActive ? 'translateY(-1px)' : 'none',
              }}
            >
              <span>{cat.name}</span>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  opacity: 0.8,
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'rgba(255,255,255,0.3)' : 'var(--color-rule)',
                }}
              >
                {cat.items?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-md)',
        }}
      >
        {activeCategory.items?.map((skill) => {
          const isSelected = selectedSkill?.name === skill.name;
          return (
            <motion.div
              key={skill.name}
              whileHover={{ translateY: -2 }}
              onClick={() => handleSkillClick(skill)}
              style={{
                cursor: 'pointer',
                padding: 'var(--space-md)',
                borderRadius: 'calc(var(--radius-card) - 4px)',
                background: isSelected
                  ? 'linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 25%, var(--color-paper)) 0%, var(--color-paper) 100%)'
                  : 'var(--glass-surface-deep)',
                border: isSelected ? '1.5px solid var(--color-accent)' : 'var(--rule-hair) solid var(--color-rule)',
                boxShadow: isSelected
                  ? '0 6px 20px color-mix(in oklab, var(--color-accent) 30%, transparent)'
                  : '0 2px 8px color-mix(in oklab, var(--color-ink) 4%, transparent)',
                transition: 'border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-title)', color: 'var(--color-ink)' }}>
                  {skill.name}
                </span>
                <span
                  className="aero-pill"
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    fontWeight: 600,
                    background: isSelected ? 'var(--color-accent)' : 'var(--color-paper-3)',
                    color: isSelected ? 'var(--color-accent-ink)' : 'var(--color-ink-2)',
                  }}
                >
                  {skill.level}
                </span>
              </div>

              <p style={{ margin: '0 0 var(--space-xs)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', lineHeight: 1.45 }}>
                {skill.role}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
                <span>{skill.version || activeCategory.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-accent-ink)' }}>
                  {isSelected ? 'Click to close' : 'Click to inspect'}
                </span>
              </div>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      overflow: 'hidden',
                      marginTop: 'var(--space-sm)',
                      paddingTop: 'var(--space-sm)',
                      borderTop: 'var(--rule-hair) solid var(--color-rule)',
                    }}
                  >
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '4px' }}>
                      Production Application:
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-2)', lineHeight: 1.5 }}>
                      Grounded in Elyuzar’s core deliverables across distributed microservices, academic research projects, and PLN power systems automation.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
