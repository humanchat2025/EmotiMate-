'use client';

import { useEffect, useRef, useState } from 'react';
import MessageBubble from '@/components/MessageBubble';
import TypingText from '@/components/TypingText';
import splitResponse from '@/utils/splitResponse';
import { Volume2, VolumeX } from 'lucide-react';
import QuoteBubble from './QuoteBubble';
import { v4 as uuidv4 } from 'uuid';

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const [sessionId, setSessionId] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [dominantEmotion, setDominantEmotion] = useState('neutral');
  const audioRef = useRef(null);

  useEffect(() => {
    const existingSession = sessionStorage.getItem('session_id');
    if (existingSession) {
      setSessionId(existingSession);
    } else {
      const newSession = uuidv4();
      sessionStorage.setItem('session_id', newSession);
      setSessionId(newSession);
    }
  }, []);

  const detectEmotion = (text) => {
    const emotions = [
      { keyword: /zabi[ćc]|samob[óo]j|nie chc[eę]|mam do[śs]ć/i, label: 'crisis' },
      { keyword: /boję się|strach|lęk|panik|przera[żz]/i, label: 'fear' },
      { keyword: /smut(e|n)k|płacz|samotno[śs][ćc]|źle|nieszcz[eę][śs][cć]ie|t[ęe]skni[ęe]/i, label: 'sad' },
      { keyword: /wściek|złość|nienawi|zdrad[ae]|frustrac/i, label: 'anger' },
      { keyword: /szcz[eę][śs]cie|rado[śs][ćc]|dzięku[ję]|kocham|uwielbiam/i, label: 'joy' },
    ];
    for (const e of emotions) {
      if (e.keyword.test(text)) return e.label;
    }
    return 'neutral';
  };

  const updateDominantEmotion = (allMessages) => {
    const count = {};
    for (let msg of allMessages.filter(m => m.from === 'user' || m.from === 'ai')) {
      if (!msg.emotion) continue;
      count[msg.emotion] = (count[msg.emotion] || 0) + 1;
    }
    let max = 0;
    let dom = 'neutral';
    for (let key in count) {
      if (count[key] > max) {
        max = count[key];
        dom = key;
      }
    }
    setDominantEmotion(dom);
  };

  const speakText = (text) => {
    if (!isVoiceOn || typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pl-PL';
    utter.pitch = 1;
    utter.rate = 0.98;
    synth.cancel();
    synth.speak(utter);
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    const emotionLevel = detectEmotion(userMessage);

    setUserInput('');
    setIsTyping(true);
    setMessages((prev) => {
      const updated = [...prev, { from: 'user', text: userMessage, emotion: emotionLevel }];
      updateDominantEmotion(updated);
      return updated;
    });
    setMessageCount((prev) => prev + 1);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, emotion: emotionLevel, session_id: sessionId })
      });

      const data = await res.json();
      const { reply: responseText, quote } = data;

      setTimeout(() => {
        setMessages((prev) => {
          const updated = [...prev, {
            from: 'ai',
            text: responseText,
            quote: quote || false,
            emotion: emotionLevel
          }];
          updateDominantEmotion(updated);
          return updated;
        });
        setIsTyping(false);
        if (isVoiceOn) speakText(responseText);
        setMessageCount((prev) => prev + 1);
      }, 600);

    } catch (err) {
      console.error("Błąd API:", err);
      setIsTyping(false);
    }
  };

  return (
    <div className={`max-w-xl mx-auto p-4 transition-colors duration-500 ${dominantEmotion === 'sad' ? 'bg-blue-50' : dominantEmotion === 'joy' ? 'bg-yellow-50' : dominantEmotion === 'anger' ? 'bg-red-50' : dominantEmotion === 'fear' ? 'bg-purple-50' : ''}`}>
      <audio ref={audioRef} src="/typing-soft.mp3" preload="auto" />

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">EmotiMate</h2>
        <button
          onClick={() => setIsVoiceOn((v) => !v)}
          className="text-gray-700 hover:text-blue-600 transition p-1"
          title={isVoiceOn ? 'Wyłącz głos Mili' : 'Włącz głos Mili'}
        >
          {isVoiceOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      </div>

      <div className="text-xs text-gray-500 mb-2">Wiadomości: {messageCount} • Emocja: {dominantEmotion}</div>

      <div className="space-y-2">
        {messages.map((msg, index) => (
          msg.quote
            ? <QuoteBubble key={index} text={msg.text} />
            : <MessageBubble key={index} from={msg.from} text={msg.text} emotion={msg.emotion} />
        ))}
        {isTyping && <TypingText />}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && userInput.trim() && !isTyping) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={isTyping ? 'Mila pisze...' : 'Napisz coś...'}
          className="flex-grow border border-gray-300 rounded p-2"
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !userInput.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
}
