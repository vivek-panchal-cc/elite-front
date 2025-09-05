import useOrderHistory from "@/hooks/useOrderHistory";
import { profileLabels } from "@/lib/labels";
import WrapAmount from "../wrapper/WrapAmount";
import { formatDate } from "@/lib/constants/all";
import LoaderDiv from "../loaders/LoaderDiv";

export default function OrderHistoryCard() {
  const [loading, orderHistory, reload] = useOrderHistory({
    limit: 10,
    orderBy: "DESC",
    page: 1,
    sortBy: "ord_id",
  });
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4 overflow-x-auto custom-scrollbar text-[var(--color-black)]">
        <h3 className="font-semibold text-[10px] sm:text-[12px] md:text-[14px]">
          {profileLabels.orderHistory}
        </h3>
        <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2">
          {/* min-w-[349px] */}
          <thead>
            <tr className="text-left text-[var(--color-black)] text-[10px]">
              <th>{profileLabels.orderNo}</th>
              <th>{profileLabels.orderDate}</th>
              <th>{profileLabels.total}</th>
              <th>{profileLabels.action}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="p-0">
                <div className="w-[calc(100%+1.5rem)] -ml-3 sm:w-[calc(100%+2rem)] sm:-ml-4 border-b-2 border-[var(--color-light-gray)]"></div>
              </td>
            </tr>
            {loading
              ? Array.from({ length: 5 }).map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="text-[var(--color-black)] rounded-lg text-[10px]"
                  >
                    {Array.from({ length: 4 }).map((_, colIdx) => (
                      <td key={colIdx}>
                        <LoaderDiv
                          width={50}
                          height={15}
                          backgroundColor="#C7C7C7"
                        />
                      </td>
                    ))}
                  </tr>
                ))
              : orderHistory.slice(0, 5).map((o, idx) => (
                  <tr
                    key={idx}
                    className="text-[var(--color-black)] rounded-lg text-[10px]"
                  >
                    <td>{o.o_ord_id}</td>
                    <td>{formatDate(o.o_ord_datetime)}</td>
                    <td>
                      <WrapAmount value={o.o_total} />
                    </td>
                    <td className="text-[var(--color-red)] cursor-pointer">
                      {profileLabels.reorder}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
