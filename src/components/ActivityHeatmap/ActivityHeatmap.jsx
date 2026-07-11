import React, { useMemo } from 'react';
import { useActivity } from '../../context/ActivityContext';
import './ActivityHeatmap.css';

export default function ActivityHeatmap() {
  const { activityLog } = useActivity();

  // Generate the last 365 days
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();
    
    // Generate exactly 364 days ago to today
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = activityLog[dateStr] || 0;
      arr.push({ date: dateStr, count });
    }
    return arr;
  }, [activityLog]);

  const getLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  };

  return (
    <div className="heatmap-container pixel-panel">
      <h3>Activity Heatmap</h3>
      
      <div className="heatmap-months">
        {/* Simple mock months, in a real scenario we'd calculate exact pixel spacing */}
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
      </div>

      <div className="heatmap-grid">
        {days.map((day, index) => (
          <div 
            key={index}
            className={`heatmap-cell level-${getLevel(day.count)}`}
            title={`${day.date}: ${day.count} actions`}
          ></div>
        ))}
      </div>

      <div className="heatmap-legend">
        Less
        <div className="heatmap-cell"></div>
        <div className="heatmap-cell level-1"></div>
        <div className="heatmap-cell level-2"></div>
        <div className="heatmap-cell level-3"></div>
        <div className="heatmap-cell level-4"></div>
        More
      </div>
    </div>
  );
}
