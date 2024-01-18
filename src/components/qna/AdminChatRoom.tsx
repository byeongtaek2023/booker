import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../api/supabase.api';
import Logo from '../../assets/Logo.png';
import Prev from '../../assets/prev.png';
import { useAuth } from '../../contexts/auth.context';
import * as St from './Adminchatroom.styled';

interface Message {
  created_at: string;
  content: string;
  sender_id: string;
  message_type: string;
  id: number;
}

const AdminChatRoom = () => {
  /* 
    룸 id가 같은 메세지만 출력이 되어야 함
    
    */
  const [answerMessage, setAnswerMessage] = useState('');
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const params = useParams();
  const roomId = params.roomId;
  //   console.log(params);
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    messageTable();
  }, [messages]);

  const onChangeMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!auth.session) return;
    if (!answerMessage.trim()) return; // 메시지가 비어있지 않은지 확인

    await supabase.from('qna').insert({
      room_id: roomId,
      sender_id: auth.session.user.id,
      content: answerMessage,
      message_type: 'answer',
    });
    setAnswerMessage(''); // 메시지 전송 후 입력 필드 초기화
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const messageTable = async () => {
    const response = await supabase.from('qna').select('*').eq('room_id', roomId);
    const result = response.data;
    if (result) {
      setMessages(result);
    } else {
      setMessages([]);
    }
  };
  const prevHandler = () => {
    navigate('/chat');
  };

  return (
    <>
      {isSwitch ? (
        <St.Container isSwitch={isSwitch}>
          {isSwitch ? (
            <St.Header>
              <St.PrevBtn onClick={prevHandler}>
                <img src={Prev} alt="prev" width={30} height={30} />
              </St.PrevBtn>
              <St.ChatHeader>
                <img src={Logo} alt="Logo" />
              </St.ChatHeader>
            </St.Header>
          ) : (
            <St.ChatHeader>
              <img src={Logo} alt="Logo" />
            </St.ChatHeader>
          )}
          <St.ChatBody>
            <St.MainMessage>
              안녕하세요 🙌 <br />
              새로운 지식으로 시작되는 어쩌구저쩌구, 북커입니다📚
              <br />​ 무엇을 도와드릴까요?
            </St.MainMessage>
            {messages.map((message) => {
              return (
                <>
                  {message.message_type === 'answer' ? (
                    <St.AdminMessage>{message.content}</St.AdminMessage>
                  ) : (
                    <St.UserMessage>{message.content}</St.UserMessage>
                  )}
                </>
              );
            })}
          </St.ChatBody>
          <St.ChatInputWrapper>
            <St.Input
              placeholder="메시지를 입력해주세요"
              value={answerMessage}
              onChange={onChangeMessageHandler}
              onKeyDown={onKeyDownHandler}
            />
          </St.ChatInputWrapper>
        </St.Container>
      ) : null}
      <St.TalkButtonWrapper>
        <St.TalkButton onClick={() => setIsSwitch(!isSwitch)}>{isSwitch ? 'close' : 'open'}</St.TalkButton>
      </St.TalkButtonWrapper>
    </>
  );
};

export default AdminChatRoom;
