import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import type { SeasonalTendency } from '../types';

const seasonalData: SeasonalTendency[] = [
  {
    month: 'January',
    tendency: 'bullish',
    strength: 75,
    historicalData: [
      { year: 2023, performance: 3.2 },
      { year: 2022, performance: 2.8 },
      { year: 2021, performance: 4.1 },
      { year: 2020, performance: 1.9 },
      { year: 2019, performance: 3.7 },
    ],
    description: 'January typically shows strong bullish momentum due to "January Effect" - institutional money flows and new year optimism.'
  },
  {
    month: 'February',
    tendency: 'neutral',
    strength: 45,
    historicalData: [
      { year: 2023, performance: -0.5 },
      { year: 2022, performance: 1.2 },
      { year: 2021, performance: -1.1 },
      { year: 2020, performance: 0.8 },
      { year: 2019, performance: 0.3 },
    ],
    description: 'February shows mixed results with no clear directional bias. Market consolidation is common.'
  },
  {
    month: 'March',
    tendency: 'bullish',
    strength: 68,
    historicalData: [
      { year: 2023, performance: 2.9 },
      { year: 2022, performance: 3.4 },
      { year: 2021, performance: 2.1 },
      { year: 2020, performance: -12.4 },
      { year: 2019, performance: 1.8 },
    ],
    description: 'March often sees renewed buying interest as Q1 earnings approach and winter sentiment lifts.'
  },
  {
    month: 'April',
    tendency: 'bullish',
    strength: 82,
    historicalData: [
      { year: 2023, performance: 4.1 },
      { year: 2022, performance: 3.8 },
      { year: 2021, performance: 5.2 },
      { year: 2020, performance: 12.8 },
      { year: 2019, performance: 3.9 },
    ],
    description: 'April is historically one of the strongest months. "Sell in May" preparation drives buying.'
  },
  {
    month: 'May',
    tendency: 'bearish',
    strength: 62,
    historicalData: [
      { year: 2023, performance: -1.8 },
      { year: 2022, performance: -5.4 },
      { year: 2021, performance: 0.7 },
      { year: 2020, performance: 4.5 },
      { year: 2019, performance: -6.6 },
    ],
    description: '"Sell in May and go away" - Traditional period of weakness as summer approaches.'
  },
  {
    month: 'June',
    tendency: 'neutral',
    strength: 38,
    historicalData: [
      { year: 2023, performance: 0.2 },
      { year: 2022, performance: -8.4 },
      { year: 2021, performance: 2.3 },
      { year: 2020, performance: 1.8 },
      { year: 2019, performance: 7.0 },
    ],
    description: 'June shows mixed performance with high volatility around FOMC meetings and quarter-end.'
  },
  {
    month: 'July',
    tendency: 'bullish',
    strength: 71,
    historicalData: [
      { year: 2023, performance: 3.1 },
      { year: 2022, performance: 9.1 },
      { year: 2021, performance: 2.4 },
      { year: 2020, performance: 5.5 },
      { year: 2019, performance: 1.3 },
    ],
    description: 'July often sees a summer rally as earnings season begins and vacation trading lightens volume.'
  },
  {
    month: 'August',
    tendency: 'bearish',
    strength: 55,
    historicalData: [
      { year: 2023, performance: -1.6 },
      { year: 2022, performance: -4.2 },
      { year: 2021, performance: 2.9 },
      { year: 2020, performance: 7.0 },
      { year: 2019, performance: -1.8 },
    ],
    description: 'August can be volatile with low volume. Vacation season creates unpredictable moves.'
  },
  {
    month: 'September',
    tendency: 'bearish',
    strength: 78,
    historicalData: [
      { year: 2023, performance: -4.9 },
      { year: 2022, performance: -9.3 },
      { year: 2021, performance: -4.8 },
      { year: 2020, performance: -3.9 },
      { year: 2019, performance: 1.9 },
    ],
    description: 'September is historically the worst month for stocks. Back-to-work selling and tax considerations.'
  },
  {
    month: 'October',
    tendency: 'bearish',
    strength: 65,
    historicalData: [
      { year: 2023, performance: -2.2 },
      { year: 2022, performance: 8.1 },
      { year: 2021, performance: 7.0 },
      { year: 2020, performance: -2.8 },
      { year: 2019, performance: 2.0 },
    ],
    description: 'October can be volatile with major crashes historically occurring. However, often marks bottoms.'
  },
  {
    month: 'November',
    tendency: 'bullish',
    strength: 73,
    historicalData: [
      { year: 2023, performance: 9.1 },
      { year: 2022, performance: 5.4 },
      { year: 2021, performance: -0.8 },
      { year: 2020, performance: 10.8 },
      { year: 2019, performance: 3.6 },
    ],
    description: 'November typically strong due to holiday optimism and year-end positioning.'
  },
  {
    month: 'December',
    tendency: 'bullish',
    strength: 69,
    historicalData: [
      { year: 2023, performance: 4.5 },
      { year: 2022, performance: -5.8 },
      { year: 2021, performance: 4.5 },
      { year: 2020, performance: 3.7 },
      { year: 2019, performance: 3.0 },
    ],
    description: 'December often sees "Santa Claus Rally" and tax-loss selling creating opportunities.'
  },
];

