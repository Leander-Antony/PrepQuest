import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useXP } from './XPContext';
import { useNotification } from './NotificationContext';
import { useQuests } from './QuestContext';
import { useProjects } from './ProjectContext';
import { useUser } from './UserContext';
import { useSkills } from './SkillContext';
import { useInventory } from './InventoryContext';
import { usePlacements } from './PlacementContext';
import { useEffect } from 'react';

const AchievementContext = createContext();

export function useAchievements() {
  return useContext(AchievementContext);
}

export function AchievementProvider({ children }) {
  const [achievements, setAchievements] = useLocalStorage('craftquest_achievements', [
    { id: 1, title: 'First Quest', description: 'Complete your first quest.', unlocked: false, xpReward: 50 },
    { id: 2, title: 'Level 5', description: 'Reach Level 5.', unlocked: false, xpReward: 200 },
    { id: 3, title: 'First Project', description: 'Add your first project.', unlocked: false, xpReward: 100 },
    { id: 4, title: '7 Day Streak', description: 'Log in for 7 consecutive days.', unlocked: false, xpReward: 500 },
    { id: 5, title: '1000 XP', description: 'Earn a total of 1000 XP.', unlocked: false, xpReward: 300 },
    { id: 6, title: 'Java Warrior', description: 'Level up Java skill to level 5.', unlocked: false, xpReward: 400 },
    { id: 7, title: 'First Interview', description: 'Summon and attack your first company boss.', unlocked: false, xpReward: 150 },
    { id: 8, title: 'Offer Letter', description: 'Defeat a company boss to get an offer.', unlocked: false, xpReward: 1000 },
    { id: 9, title: 'React Ranger', description: 'Level up React skill to level 5.', unlocked: false, xpReward: 400 },
    { id: 10, title: 'Python Paladin', description: 'Level up Python skill to level 5.', unlocked: false, xpReward: 400 },
    { id: 11, title: 'C++ Conqueror', description: 'Level up C++ skill to level 5.', unlocked: false, xpReward: 400 },
    { id: 12, title: 'Database Druid', description: 'Level up SQL/NoSQL to level 5.', unlocked: false, xpReward: 400 },
    { id: 13, title: 'Node Ninja', description: 'Level up Node.js to level 5.', unlocked: false, xpReward: 400 },
    { id: 14, title: 'Cloud Cleric', description: 'Level up AWS/GCP to level 5.', unlocked: false, xpReward: 400 },
    { id: 15, title: 'Level 10', description: 'Reach Level 10.', unlocked: false, xpReward: 500 },
    { id: 16, title: 'Level 20', description: 'Reach Level 20.', unlocked: false, xpReward: 1000 },
    { id: 17, title: 'Level 30', description: 'Reach Level 30.', unlocked: false, xpReward: 2000 },
    { id: 18, title: 'Level 50', description: 'Reach Level 50.', unlocked: false, xpReward: 5000 },
    { id: 19, title: 'Level 100', description: 'Reach Level 100.', unlocked: false, xpReward: 10000 },
    { id: 20, title: 'Master Crafter', description: 'Craft 10 items in your inventory.', unlocked: false, xpReward: 300 },
    { id: 21, title: 'Legendary Item', description: 'Craft a Legendary rarity item.', unlocked: false, xpReward: 800 },
    { id: 22, title: 'Project Manager', description: 'Complete 3 projects to 100%.', unlocked: false, xpReward: 600 },
    { id: 23, title: 'Senior Developer', description: 'Complete 10 projects to 100%.', unlocked: false, xpReward: 2000 },
    { id: 24, title: 'Boss Slayer', description: 'Defeat 5 company bosses.', unlocked: false, xpReward: 2500 },
    { id: 25, title: 'Bug Hunter', description: 'Complete 50 daily quests.', unlocked: false, xpReward: 1000 },
    { id: 26, title: 'Consistency is Key', description: 'Complete 100 daily quests.', unlocked: false, xpReward: 3000 },
    { id: 27, title: '14 Day Streak', description: 'Log in for 14 consecutive days.', unlocked: false, xpReward: 1000 },
    { id: 28, title: '30 Day Streak', description: 'Log in for 30 consecutive days.', unlocked: false, xpReward: 2500 },
    { id: 29, title: 'Fullstack Fanatic', description: 'Learn both Frontend and Backend skills.', unlocked: false, xpReward: 500 },
    { id: 30, title: 'DSA Master', description: 'Solve 100 Leetcode problems (custom quest tracking).', unlocked: false, xpReward: 1500 },
    { id: 31, title: 'Open Source Contributor', description: 'Merge a PR in an open source project.', unlocked: false, xpReward: 1000 },
    { id: 32, title: 'Hackathon Hero', description: 'Participate in a Hackathon.', unlocked: false, xpReward: 800 },
    { id: 33, title: 'Networking Ninja', description: 'Connect with 10 professionals on LinkedIn.', unlocked: false, xpReward: 400 },
    { id: 34, title: 'Resume Refined', description: 'Update and polish your resume.', unlocked: false, xpReward: 200 },
    { id: 35, title: 'Mock Interviewer', description: 'Complete 5 mock interviews.', unlocked: false, xpReward: 1200 },
    { id: 36, title: 'System Design Scholar', description: 'Complete a System Design course/quest.', unlocked: false, xpReward: 800 },
    { id: 37, title: 'The Architect', description: 'Design a full microservices architecture for a project.', unlocked: false, xpReward: 1500 },
    { id: 38, title: 'PrepQuest Pioneer', description: 'Unlock all other achievements.', unlocked: false, xpReward: 10000 }
  ]);
  const { addXP, level, xp } = useXP();
  const { addNotification } = useNotification();
  const { quests } = useQuests();
  const { projects } = useProjects();
  const { user } = useUser();
  const { skills } = useSkills();
  const { items } = useInventory();
  const { bosses } = usePlacements();

  const unlockAchievement = (id) => {
    // This is for manual Dev Unlocks
    const a = achievements.find(ach => ach.id === id);
    if (a && !a.unlocked) {
      addXP(a.xpReward);
      addNotification(`🏆 Achievement Unlocked: ${a.title}! (+${a.xpReward} XP)`);
      setAchievements(prev => prev.map(ach => 
        ach.id === id ? { ...ach, unlocked: true } : ach
      ));
    }
  };

  useEffect(() => {
    // Auto-evaluator for achievements
    const completedQuests = quests.filter(q => q.completed).length;
    const completedProjects = projects.filter(p => p.progress >= 100).length;
    
    achievements.forEach(a => {
      if (a.unlocked) return; // Skip already unlocked

      let shouldUnlock = false;

      switch(a.id) {
        case 1: shouldUnlock = completedQuests >= 1; break;
        case 2: shouldUnlock = level >= 5; break;
        case 3: shouldUnlock = projects.length >= 1; break;
        case 4: shouldUnlock = user.streak >= 7; break;
        case 5: shouldUnlock = level >= 10; break; // Approximating 1000XP as level 10
        case 6: shouldUnlock = skills.some(s => s.name.toLowerCase().includes('java') && s.level >= 5); break;
        case 7: shouldUnlock = bosses.length >= 1 && bosses.some(b => b.hp < 100); break; // Attacked first boss
        case 8: shouldUnlock = bosses.some(b => b.hp <= 0); break;
        case 9: shouldUnlock = skills.some(s => s.name.toLowerCase().includes('react') && s.level >= 5); break;
        case 10: shouldUnlock = skills.some(s => s.name.toLowerCase().includes('python') && s.level >= 5); break;
        case 15: shouldUnlock = level >= 10; break;
        case 16: shouldUnlock = level >= 20; break;
        case 17: shouldUnlock = level >= 30; break;
        case 20: shouldUnlock = items.length >= 10; break;
        case 21: shouldUnlock = items.some(i => i.rarity === 'legendary'); break;
        case 22: shouldUnlock = completedProjects >= 3; break;
        case 23: shouldUnlock = completedProjects >= 10; break;
        case 24: shouldUnlock = bosses.filter(b => b.hp <= 0).length >= 5; break;
        case 25: shouldUnlock = quests.filter(q => q.completed && q.category === 'daily').length >= 50; break;
        case 27: shouldUnlock = user.streak >= 14; break;
        case 28: shouldUnlock = user.streak >= 30; break;
        default: break; // Manual unlocks or very specific manual tracks
      }

      if (shouldUnlock) {
        // Run side-effects immediately
        addXP(a.xpReward);
        addNotification(`🏆 Achievement Unlocked: ${a.title}! (+${a.xpReward} XP)`);
        // Update state functionally to prevent overwrites
        setAchievements(prev => prev.map(ach => 
          ach.id === a.id ? { ...ach, unlocked: true } : ach
        ));
      }
    });
  }, [quests, projects, level, xp, user, skills, items, bosses]);

  const value = {
    achievements,
    unlockAchievement
  };

  return <AchievementContext.Provider value={value}>{children}</AchievementContext.Provider>;
}
