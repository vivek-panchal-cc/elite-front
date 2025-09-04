import { profileLabels } from "@/lib/labels";
import WrapAmount from "../wrapper/WrapAmount";
import useRewards from "@/hooks/useRewards";
import { formatDate } from "@/lib/constants/all";

export default function RecentTransactionCard() {
  const [loadingTrans, transactionList, reloadTrans] = useRewards();

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4 overflow-x-auto custom-scrollbar text-[var(--color-black)] min-h-[239px]">
        <h3 className="font-semibold text-[12px] sm:text-[14px] md:text-[14px] mb-2">
          {profileLabels.recentTransaction}
        </h3>
        <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2">
          {/* min-w-[349px] */}
          <thead>
            <tr className="text-left text-[var(--color-black)] text-[10px]">
              <th>{profileLabels.orderDate}</th>
              <th>{profileLabels.creditOrDebit}</th>
              <th>{profileLabels.amount}</th>
              <th>{profileLabels.desc}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="p-0">
                <div className="w-[calc(100%+1.5rem)] -ml-3 sm:w-[calc(100%+2rem)] sm:-ml-4 border-b-2 border-[var(--color-light-gray)]"></div>
              </td>
            </tr>
            {transactionList.length > 0 ? (
              transactionList.map((o, idx) => (
                <tr
                  key={idx}
                  className="text-[var(--color-black)] rounded-lg text-[10px]"
                >
                  <td>{formatDate(o.redeem_date)}</td>
                  <td
                    className={
                      o.cr_dr === "C"
                        ? "text-[var(--color-blue)]"
                        : "text-[var(--color-red)]"
                    }
                  >
                    <WrapAmount value={o.redeem_amount} />
                  </td>
                  <td>
                    <WrapAmount value={o.amount_balance} />
                  </td>
                  <td>{o.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-gray-500 text-[10px]"
                >
                  {profileLabels.noTrans}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