export default function SeasonalAnalysis() {
  const [selectedMonth, setSelectedMonth] = useState<SeasonalTendency | null>(null);

  const getTendencyIcon = (tendency: string) => {
    switch (tendency) {
      case 'bullish': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'bearish': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTendencyColor = (tendency: string, strength: number) => {
    const opacity = Math.max(0.3, strength / 100);
    switch (tendency) {
      case 'bullish': return `rgba(34, 197, 94, ${opacity})`;
      case 'bearish': return `rgba(239, 68, 68, ${opacity})`;
      default: return `rgba(107, 114, 128, ${opacity})`;
    }
  };

  const getStrengthText = (strength: number) => {
    if (strength >= 75) return 'Very Strong';
    if (strength >= 60) return 'Strong';
    if (strength >= 40) return 'Moderate';
    return 'Weak';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Seasonal Market Tendencies</h1>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">About Seasonal Analysis</h3>
              <p className="text-sm text-blue-800">
                Seasonal tendencies are based on historical price patterns that tend to repeat during specific months. 
                These patterns are influenced by institutional flows, tax considerations, earnings cycles, and market psychology. 
                Use this data as one factor in your trading decisions, not as a standalone strategy.
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {seasonalData.map((month) => (
            <div
              key={month.month}
              onClick={() => setSelectedMonth(month)}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: getTendencyColor(month.tendency, month.strength) }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{month.month}</h3>
                {getTendencyIcon(month.tendency)}
              </div>
              <div className="text-sm text-gray-700 mb-1">
                {month.tendency.charAt(0).toUpperCase() + month.tendency.slice(1)}
              </div>
              <div className="text-xs text-gray-600">
                {getStrengthText(month.strength)} ({month.strength}%)
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View */}
        {selectedMonth && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedMonth.month} Analysis</h2>
              <button
                onClick={() => setSelectedMonth(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  {getTendencyIcon(selectedMonth.tendency)}
                  <span className="ml-2 text-lg font-medium text-gray-900">
                    {selectedMonth.tendency.charAt(0).toUpperCase() + selectedMonth.tendency.slice(1)} Tendency
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    ({getStrengthText(selectedMonth.strength)})
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{selectedMonth.description}</p>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Strength Indicator</h4>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        selectedMonth.tendency === 'bullish' ? 'bg-green-500' :
                        selectedMonth.tendency === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${selectedMonth.strength}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Weak</span>
                    <span>Strong</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Historical Performance</h4>
                <div className="bg-white rounded-lg p-4">
                  <div className="space-y-2">
                    {selectedMonth.historicalData.map((data) => (
                      <div key={data.year} className="flex items-center justify-between">
                        <span className="text-gray-700">{data.year}</span>
                        <span className={`font-medium ${
                          data.performance >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {data.performance >= 0 ? '+' : ''}{data.performance.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Average</span>
                      <span className={`font-bold ${
                        selectedMonth.historicalData.reduce((sum, d) => sum + d.performance, 0) / selectedMonth.historicalData.length >= 0
                          ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {((selectedMonth.historicalData.reduce((sum, d) => sum + d.performance, 0) / selectedMonth.historicalData.length) >= 0 ? '+' : '')}
                        {(selectedMonth.historicalData.reduce((sum, d) => sum + d.performance, 0) / selectedMonth.historicalData.length).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}