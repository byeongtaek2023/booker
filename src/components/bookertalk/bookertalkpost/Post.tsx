// import '@toast-ui/editor/dist/i18n/ko-kr';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import 'tui-color-picker/dist/tui-color-picker.css';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSessionHandler, submitPostListHandler } from '../../../api/supabase.api';

type Categories = {
  자유수다: string[];
  도서추천: string[];
};

type CateGenresTypes = {
  [key: string]: string;
};

export const categoryUuid: CateGenresTypes = {
  '도서추천 / 인문': 'a249535a-b19a-4fb4-bcd9-0788e780a2ac',
  '도서추천 / 경제 경영': 'f979619a-91c3-4584-9880-1c5b137735dd',
  '도서추천 / 자기계발': '3c5d132b-1ca6-430d-a467-4315a2d86618',
  '도서추천 / 정치 사회': 'b2ba785c-a0e7-45f3-b4f5-db225628d60c',
  '도서추천 / 역사 문화': '27e1c66f-f7a5-483e-be92-a8338874df80',
  '도서추천 / 과학': '4e0930d6-9cad-40f9-8aa9-591e882ffd31',
  '도서추천 / 소설': '355e40c7-0337-4527-a5da-3fd6aef50246',
  '도서추천 / 시 에세이': 'e3a14e02-e941-4f40-b289-9fa9242f3f63',
  '자유수다 / 인문': '7c6121b1-5306-4505-9812-9dffffcc7df8',
  '자유수다 / 경제 경영': '3f8ad6c4-650d-4b10-893d-b8f0d896ba8a',
  '자유수다 / 자기계발': 'ee4907e4-96e6-4466-84eb-dee2d92e846c',
  '자유수다 / 정치 사회': 'd05c87c7-4bd7-4399-aea1-8455ee100c8e',
  '자유수다 / 역사 문화': '7ed8ff18-38e3-4b55-8deb-df647c3d050a',
  '자유수다 / 과학': 'fe970b37-ed0e-4a9d-8683-660b74275558',
  '자유수다 / 소설': '8114a2cd-d916-4f38-a735-83815ecb0b83',
  '자유수다 / 시 에세이': '15c0651c-47e5-45e7-91c6-f244443a9123',
};

const Post = () => {
  const navigation = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('');
  const [genres, setGenres] = useState('');
  const [content, setContent] = useState('');
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [userId, setUserId] = useState('');

  // 토스트 에디터
  const toastRef = useRef<Editor>(null);
  const contentMark = toastRef?.current?.getInstance().getMarkdown();

  //  카테고리
  const categories = {
    자유수다: ['인문', '경제 • 경영', '자기계발', '정치 • 사회', '역사 • 문화', '과학', '소설', '시 • 에세이'],
    도서추천: ['인문', '경제 • 경영', '자기계발', '정치 • 사회', '역사 • 문화', '과학', '소설', '시 • 에세이'],
  };

  const categoryArr = ['인문', '경제 • 경영', '자기계발', '정치 • 사회', '역사 • 문화', '과학', '소설', '시 • 에세이'];

  const categoryChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  // 장르
  const genreChangeHander = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenres(e.target.value);
  };

  // 태그
  const onChangeTagItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagItem(e.target.value);
  };

  // 엔터키를 눌렀을 때 태그 제출
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length !== 0 && e.key === 'Enter') {
      e.preventDefault();
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    // '#' 기호를 제거한 후 다시 추가
    let formattedTagItem = `#${tagItem.replace(/^#/, '')}`;
    // 중복 태그가 없는 경우에만 추가
    if (!tagList.includes(formattedTagItem)) {
      const updateTagList = [...tagList, formattedTagItem];
      setTagList(updateTagList);
    }

    setTagItem('');
  };

  // 태그 삭제 버튼
  const DeleteTagItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const deleteTagItem = target.parentElement?.firstChild?.textContent; // 타입 안전성 확보
    if (deleteTagItem) {
      const filteredTagList = tagList.filter((tagItem) => tagItem !== deleteTagItem);
      setTagList(filteredTagList);
    }
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const combined = `${category} / ${genres}`;
    const genreUuid = categoryUuid[combined];
    const newPost = { userId, title, content, tags: tagList, genreUuid };
    console.log(newPost);

    await submitPostListHandler(newPost);
    setTitle('');
    setContent('');
    setTagList([]);

    navigation('/bookertalk');
  };
  // post 에 insert 할 때 이 값 보내주면 됨

  // 유저 세션 가져오기
  const getUserSession = async () => {
    const result = await getUserSessionHandler();
    setUserId(result.session?.user.id as string);
  };

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          formSubmitHandler(e);
        }}>
        <div>
          <div>
            {/* <Editor
              initialValue="내용을 입력해주세요 ! "
              previewStyle="vertical"
              height="600px"
              initialEditType="wysiwyg"
              useCommandShortcut={false}
              plugins={[colorSyntax]}
              language="ko-KR"
              ref={toastRef}
            /> */}
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              autoComplete="off"
              id="title"
            />
          </div>

          <div>
            <select value={category} onChange={categoryChangeHandler}>
              <option value="">카테고리 선택</option>
              {Object.keys(categories).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          {category && categories[category as keyof Categories] && (
            <div>
              <select value={genres} onChange={genreChangeHander}>
                <option value="">장르 선택</option>
                {categories[category as keyof Categories].map((genre: string, index: number) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            {/* 태그기능 */}
            {tagList.map((tagItem, index) => {
              return (
                <div key={index}>
                  <span>{tagItem}</span>
                  <button
                    onClick={(e) => {
                      DeleteTagItem(e);
                    }}>
                    X
                  </button>
                </div>
              );
            })}
            <input
              value={tagItem}
              onChange={(e) => {
                onChangeTagItem(e);
              }}
              placeholder="태그를 입력하세요"
              type="text"
              autoComplete="off"
              tabIndex={2}
              onKeyPress={onKeyPressHandler}
            />
          </div>
        </div>
        <div>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="당신의 이야기를 적어보세요. . ."
            id="comment"
            type="text"
            autoComplete="off"
          />
        </div>

        <div>
          <button type="submit">작성완료</button>
        </div>
      </form>
    </>
  );
};

export default Post;
