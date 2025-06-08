'use client';

import { motion } from 'framer-motion';

export default function MessageBubble({ text, from = 'ai', emotion = 'neutral' }) {
  const isUser = from === 'user';

  const bgColors = {
    user: 'bg-blue-200 text-gray-900 border border-blue-400',
    ai: {
      neutral: 'bg-gray-800 text-white',
      sad: 'bg-blue-200 text-gray-900',
      fear: 'bg-yellow-200 text-gray-900',
      crisis: 'bg-red-200 text-gray-900',
    },
  };

  const bubbleClass = isUser
    ? bgColors.user
    : bgColors.ai[emotion] || bgColors.ai.neutral;

  const avatarSrc = isUser ? '/user.png' : '/mila.png';
  const bubbleAlign = isUser ? 'justify-end' : 'justify-start';
  const flexDirection = isUser ? 'flex-row-reverse' : 'flex-row';
  const textAlign = isUser ? 'text-right' : 'text-left';

  return (
    <div className={`flex ${bubbleAlign} my-2`}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`flex ${flexDirection} items-end max-w-[85%]`}
      >
        <img
          src={avatarSrc}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover mx-2 shadow-md"
        />
        <div
          className={`px-4 py-2 rounded-xl text-sm shadow-sm ${bubbleClass} ${textAlign}`}
        >
          {text}
        </div>
      </motion.div>
    </div>
  );
}