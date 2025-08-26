import React from 'react';
import { useState } from 'react';
import Navigation from './components/Navigation';
import ProfilePage from './components/ProfilePage';
import SeasonalAnalysis from './components/SeasonalAnalysis';
import ICTAnalysis from './components/ICTAnalysis';
import type { User } from './types';

const mockUser: User = {
  id: '1',
  name: 'Alex Thompson',
  email: 'alex.thompson@email.com',
  joinDate: '2023-06-15',
  tradingExperience: 'Advanced',
  preferredTimeframe: '4H / Daily',
  riskTolerance: 'Moderate',
  totalTrades: 247,
  winRate: 68,
  totalPnL: 12450.75,
  currentStreak: 7,
  longestStreak: 15,
  level: 12,
  xp: 2840,
  xpToNextLevel: 1160,
  achievements: [
    {
      id: '1',
      title: 'First Profitable Month',
      description: 'Achieved your first profitable trading month',
      icon: 'trophy',
      unlockedAt: '2023-07-01',
      rarity: 'Common'
    },
    {
      id: '2',
      title: 'Risk Manager',
      description: 'Maintained risk below 2% for 50 consecutive trades',
      icon: 'shield',
      unlockedAt: '2023-08-15',
      rarity: 'Rare'
    },
    {
      id: '3',
      title: 'ICT Master',
      description: 'Successfully identified and traded 25 order blocks',
      icon: 'target',
      unlockedAt: '2023-09-22',
      rarity: 'Epic'
    },
    {
      id: '4',
      title: 'Seasonal Trader',
      description: 'Profited from seasonal tendencies in 3 different months',
      icon: 'calendar',
      unlockedAt: '2023-10-10',
      rarity: 'Rare'
    },
    {
      id: '5',
      title: 'Consistency King',
      description: 'Achieved 10+ winning trades in a row',
      icon: 'crown',
      unlockedAt: '2023-11-05',
      rarity: 'Legendary'
    }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User>(mockUser);

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfilePage user={user} onUpdateUser={handleUpdateUser} />;
      case 'seasonal':
        return <SeasonalAnalysis />;
      case 'analysis':
        return <ICTAnalysis />;
      case 'achievements':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.achievements.map((achievement) => (
                <div key={achievement.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      achievement.rarity === 'Common' ? 'bg-gray-100 text-gray-800' :
                      achievement.rarity === 'Rare' ? 'bg-blue-100 text-blue-800' :
                      achievement.rarity === 'Epic' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                  <p className="text-xs text-gray-500">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-2xl font-bold text-gray-900">{user.totalTrades}</div>
                <div className="text-sm text-gray-600">Total Trades</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-2xl font-bold text-green-600">{user.winRate}%</div>
                <div className="text-sm text-gray-600">Win Rate</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className={`text-2xl font-bold ${user.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${user.totalPnL.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total P&L</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-2xl font-bold text-blue-600">{user.currentStreak}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome back, {user.name}!</h2>
              <p className="text-gray-600 mb-4">
                Ready to analyze the markets with advanced ICT concepts? Check out the seasonal tendencies 
                and market structure analysis to enhance your trading decisions.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('analysis')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View ICT Analysis
                </button>
                <button
                  onClick={() => setActiveTab('seasonal')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Check Seasonal Trends
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;