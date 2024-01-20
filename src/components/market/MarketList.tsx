import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryProductListHandler, getProductListHandler, getUserSessionHandler } from '../../api/supabase.api';
import * as St from './MarketList.styled';
import Pagination from './Pagination';
import { categoryArr } from './marketpost/Post';

export type ListTypes = {
  id: string;
  category: string;
  title: string;
  content: string;
  created_at: string;
  product_img: string[];
  price: string;
  user_id: string;
  product_grade: string;
};

const MarketList = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [list, setList] = useState<ListTypes[]>([]);
  const navigate = useNavigate();
  const params = useParams().id;
  const category = categoryArr[Number(params)];

  //페이지네이션 state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const getUserSession = async () => {
    const result = await getUserSessionHandler();
    console.log(result);
    setSession(result.session);
  };

  const getProductList = async () => {
    if (params) {
      const result = await getCategoryProductListHandler(category);
      setList(result.sort((a, b) => b.id - a.id));
    } else {
      const result = await getProductListHandler();
      setList(result.sort((a, b) => b.id - a.id));
    }
  };

  useEffect(() => {
    getUserSession();
    getProductList();
  }, [params]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = list?.slice(indexOfFirst, indexOfLast);

  return (
    <St.Container>
      <St.Title>{category ? category : '중고거래'}</St.Title>
      <St.CategoryProductsWrapper>
        <St.CategoryWrapper>
          <St.CategoryBox>
            {categoryArr.map((item, i) => (
              <St.CategoryBtn key={i} onClick={() => navigate(`/market/${i}`)}>
                {item}
              </St.CategoryBtn>
            ))}
          </St.CategoryBox>
        </St.CategoryWrapper>
        <St.ProductsWrapper>
          {currentPosts.map((item, i) => {
            return (
              <St.ProductCard
                key={i}
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}>
                {item.product_img.length === 0 ? (
                  <St.LogoImg>
                    <img src={`${process.env.PUBLIC_URL}/images/common/logo.png`} alt="logo" />
                  </St.LogoImg>
                ) : (
                  <St.ProductImg src={item.product_img[0]} />
                )}

                <St.ProductTitle>{item.title}</St.ProductTitle>
                <St.ProductInfo>
                  <St.ProductPrice>{item.price} 원</St.ProductPrice>
                  <St.ProductLikes>♥️ 10</St.ProductLikes>
                </St.ProductInfo>
              </St.ProductCard>
            );
          })}
        </St.ProductsWrapper>
      </St.CategoryProductsWrapper>
      <St.PostButton
        onClick={() => {
          {
            session
              ? navigate('/marketpost')
              : window.confirm('로그인 페이지로 이동하시겠습니까?') && navigate(`/login`);
          }
        }}>
        글쓰기
      </St.PostButton>
      <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} />s
    </St.Container>
  );
};

export default MarketList;
