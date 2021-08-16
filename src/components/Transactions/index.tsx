import { media } from "../../style/media";
import { TransactionsCompact } from "./compact";
import { TransactionTable } from "./table";

export const Transactions = () => {
  const md = media.useLg();
  return md ? <TransactionTable /> : <TransactionsCompact />;
};
export { Empty } from "./Empty";
