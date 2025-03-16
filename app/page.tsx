import UI from "./ui";

// 기본적으로 page.tsx 파일은 서버 컴포넌트로 처리된다.
// 서버 컴포넌트는 서버에서 렌더링되어 클라이언트로 전달되는 컴포넌트이다.
// page.tsx에서 client 컴포넌트를 사용하는건 좋지 않다.
// 서버 컴포넌트가 아니라 클라이언트 컴포넌트를 이용하게 되면
// 메타데이터 같은 const를 활용할 수 없다
// client component가 필요하다면 별도의 파일(ui.tsx)로 분리하여
// 해당 파일에 ui component를 정의하고 page.tsx에서 import하여 사용한다.

export const metadata = {
  title: "Minibox",
  description: "Drap & Dropbox clone",
};

export default function Home() {
  return <UI />;
}
