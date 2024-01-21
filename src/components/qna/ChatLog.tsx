import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../api/supabase.api';
import { useAuth } from '../../contexts/auth.context';
import * as St from './ChatLog.styled';

interface Message {
  created_at: string;
  content: string;
  sender_id: string;
  message_type: string;
  id: number;
}

const ChatLog = () => {
  const auth = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!auth.session) return;

    getQnaLog(auth.session.user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [auth.session, messages]);

  //qna table 가져오는 함수
  const getQnaLog = async (roomId: string) => {
    if (!auth.session) return;
    const response = await supabase.from('qna').select('*').eq('room_id', roomId);
    const result = response.data;
    if (result) {
      setMessages(result);
    } else {
      setMessages([]);
    }
  };

  return (
    <St.Container>
      {messages.map((message) => (
        <div key={message.id}>
          {message.message_type === 'question' ? (
            <St.CustomerMessageBox>
              <St.CustomerChatLogWrapper>
                <St.MessageContent>{message.content}</St.MessageContent>
              </St.CustomerChatLogWrapper>
            </St.CustomerMessageBox>
          ) : (
            <St.AdminChatLogWrapper>
              <St.AdminName>관리자</St.AdminName>
              <St.MessageContent>{message.content}</St.MessageContent>
            </St.AdminChatLogWrapper>
          )}
        </div>
      ))}
      <div ref={messageEndRef}></div>
    </St.Container>
  );
};

export default ChatLog;
