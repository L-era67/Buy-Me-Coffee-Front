import { AccountEarnings } from "./_components/AccountEarnings";
import { Amount } from "./_components/Amount";
import { Transactions } from "./_components/Transactions";

const Home = () => {
  return (
    <div className="mx-60">
      <AccountEarnings />
      <Amount />
      <Transactions />
    </div>
  );
};
export default Home;
