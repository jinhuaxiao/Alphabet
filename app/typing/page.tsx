'use client';

import React, { useState, useEffect } from 'react';
import { Star, Trophy, Volume2 } from 'lucide-react';
import type { HandSvgProps, PracticeModeType } from '../types/keyboard';

// 优化后的 HandSvg 组件
const HandSvg: React.FC<HandSvgProps> = ({ finger, isLeft }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    className={`transform ${isLeft ? '' : 'scale-x-[-1]'}`}
  >
    {/* 手掌基础形状 */}
    <path
      d="M70 180 C45 165 35 140 35 110 C35 85 40 65 55 50 C70 35 90 30 110 35 
         C130 40 145 55 155 75 C165 95 165 115 155 140 C145 165 120 180 95 185"
      fill="url(#palmGradient)"
      stroke="#8B6F5E"
      strokeWidth="2"
      filter="url(#shadow)"
    />

    {/* 大拇指 */}
    <path
      d="M45 110 C35 100 35 85 45 75 C55 65 70 65 80 75 C90 85 90 95 80 105"
      fill="url(#fingerGradient)"
      stroke="#8B6F5E"
      strokeWidth="2"
      filter="url(#shadow)"
    />

    {/* 食指 */}
    <path
      d="M85 45 C85 35 95 25 105 25 C115 25 125 35 125 45 L125 65"
      fill={finger === 'Index' ? 'url(#activeFingerGradient)' : 'url(#fingerGradient)'}
      stroke="#8B6F5E"
      strokeWidth="2"
      filter="url(#shadow)"
    />

    {/* 中指 */}
    <path
      d="M105 35 C105 25 115 15 125 15 C135 15 145 25 145 35 L145 55"
      fill={finger === 'Middle' ? 'url(#activeFingerGradient)' : 'url(#fingerGradient)'}
      stroke="#8B6F5E"
      strokeWidth="2"
      filter="url(#shadow)"
    />

    {/* 无名指 */}
    <path
      d="M125 40 C125 30 135 20 145 20 C155 20 165 30 165 40 L165 60"
      fill={finger === 'Ring' ? 'url(#activeFingerGradient)' : 'url(#fingerGradient)'}
      stroke="#8B6F5E"
      strokeWidth="2"
      filter="url(#shadow)"
    />

    {/* 小指 */}
    <path
      d="M145 50 C145 40 155 30 165 30 C175 30 185 40 185 50 L185 70"
      fill={finger === 'Pinky' ? 'url(#activeFingerGradient)' : 'url(#fingerGradient)'}
      stroke="#8B6F5E"
      strokeWidth="2"
      filter="url(#shadow)"
    />

    {/* 定义渐变和滤镜 */}
    <defs>
      {/* 手掌渐变 */}
      <linearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE0B2" />
        <stop offset="100%" stopColor="#FFCC80" />
      </linearGradient>

      {/* 手指渐变 */}
      <linearGradient id="fingerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE0B2" />
        <stop offset="100%" stopColor="#FFCC80" />
      </linearGradient>

      {/* 激活状态手指渐变 */}
      <linearGradient id="activeFingerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#81C784" />
        <stop offset="100%" stopColor="#4CAF50" />
      </linearGradient>

      {/* 阴影效果 */}
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* 高光效果 */}
      <filter id="highlight">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="-4" dy="-4" result="offsetblur" />
        <feFlood floodColor="white" floodOpacity="0.5" />
        <feComposite in2="offsetblur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* 添加手指关节线条 */}
    {['Index', 'Middle', 'Ring', 'Pinky'].map((fingerType, index) => (
      <g key={fingerType}>
        <line
          x1={85 + index * 20}
          y1={45 + index * 5}
          x2={105 + index * 20}
          y2={45 + index * 5}
          stroke="#8B6F5E"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.5"
        />
      </g>
    ))}
  </svg>
);

