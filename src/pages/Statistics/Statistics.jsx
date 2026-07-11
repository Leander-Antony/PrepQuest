import React from 'react';
import { useXP } from '../../context/XPContext';
import { useSkills } from '../../context/SkillContext';
import { useQuests } from '../../context/QuestContext';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ActivityHeatmap from '../../components/ActivityHeatmap/ActivityHeatmap';
import './Statistics.css';

export default function Statistics() {
  const { xp, level } = useXP();
  const { skills } = useSkills();
  const { quests } = useQuests();

  const completedQuests = quests.filter(q => q.completed).length;

  const skillData = skills.map(s => ({ name: s.name, level: s.level }));
  
  const questData = [
    { name: 'Completed', value: completedQuests },
    { name: 'Active', value: quests.length - completedQuests }
  ];

  const COLORS = ['var(--color-primary)', 'var(--color-danger)'];

  return (
    <motion.div 
      className="statistics-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="statistics-header pixel-panel">
        <h2>Player Statistics</h2>
      </div>

      <div className="stats-cards-grid">
        <div className="stat-card pixel-panel">
          <h4>Total XP</h4>
          <p className="stat-value text-xp">{xp}</p>
        </div>
        <div className="stat-card pixel-panel">
          <h4>Current Level</h4>
          <p className="stat-value text-accent">{level}</p>
        </div>
        <div className="stat-card pixel-panel">
          <h4>Skills Learned</h4>
          <p className="stat-value text-primary">{skills.length}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container pixel-panel">
          <h3>Skill Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData}>
              <XAxis dataKey="name" stroke="var(--color-text-main)" />
              <YAxis stroke="var(--color-text-main)" />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.1)'}} contentStyle={{ backgroundColor: 'var(--color-bg-primary)', border: '2px solid var(--color-border)' }} />
              <Bar dataKey="level" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container pixel-panel">
          <h3>Quest Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={questData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {questData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-primary)', border: '2px solid var(--color-border)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span style={{ color: COLORS[0] }}>■ Completed</span>
            <span style={{ color: COLORS[1] }}>■ Active</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <ActivityHeatmap />
      </div>
    </motion.div>
  );
}
