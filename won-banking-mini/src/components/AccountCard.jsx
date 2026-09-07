// components/AccountCard.jsx
import StatusBadge from "./StatusBadge";
import { formatWon, maskAccountNo, formatWonMasked } from "../utils/format";

function AccountCard({ accountNo, accountType, balance, status, showFullNo, showAmount }) {
  return (
    <div className="card">
      {/* console.log('❤️', showAmount) */}
      
      <div className="row">
        <span className="muted">{accountType}</span>
        <StatusBadge status={status} />
      </div>
      <p className="muted">{showFullNo ? accountNo : maskAccountNo(accountNo)}</p>
      <strong className="balance">{ formatWonMasked(balance, showAmount) }</strong>
    </div>
  );
}

export default AccountCard;