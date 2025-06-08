'use client';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function useChatSession() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let stored = sessionStorage.getItem('chat_session_id');
    if (!stored) {
      stored = uuid();
      sessionStorage.setItem('chat_session_id', stored);
    }
    setSessionId(stored);
  }, []);

  const startNewSession = () => {
    const newId = uuid();
    sessionStorage.setItem('chat_session_id', newId);
    setSessionId(newId);
  };

  return { sessionId, startNewSession };
}
