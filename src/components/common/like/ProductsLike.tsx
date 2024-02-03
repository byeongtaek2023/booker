import { useCallback, useEffect, useState } from 'react';
import { Productlike, getLikeCountP, supabase } from '../../../api/Supabase.api';
import coloredheart from '../../../assets/common/heavy_black_heart.webp';
import heartbold from '../../../assets/common/icon-_heart_white.webp';
import { useAuth } from '../../../contexts/auth.context';
import * as St from './Like.styled';
import { LikeProps } from './Like.type';

const ProductsLike = ({ postId, count }: LikeProps) => {
  const [likes, setLikes] = useState<any[]>([]);
  const auth = useAuth();
  const currentUserId = auth.session?.profile.id;
  const getLikeCounts = useCallback(async () => {
    try {
      const likesData = await getLikeCountP(postId);
      setLikes(likesData || []);
    } catch (error) {
      console.log(error, 'error');
    }
  }, [postId]);

  const toggleLike = async () => {
    if (!auth.session) return;
    const existingLike = likes.find((like) => like.user_id === currentUserId);
    try {
      if (existingLike) {
        // 기존 좋아요 제거
        await supabase.from('product_likes').delete().match({ id: existingLike.id });
        setLikes(likes.filter((like) => like.id !== existingLike.id));
      } else {
        // 새로운 좋아요 추가
        const userLike = await Productlike(postId, currentUserId);
        if (userLike) {
          setLikes([...likes, ...userLike]);
        }
      }
    } catch (error) {
      console.error(error);
    }
    getLikeCounts();
  };
  useEffect(() => {
    getLikeCounts();
  }, []);

  return (
    <St.Container>
      <St.HeartButton
        className={count ? '' : 'marketlist'}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike();
        }}>
        {likes.some((like) => like.user_id === currentUserId) ? <img src={coloredheart} /> : <img src={heartbold} />}
      </St.HeartButton>
      {count ? <St.CountLike>{likes.length}</St.CountLike> : null}
    </St.Container>
  );
};

export default ProductsLike;
