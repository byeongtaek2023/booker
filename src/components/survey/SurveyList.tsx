import { useNavigate } from 'react-router-dom';
import * as St from './SurveyList.styled';
const SurveyList = () => {
  const navigate = useNavigate();

  return (
    <St.Container>
      <St.Title>LOGO가 00님이 좋아할만한 책을 추천해드릴게요!</St.Title>
      <St.BtnContainaer>
        <button
          onClick={() => {
            navigate('/BestSellerDomForSurvey');
          }}>
          🔥Best Seller🔥 요즘 핫한 국내도서 vs 외국도서 추천받기!!
        </button>
        <button
          onClick={() => {
            navigate('/BestSellerGenreSurvey');
          }}>
          🔥Best Seller🔥 요즘 핫한 원하는 장르의 책 추천받기!!
        </button>
        <button
          onClick={() => {
            navigate('/BestSellerNewSurvey');
          }}>
          🔥Best Seller🔥 신작, 어디까지 읽어봤니??
        </button>
        <button
          onClick={() => {
            navigate('/BestSellerValueSurvey');
          }}>
          🔥Best Seller🔥 본인이 추구하는 가치에 걸맞는 책 추천받기!!
        </button>
        <button
          onClick={() => {
            navigate('/BestSellerCheapSurvey');
          }}>
          🔥Best Seller🔥 텅장러들을 위한 추천 도서!!
        </button>
      </St.BtnContainaer>
    </St.Container>
  );
};

export default SurveyList;
