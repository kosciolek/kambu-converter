import { media } from "../../style/media";
import { TransactionsCompact } from "./compact";
import { TransactionTable } from "./table";

export const Transactions = () => {
  const md = media.useMd();
  return md ? <TransactionTable /> : <TransactionsCompact />;
};
