import styled from 'styled-components';

export const Container = styled.section`
  width: 390px;
  height: 590px;
  box-sizing: border-box;
  position: fixed;
  bottom: 100px;
  right: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 2rem;
  padding: 8px;
  background-color: white;
  overflow: scroll;
`;

export const ChatHeader = styled.div`
  display: flex;
  margin: 16px 16px 12px;
  overflow: hidden;
`;
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const PrevBtn = styled.div`
  cursor: pointer;
`;

export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  margin: 0px 16px;
  height: 65%;
  overflow: scroll;
`;
export const MainMessage = styled.p`
  padding: 10px;
`;
export const TalkButtonWrapper = styled.div`
  position: fixed;
  bottom: 60px;
  right: 10px;
`;

export const TalkButton = styled.button`
  width: 90%;
  border: none;
  padding: 1rem;
`;
export const ChatInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 6px 0px 14px;
  z-index: 9999;
`;

export const Input = styled.input`
  width: 95%;
  position: relative;
  min-height: 50px;
  padding: 0px 6px 0px 14px;
  border-radius: 1rem;
  border: none;
  background: linear-gradient(92.34deg, rgba(239, 239, 240, 0.8) 48.04%, rgba(247, 247, 248, 0.8) 100%);
  &:focus {
    outline: none;
  }
`;

export const AdminMessage = styled.div`
  text-align: right;
`;

export const UserMessage = styled.div`
  text-align: left;
`;
