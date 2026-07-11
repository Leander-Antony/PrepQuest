import React from 'react';
import { UserProvider } from './UserContext';
import { XPProvider } from './XPContext';
import { ThemeProvider } from './ThemeContext';
import { QuestProvider } from './QuestContext';
import { SkillProvider } from './SkillContext';
import { InventoryProvider } from './InventoryContext';
import { ProjectProvider } from './ProjectContext';
import { PlacementProvider } from './PlacementContext';
import { JournalProvider } from './JournalContext';
import { AchievementProvider } from './AchievementContext';
import { NotificationProvider } from './NotificationContext';
import { ActivityProvider } from './ActivityContext';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ActivityProvider>
        <UserProvider>
          <XPProvider>
            <QuestProvider>
              <SkillProvider>
                <InventoryProvider>
                  <ProjectProvider>
                    <PlacementProvider>
                      <JournalProvider>
                        <NotificationProvider>
                          <AchievementProvider>
                            {children}
                          </AchievementProvider>
                        </NotificationProvider>
                      </JournalProvider>
                    </PlacementProvider>
                  </ProjectProvider>
                </InventoryProvider>
              </SkillProvider>
            </QuestProvider>
          </XPProvider>
        </UserProvider>
      </ActivityProvider>
    </ThemeProvider>
  );
}