// 修改 PracticeModeSelector 组件
const PracticeModeSelector: React.FC<{
  onSelectMode: (mode: PracticeModeType) => void;
  currentMode: PracticeModeType;
  onClose: () => void;
}> = ({ onSelectMode, currentMode, onClose }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(currentMode.keys);
  const [customName, setCustomName] = useState(currentMode.name);

  // 按手指分组的键位
  const fingerGroups = {
    leftPinky: { name: '左手小指', keys: ['1', 'Q', 'A', 'Z'] },
    leftRing: { name: '左手无名指', keys: ['2', 'W', 'S', 'X'] },
    leftMiddle: { name: '左手中指', keys: ['3', 'E', 'D', 'C'] },
    leftIndex: { name: '左手食指', keys: ['4', '5', 'R', 'T', 'F', 'G', 'V', 'B'] },
    rightIndex: { name: '右手食指', keys: ['6', '7', 'Y', 'U', 'H', 'J', 'N', 'M'] },
    rightMiddle: { name: '右手中指', keys: ['8', 'I', 'K', ','] },
    rightRing: { name: '右手无名指', keys: ['9', 'O', 'L', '.'] },
    rightPinky: { name: '右手小指', keys: ['0', '-', '=', 'P', '[', ']', ';', "'", '/'] }
  };

  // 预设练习组合
  const presetGroups = [
    { name: '主行键位', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'] },
    { name: '上行键位', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] },
    { name: '下行键位', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'] },
    { name: '数字键位', keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] }
  ];

  const toggleKey = (key: string) => {
    setSelectedKeys(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const selectGroup = (keys: string[]) => {
    setSelectedKeys(prev => {
      const allIncluded = keys.every(k => prev.includes(k));
      if (allIncluded) {
        return prev.filter(k => !keys.includes(k));
      }
      return [...new Set([...prev, ...keys])];
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 m-4 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">自定义练习键位</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="练习名称"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* 预设组合 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">常用组合:</h3>
          <div className="flex flex-wrap gap-2">
            {presetGroups.map(group => (
              <button
                key={group.name}
                onClick={() => selectGroup(group.keys)}
                className={`
                  px-4 py-2 rounded-lg font-medium
                  transition-all duration-200
                  ${group.keys.every(k => selectedKeys.includes(k))
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'}
                `}
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>

        {/* 按手指分组的键位选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(fingerGroups).map(([finger, { name, keys }]) => (
            <div key={finger} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{name}</h4>
                <button
                  onClick={() => selectGroup(keys)}
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  {keys.every(k => selectedKeys.includes(k)) ? '取消全选' : '全选'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keys.map(key => (
                  <button
                    key={key}
                    onClick={() => toggleKey(key)}
                    className={`
                      w-8 h-8 rounded-lg font-medium
                      transition-all duration-200
                      ${selectedKeys.includes(key)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'}
                    `}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 已选择的键位预览 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">已选择的键位:</h3>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg min-h-[3rem]">
            {selectedKeys.map(key => (
              <span key={key} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg">
                {key}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            取消
          </button>
          <button
            onClick={() => {
              if (selectedKeys.length > 0) {
                onSelectMode({
                  id: 'custom',
                  name: customName || '自定义练习',
                  keys: selectedKeys
                });
                onClose();
              }
            }}
            disabled={selectedKeys.length === 0}
            className={`
              px-4 py-2 rounded-lg
              ${selectedKeys.length > 0
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            开始练习
          </button>
        </div>
      </div>
    </div>
  );
};

const KeyboardTrainer = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentKey, setCurrentKey] = useState('');
  const [message, setMessage] = useState('准备开始!');
  const [pressedKey, setPressedKey] = useState('');
  const [showReward, setShowReward] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showCustomize, setShowCustomize] = useState(false);
  const [practiceMode, setPracticeMode] = useState<PracticeModeType>({
    id: 'level1',
    name: '基础练习',
    keys: ['F', 'J']
  });

  // 预定义练习模式
  const practiceModes: PracticeModeType[] = [
    { id: 'level1', name: '基础练习', keys: ['F', 'J'] },
    { id: 'level2', name: '进阶练习', keys: ['F', 'J', 'D', 'K'] },
    { id: 'level3', name: '全手练习', keys: ['F', 'J', 'D', 'K', 'S', 'L', 'A', ';'] },
    { id: 'homeRow', name: '主行练习', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'] },
    { id: 'custom', name: '自定义练习', keys: [] }
  ];

  // 定义键盘布局
  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
  ];

  // 定义手指负责的键位
  const fingerMap = {
    'leftPinky': ['1', 'Q', 'A', 'Z'],
    'leftRing': ['2', 'W', 'S', 'X'],
    'leftMiddle': ['3', 'E', 'D', 'C'],
    'leftIndex': ['4', '5', 'R', 'T', 'F', 'G', 'V', 'B'],
    'rightIndex': ['6', '7', 'Y', 'U', 'H', 'J', 'N', 'M'],
    'rightMiddle': ['8', 'I', 'K', ','],
    'rightRing': ['9', 'O', 'L', '.'],
    'rightPinky': ['0', '-', '=', 'P', '[', ']', ';', "'", '/']
  };

  // 手指颜色映射
  const fingerColors = {
    'leftPinky': 'from-pink-300 to-pink-400',
    'leftRing': 'from-purple-300 to-purple-400',
    'leftMiddle': 'from-blue-300 to-blue-400',
    'leftIndex': 'from-green-300 to-green-400',
    'rightIndex': 'from-green-300 to-green-400',
    'rightMiddle': 'from-blue-300 to-blue-400',
    'rightRing': 'from-purple-300 to-purple-400',
    'rightPinky': 'from-pink-300 to-pink-400'
  };

  // 获取键位对应的手指
  const getKeyFinger = (key) => {
    for (const [finger, keys] of Object.entries(fingerMap)) {
      if (keys.includes(key.toUpperCase())) {
        return finger;
      }
    }
    return null;
  };

  // 基础级别的键位
  const levelKeys = {
    1: ['F', 'J'],  // 食指基准键
    2: ['F', 'J', 'D', 'K'],  // 添加中指键位
    3: ['F', 'J', 'D', 'K', 'S', 'L'],  // 添加无名指键位
    4: ['F', 'J', 'D', 'K', 'S', 'L', 'A', ';']  // 添加小指键位
  };

  // 生成当前级别的随机键位
  const generateRandomKey = () => {
    const keys = practiceMode.keys;
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  // 开始新的回合
  const startNewRound = () => {
    const newKey = generateRandomKey();
    setCurrentKey(newKey);
    setMessage(`请按下 ${newKey} 键`);
  };

  // 渲染键盘按键
  const renderKey = (key: string) => {
    const isActive = currentKey === key;
    const isPressed = pressedKey === key;
    const finger = getKeyFinger(key);
    const fingerColor = fingerColors[finger];
    
    return (
      <div
        key={key}
        className={`
          relative rounded-lg flex items-center justify-center
          text-base sm:text-lg font-semibold select-none cursor-pointer
          transition-all duration-200 transform
          ${isPressed ? 'translate-y-1 shadow-inner' : 'hover:-translate-y-1'}
          bg-gradient-to-b ${fingerColor || 'from-gray-100 to-gray-200'}
          before:absolute before:inset-0 before:rounded-lg
          before:shadow-lg before:opacity-50
          ${isActive ? 'ring-2 sm:ring-4 ring-yellow-400 shadow-lg' : ''}
          border-b-2 sm:border-b-4 border-r-2 sm:border-r-4
          ${isPressed ? 'border-gray-400' : 'border-gray-300'}
          // 响应式尺寸
          h-8 w-8 m-0.5
          sm:h-12 sm:w-12 sm:m-1
          md:h-14 md:w-14 md:m-1
        `}
      >
        {key}
      </div>
    );
  };

  // 处理键盘按下
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    setPressedKey(key);
  };

  // 处理键盘释放
  const handleKeyUp = (event) => {
    setPressedKey('');
    const key = event.key.toUpperCase();
    
    if (key === currentKey) {
      setScore(score + 10);
      setConsecutiveCorrect(consecutiveCorrect + 1);
      setMessage('太棒了! 🌟');
      
      if (consecutiveCorrect >= 5 && level < 4) {
        setLevel(level + 1);
        setConsecutiveCorrect(0);
        setShowReward(true);
        setTimeout(() => setShowReward(false), 2000);
      }
      
      setTimeout(() => {
        startNewRound();
      }, 1000);
    } else if (levelKeys[level].includes(key)) {
      setMessage('再试一次! 💪');
      setConsecutiveCorrect(0);
    }
  };

  // 初始化和事件监听
  useEffect(() => {
    startNewRound();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [level, currentKey]);

  // 获取当前键位对应的手指类型
  const getCurrentFinger = () => {
    if (!currentKey) return null;
    const finger = getKeyFinger(currentKey);
    if (finger?.includes('Pinky')) return 'Pinky';
    if (finger?.includes('Ring')) return 'Ring';
    if (finger?.includes('Middle')) return 'Middle';
    if (finger?.includes('Index')) return 'Index';
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-2 sm:p-8">
      {/* 顶部信息栏 */}
      <div className="mb-4 sm:mb-8 flex items-center justify-between w-full max-w-4xl">
        <div className="flex items-center gap-4 text-xl sm:text-2xl">
          <div className="font-bold text-purple-600">
            {practiceMode.name}
          </div>
          <div className="font-bold text-yellow-500">
            分数: {score}
          </div>
        </div>
        <button
          onClick={() => setShowCustomize(true)}
          className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          自定义练习
        </button>
      </div>

      {/* 主游戏区域 */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl sm:rounded-3xl shadow-xl flex flex-col items-center justify-center p-3 sm:p-8">
        {/* 奖励动画 */}
        {showReward && (
          <div className="absolute inset-0 flex items-center justify-center bg-purple-500 bg-opacity-90 rounded-xl sm:rounded-3xl animate-pulse">
            <div className="text-center text-white">
              <Trophy size={32} className="mx-auto mb-2 sm:mb-4 sm:w-16 sm:h-16" />
              <h2 className="text-xl sm:text-2xl font-bold">升级啦！</h2>
              <p className="text-sm sm:text-base">解锁新的键位！</p>
            </div>
          </div>
        )}

        {/* 当前键位提示 */}
        <div className="mb-4 sm:mb-8">
          <div className="text-2xl sm:text-4xl font-bold text-purple-500 mb-1 sm:mb-2 text-center">
            {currentKey}
          </div>
          <div className="text-base sm:text-xl text-gray-600 text-center">
            {message}
          </div>
        </div>

        {/* 手指提示区域 - 在移动设备上隐藏 */}
        <div className="hidden sm:flex justify-center gap-8 mb-8">
          {/* 左手 */}
          <div className={`transition-opacity duration-300 ${
            currentKey && getKeyFinger(currentKey)?.includes('left') ? 'opacity-100' : 'opacity-30'
          }`}>
            <HandSvg 
              finger={getCurrentFinger()} 
              isLeft={true}
            />
          </div>
          {/* 右手 */}
          <div className={`transition-opacity duration-300 ${
            currentKey && getKeyFinger(currentKey)?.includes('right') ? 'opacity-100' : 'opacity-30'
          }`}>
            <HandSvg 
              finger={getCurrentFinger()} 
              isLeft={false}
            />
          </div>
        </div>

        {/* 虚拟键盘 */}
        <div className="w-full max-w-3xl bg-gray-50 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-inner">
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              {row.map(key => renderKey(key))}
            </div>
          ))}
        </div>

        {/* 进度指示器 */}
        <div className="flex gap-1 sm:gap-2 mt-4 sm:mt-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`sm:w-6 sm:h-6 ${
                i < consecutiveCorrect ? "text-yellow-400" : "text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* 当前练习键位提示 */}
        <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
          当前练习键位: {practiceMode.keys.join(' ')}
        </div>
      </div>

      {/* 声音控制 */}
      <button className="mt-2 sm:mt-4 p-2 rounded-full hover:bg-purple-100">
        <Volume2 size={20} className="sm:w-6 sm:h-6 text-purple-500" />
      </button>

      {/* 自定义练习模态框 */}
      {showCustomize && (
        <PracticeModeSelector
          currentMode={practiceMode}
          onSelectMode={(mode) => {
            setPracticeMode(mode);
            setScore(0);
            setConsecutiveCorrect(0);
            startNewRound();
          }}
          onClose={() => setShowCustomize(false)}
        />
      )}
    </div>
  );
};

export default KeyboardTrainer;