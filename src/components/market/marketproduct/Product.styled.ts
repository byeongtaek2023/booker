import styled from 'styled-components';
import Prev from '../../../styles/assets/buttonimages/prev2.png';
import { MessageProps } from '../../qna/ChatModal.styled';

// import Prev from '../../styles/assets/buttonimages/prev2.png';

export const Container = styled.div`
  position: relative;
  width: 90rem;
  margin: 0 auto;
  height: 100vh;
`;
export const PrevButton = styled.div`
  position: absolute;
  left: -10rem;
  top: -1rem;
  background: url(${Prev});
  background-size: contain;
  width: 6rem;
  height: 6rem;
  border-radius: 2rem;
  cursor: pointer;
`;

export const Title = styled.div`
  margin: 5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 0.2rem solid black;
  font-size: 4rem;
  font-weight: 600;
`;
export const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 40rem;
`;
export const Logo = styled.img`
  max-width: 25rem;
  max-height: 4.3766rem;
`;
export const SliderWrapper = styled.div`
  width: 30rem;
  height: 40rem;
  overflow: hidden;
  position: relative;
`;
export const SliderUl = styled.ul`
  display: flex;
`;

export const SliderLi = styled.li`
  & img {
    width: 30rem;
    height: 40rem;
    object-fit: cover;
  }
`;

export const SliderBtn = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: none;
  border-radius: 50%;
  position: absolute;
  width: 3rem;
  height: 3rem;
  top: 50%;
  font-size: 2rem;
  &.prev {
    left: 1rem;
  }
  &.next {
    right: 1rem;
  }
`;

export const ProductInfo = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductTitle = styled.div`
  height: 9rem;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.5;
`;

export const ProductCategory = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  & span {
    font-weight: 400;
  }
`;
export const ProductGrade = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  & span {
    font-weight: 400;
  }
`;

export const PriceBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 600;
  & span {
    font-size: 1.2rem;
  }
`;

export const ProductBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UpdateBtn = styled.button`
  height: 3rem;
  background-color: transparent;
  border: none;
  /* margin-left: 1.5rem; */
  & img {
    width: 2rem;
  }
`;

export const ProductLikes = styled.div`
  background-color: #d0ebff;
  border: none;
  width: 18.5rem;
  height: 5rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const ProductsLikesWrapper = styled(ProductLikes)`
  cursor: default;
`;
export const ProductSoldOut = styled.div`
  font-size: 1.5rem;
  margin: 0 auto;
`;

export const ProductLikesChatUser = styled.div``;

export const ProductUser = styled.div`
  /* width: 20rem; */
  height: 6rem;
  background-color: #d0ebff;
  padding: 0 2rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  cursor: pointer;
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  & div {
    width: 20rem;
  }
`;
export const FollowBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 7rem;
  color: #74c0fc;
`;

export const ProductContent = styled.div`
  border-top: 0.15rem solid black;
  margin: 5rem auto;
  padding: 5rem;
  font-size: 1.6rem;
  line-height: 2;
`;

// 모달 래퍼
export const ChatModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;

  bottom: 0;
  right: 0;
  width: 48rem;
  height: 60rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 2000;
  bottom: 66px;
  right: 10px;
`;

// 모달 헤더
export const ChatModalHeader = styled.div`
  padding: 10px;
  background-color: #000;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

export const ChatModalTitle = styled.p`
  font-size: 1.5rem;
  margin-left: 0.4rem;
  font-weight: bold;
  color: #fca311;
`;

export const ChatModalCloseButton = styled.button`
  all: unset;
  font-size: 2.6rem;
  margin-right: 0.4rem;
  color: #fff;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
    color: #fca311;
  }
`;

// 모달 바디
export const ChatModalBody = styled.div`
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: calc(100vh - 200px); //채팅창의 높이를 화면에 맞게 조정
`;

// 모달 푸터
export const ChatModalFooter = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-top: 0.1rem solid #ddd;
  display: flex;
  align-items: center;
  height: 7rem;
`;

// 입력 필드 및 전송 버튼
export const InputField = styled.input`
  all: unset;
  flex-grow: 1;
  margin-right: 10px;
  padding: 2px;
  height: 4rem;
  background-color: #fff;
  border-radius: 1rem;
  font-size: 1.5rem;
  border-bottom: 1px solid #000;

  ::placeholder {
    font-size: 1.5rem;
  }
`;

export const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #000;
  color: #fca311;
  border: none;
  height: 4.4rem;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;

  &:hover {
    background-color: #262626;
  }
`;

export const MessageComponent = styled.div<MessageProps>`
  display: flex;
  justify-content: ${(props) => (props.isOutgoing ? 'flex-end' : 'flex-start')};
  padding: 1rem 2rem;
  margin: 0.5rem;
  border-radius: 20px;
  font-size: 1.5rem;
  max-width: 40%; /* 메시지의 최대 너비를 설정합니다. */
  word-wrap: break-word;
  background-color: ${(props) => (props.isOutgoing ? '#14213D' : '#FCA311')}; /* 배경 색상을 변경합니다. */
  color: ${(props) => (props.isOutgoing ? '#fff' : '#fff')}; /* 텍스트 색상을 변경합니다. */
  align-self: ${(props) => (props.isOutgoing ? 'flex-end' : 'flex-start')};
  /* 추가: 메시지 버블 안에 텍스트가 중앙에 오도록 만듭니다. */
  align-items: center;
  font-weight: bold;
  text-align: ${(props) => (props.isOutgoing ? 'right' : 'left')};
`;

// export const MessageComponent = styled.div<MessageProps>`
//   display: flex;
//   justify-content: ${props => props.isOutgoing ? 'flex-end' : 'flex-start'};
//   padding: 10px;
//   margin: 5px;
//   border-radius: 10px;
//   max-width: 100%; /* You can adjust this as per your UI requirement */
//   word-wrap: break-word;
//   background-color: ${props => props.isOutgoing ? '#DCF8C6' : '#FFFFFF'};
//   color: ${props => props.isOutgoing ? '#000' : '#000'}; // Adjust text color as needed
// `;
