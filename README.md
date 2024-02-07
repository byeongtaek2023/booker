# BOOKER
<br>
이 프로젝트는 스파르타 내일배움 캠프 A조 6팀(until6)의 최종 프로젝트입니다

## 프로젝트 소개
<br>
도서소개 사이트, 중고책거래 사이트 등 하나의 컨텐츠를 위해 일일히 해당 사이트를 찾아
들어가는 번거로움을 줄이고, 책에 대한 모든 것이라는 주제로 다양한 컨텐츠를 우리 사이트에서
다 이용할 수 있도록 기획하였습니다.

## 서비스 아키텍처
![0202_Web App Reference Architecture V2](https://github.com/laluniax/booker/assets/145360585/b06e84a9-b0d4-42a0-b727-5ff509bd3774)

## 구성 page
<br>
+ 회원가입 - 유효성 검사 / 중복 확인
+ 로그인 - 구글 / 깃허브 / 유효성 검사
+ 북커톡 커뮤니티 - CRUD / 댓글,대댓글 / 좋아요 / 팔로우
+ 도서소개 - 알라딘 api로 카테고리별 best50 불러옴
+ 맞춤추천 - 설문조사 질문지를 통해 filtering한 책 유저 맞춤 추천
+ 중고거래 - CRUD / 제품에 관련된 1:1 실시간 채팅 / 좋아요 / 팔로우
+ 독립서점 - 카카오맵 api로 지도 불러와서 독립서점 데이터 마커로 찍어놓음
+ 검색 - 각 게시글 및 책 관련 검색
+ 마이페이지 - 프로필 수정 / 내가 쓴 글 / 팔로우 목록 / 좋아요 목록
+ 상대 프로필 페이지 - 게시글 / 팔로우 목록 / 좋아요 목록
+ 문의하기 - 관리자와 1:1 채팅

## 기술 스택
+ react
+ typescript
+ recoil
+ 알라딘api
+ 카카오맵api
+ react-router-dom
+ react-query
+ styled-component
+ supabase
+ axios
+ toast ui editor

## 기술적 의사결정
- **React+Typescript** vs Next.js
    - react사용 시 코드 작성과 유지 보수가 용이
    - typescript가 정적 타입을 제공하여 많은 버그 해결
    - type을 선언함으로써 다른 사람의 코드를 해석하는 능률 향상
    - 마감 기한 안에 구현해야할 기능이 많아 팀원 전체의 이해도가 높은 React+Typescript 채택
- **Recoil** vs Redux Toolkit
    - 여러 컴포넌트에서 같은 데이터를 사용해서 코드가 중복되므로 전역 관리 필요
    - toolkit의 코드보다 recoil의 코드가 더 경량화
- **Supabase** vs Firebase
    - CRUD, 실시간 채팅, 유저인증 관련 데이터베이스 필요
    - PostgreSQL 방식으로 데이터를 효율적으로 관리하는데 도움
    - 수파베이스에만 있는 RDBMS(관계형 데이터베이스 관리 시스템)를 통해 데이터 효과적 저장, 관리, 검색 가능
- Kakaomap API vs Navermap API
    - 독립서점 소개를 위해 맵 API 필요
    - 카카오맵이 좀 더 직관적이고 사용자 친화적 UI/UX사용
    - 공식문서의 문서화가 잘 되어 있고, 다양한 예제와 샘플 코드가 제공되어 다양한 기능 사용 가능
- React Query
    - db 데이터 가져오는 비동기 처리를 위해 필요
    - 직관적이고 예측 가능한 상태 컨테이너를 제공하므로 복잡한 애플리케이션에서 사용 용이
    - 상태 관리 우수
    - dev tools를 통해 디버깅에 강점
    - 간편한 사용성과 코드의 간결성
- Toast UI Editor
    - 글쓰기 기능을 위해 필요
    - 간단하고 직관적인 사용자 인터페이스 제공
    - 마크다운을 통한 실시간 미리보기 기능
- **Aladin** API vs Naver Book Search API
    - 책 소개 위해 API 필요
    - 네이버는 알라딘에 비해 데이터 정렬 순서가 다양하지 않고 도서 표지 이미지가 너무 작음
    - 알라딘에서만 다른 사람들의 리뷰도 포함

## 트러블 슈팅
- Aladin API
    - 문제상황
        - 오픈 API지만 CORS policy를 열어 놓지 않아 데이터를 가져 올 수 없음(aladin.co.kr이 아닌 주소에서 알라딘 서버에 요청을 보내면 거절해버리는 정책)
    - 해결방안
        - proxy 사용(http-proxy-middleware) or express 서버 만들기
        - express 서버를 만들어 배포 시도 중 백엔드 서버 간단히 배포할 수 있는 클라우드 타입 찾아서 여기서 배포 결정(Express란 Node.js를 사용하여 쉽게 서버를 구성할 수 있게 만든 클래스와 라이브러리의 집합체)
- 실시간 채팅(중고거래)
    - 문제상황
        - 단순 유저 간 1:1 채팅만 생각하고 구현하였다가, 중고거래 물품에 대한 1:1 유저간 채팅으로 기획이 수정되면서 1개 물품에 대한 문의만큼 채팅창이 생겨야 하는데 첫 채팅 유저 2명에서 고정되어 추가 대화창이 생기지 않는 문제
    - 해결 방안
        - 기존 작성한 코드로는 채팅창이 늘어나질 않아 코드 전면 수정
        - 각각의 물품에 대해 대화 신청을 하면 채팅창에 uuid 고유값을 맞춰서 여러 대화가 가능하도록 해결
- 실시간 채팅(고객센터)
    - 문제 상황
        - 모달창으로 구현한 admin 입장의 채팅 부분에서 useParams 이용을 위해 useNavigate를 사용하였으나 아예 새로운 페이지로 이동하게 됨
    - 해결 방안
        - state를 하나 추가하여 uuid 저장 후 해당 uuid 클릭 시 해당 uuid를 가진 유저와의 채팅방으로 이동하도록 로직 재구성

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 팀원
리더 천민규
부리더 박주원
팀원 강나연
팀원 김지예
팀원 시병택
