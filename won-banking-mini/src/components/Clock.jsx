// 1. import 구문

// 2. function 등을 작성

// 3. 함수형 컴포넌트 자체 
// 일반 함수와 구분해서 JSX에서 이해하도록 
// 컴포넌트 명은 대문자로 시작하는 파스칼케이스를 따릅니다.
function Clock() {
  const now = new Date();
  return <span>{now.toLocaleTimeString("ko-KR")}</span>;
}

export default Clock