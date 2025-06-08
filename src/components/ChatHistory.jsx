// ✅ ChatHistory.jsx
'use client';
import { useEffect, useState } from 'react';
import MessageBubble from '@/components/MessageBubble';
import QuoteBubble from '@/components/QuoteBubble';
import { supabase } from '@/lib/supabaseClient';

export default function ChatHistory({ sessionId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!sessionId) return;

    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Błąd podczas pobierania historii:', error);
      } else {
        setHistory(data);
      }
    };

    fetchHistory();
  }, [sessionId]);

  return (
    <div className="space-y-2">
      {history.map((msg, index) => (
        msg.quote ? (
          <QuoteBubble key={index} text={msg.text} />
        ) : (
          <MessageBubble
            key={index}
            from={msg.sender === 'user' ? 'user' : 'ai'}
            text={msg.text}
            emotion={msg.emotion || 'neutral'}
          />
        )
      ))}
    </div>
  );
}

