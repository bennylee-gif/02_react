// 필요한 부품들을 불러옵니다.
import './App.css'
import './index.css'
import Clock from './components/Clock.jsx'
import Panel from './components/Panel.jsx'
import AccountCard  from './components/AccountCard.jsx'
import Header from './components/Header'
import Counter from './components/Counter.jsx'
import { useState } from 'react'
import TransactionRow from './components/TransactionRow.jsx'
 
// 02_html기초.html 안에 만들었던 계좌카드의 css를 가져와서
// 아래에 있는 카드를 좀더 그럴듯하게 꾸며보세요.
// 실제로 사용될 화면을 그립니다.
function App() {
  
  // 화면이 렌더링 되기 위해 필요로 하는 값(data)을 적습니다.
  // 1. 데이터
  // 계좌 목록 (실제 서비스에서는 백엔드 DB에서 내려오는 데이터가 뿌려집니다)
  const accounts = [
    {
      accountId: 1,
      accountNo: "1002-345-678901", // 
      accountType: "입출금", // 
      balance: 1523000, // 
      status: "지급정지",
      ownerName: "김연지", // 
    },
    {
      accountId: 2,
      accountNo: "1002-345-112233",
      accountType: "적금",
      balance: 1200000,
      status: "정상",
      ownerName: "김연지",
    },
    {
      accountId: 3,
      accountNo: "1002-345-998877",
      accountType: "적금",
      balance: 397000,
      status: "휴면",
      ownerName: "김연지",
    },
  ]

  const transactions = [
  {
    txId: 1,
    accountId: 1,
    txType: "출금",
    amount: 12000,
    balanceAfter: 1511000,
    category: "식비",
    memo: "점심",
    counterparty: "김밥천국",
    txDatetime: "2026-09-02T12:31:00",
  },
  {
    txId: 2,
    accountId: 1,
    txType: "입금",
    amount: 2400000,
    balanceAfter: 3911000,
    category: "급여",
    memo: "9월 급여",
    counterparty: "우리회사",
    txDatetime: "2026-09-01T09:00:00",
  },
  {
    txId: 3,
    accountId: 1,
    txType: "출금",
    amount: 45000,
    balanceAfter: 3866000,
    category: "쇼핑",
    memo: "운동화",
    counterparty: "무신사",
    txDatetime: "2026-08-31T20:14:00",
  },
];

  // flag 변수: 깃발을 들어서 교통량을 제어하는 것처럼 이 변수의 역할은 특정 로직을 끄거나 켜거나 밖에 없기 때문에
  // flag 변수를 사용할 때는 default 값을 false로 만들고 시작하는 로직을 권장 
  const [showFullNo, setShowFullNo] = useState(false);
  //     ↑현재 값      ↑바꾸는 함수              ↑처음값

  // 실습!
  // showAmount 버튼의 클릭 여부에 따라 AccoutCard의 금액이 보이거나 보이지 않도록 
  // prop으로 새로 생긴 변수를 넘겨보세요
  const [showAmount, setShowAmount] = useState(false);

  // XML에서는 여는 꺽쇠 안의 태그가 무엇이든 될 수 있기 때문에 <이름>김연지 </이름>
  // JSX 가 소문자 태그는 HTML, 대문자로 시작하는 태그는 컴포넌트로 인식
  // return ( ) 바깥에서는 일반 자바스크립트처럼 // 로 주석을 적습니다.
  // return 뒤에 렌더링 될 부분을 적습니다.
  return (
    <> 
    <Header />

    <button onClick={() => setShowFullNo(!showFullNo)}>
      {showFullNo ? "계좌번호 숨기기" : "계좌번호 보기"}
    </button>

    <button onClick={() => setShowAmount(!showAmount)}>
      {showAmount ? "금액 숨기기" : "금액 보기"}
    </button>
    
    <Clock />
    {/* class 는 JS의 예약어이므로 JSX에서는 className으로 대신 사용합니다.*/}

    {/* 사용 */}
    <Panel title="내 계좌">
      <AccountCard accountNo={accounts[0].accountNo}
                  accountType={accounts[0].accountType} 
                  balance={accounts[0].balance}
                  status={accounts[0].status}
                  showFullNo={showFullNo}
                  showAmount={!showAmount} />
      {/* 두번째 AccountCard가 출력되도록 accounts[1] dict의 값과 매핑해주세요. */}
    
      <AccountCard accountNo={accounts[1].accountNo}
                  accountType={accounts[1].accountType} 
                  balance={accounts[1].balance}
                  status={accounts[1].status}
                  showFullNo={showFullNo}
                  showAmount={!showAmount} />
    
    </Panel>

    <Panel title="최근 거래">
      {transactions.map((tx) => (
        <TransactionRow
        key={tx.txId}
        txType={tx.txType}
        amount={tx.amount}
        category={tx.category}
        memo={tx.memo}
        counterparty={tx.counterparty}
        txDatetime={tx.txDatetime}
        hideAmount={!showAmount}/>
      ))}
      </Panel>
    </>
  );
}

// 이 컴포넌트를 외부에서 import해서 쓸 수 있도록 선언
export default App