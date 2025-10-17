"use client";

import { useBasket } from "@/components/context/BasketContext";
import { useCheckout } from "@/components/context/CheckoutContext";
import ArrowLeft from "@/components/images/svgs/ArrowLeft";
import DefaultCard from "@/components/images/svgs/DefaultCard";
import LoaderCard from "@/components/loaders/LoaderCard";
import { useLoader } from "@/components/providers/loader-provider";
import { Button } from "@/components/ui/ButtonUI";
import useCardList from "@/hooks/useCards";
import useCartItems from "@/hooks/useCartItems";
import { apiRequest } from "@/lib/apiRequest";
import { checkoutLabels } from "@/lib/labels";
import { Card } from "@/types/payments";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const router = useRouter();
  const { resetCheckout, order, cardAction, payInstant } = useCheckout();
  const { clearCart } = useBasket();
  const { reloadCart } = useCartItems();
  const { setIsLoading } = useLoader();
  const [loadingCards, cardList, reloadCard] = useCardList();

  useEffect(() => {
    if (!order) router.replace("/cart");
  }, [order, router]);

  const createPayment = async () => {
    if (!order) return;
    setIsLoading(true);
    try {
      const { data } = await apiRequest.createPayment(order);
      if (!data.success) throw data.message;
      if (data.data.paymentUrl) {
        window.location.href = data.data.paymentUrl;
      }
    } catch (error: any) {
      if (typeof error === "string") return toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardAction = async (
    cardId: string,
    action: "default" | "delete"
  ) => {
    if (cardAction) await cardAction(cardId, action);
    if (reloadCard) await reloadCard();
  };

  const handlePayNow = async (card: Card) => {
    if (!card || !order) return;
    const { id } = card;
    const { grand_total } = order;
    if (payInstant) await payInstant({ token_id: id, grand_total });
  };

  const goBack = () => {
    resetCheckout();
  };

  return (
    <div className="max-w-7xl mx-auto w-full py-10 sm:py-16 px-6 sm:px-4 md:px-6 lg:px-8">
      <h1 className="pb-4 text-center text-[22px] sm:text-[32px] text-[var(--color-blue)] font-bold leading-[100%]">
        {checkoutLabels.selectCard}
      </h1>
      <div className="border-b-2 top-0 left-0 w-full h-5 rounded-t-lg bg-gradient-to-r"></div>
      <div className="relative bg-[var(--color-white)] rounded-xl p-4 md:p-10">
        {/* <div className="absolute card-list-border-top top-0 left-0 w-full h-5 rounded-t-lg bg-gradient-to-r"></div> */}
        {/* Header */}
        <div className="flex flex-row sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-2">
          <Button
            className="bg-[var(--color-red)] text-[12px] sm:text-[14px] font-semibold text-[var(--color-white)] !px-4 sm:!px-6 py-2 rounded-full h-[30px] sm:h-[37px] hover:bg-[var(--color-red-hover)]"
            onClick={goBack}
          >
            <ArrowLeft className="!h-3 !w-3" />
            {checkoutLabels.back}
          </Button>
          <Button
            className="bg-[var(--color-blue)] text-[12px] sm:text-[14px] font-semibold text-[var(--color-white)] !px-4 sm:!px-6 py-2 rounded-full h-[30px] sm:h-[37px]"
            onClick={createPayment}
          >
            {checkoutLabels.payWithNew}
          </Button>
        </div>

        {/* Cards Section */}
        {cardList.length > 0 && (
          <h2 className="text-[14px] sm:text-[18px] font-semibold mb-4">
            {checkoutLabels.selectSavedCard}
          </h2>
        )}
        {loadingCards ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-4 shadow-lg bg-[var(--color-soft-white)]"
              >
                <LoaderCard />
              </div>
            ))}
          </div>
        ) : cardList?.length <= 0 ? (
          <p className="text-center text-[var(--color-black)] text-sm sm:text-base py-8">
            {checkoutLabels.noCards}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-[12px] sm:text-[14px]">
            {cardList.map((card: any) => {
              const isExpired =
                new Date(`${card.expiry_year}-${card.expiry_month}-01`) <
                new Date();
              return (
                <div
                  key={card.id}
                  className={`relative border rounded-lg p-4 flex flex-col shadow-lg bg-[var(--color-soft-white)] ${
                    card.is_default ? "border-2 border-[#FE174E]" : ""
                  }`}
                >
                  {card.is_default && (
                    <span className="absolute -top-3 -right-3 bg-[var(--color-red)] text-white text-[8px] font-bold rounded-full h-[22px] w-[22px] flex items-center justify-center shadow-md">
                      <DefaultCard />
                    </span>
                  )}
                  <div>
                    <p className="text-[12px] text-[var(--color-black)]/50 font-semibold">
                      {card.card_type}
                    </p>
                    <p
                      className={`text-[14px] sm:text-[16px] text-[#0D4BA3] mt-1 tracking-widest ${
                        card.is_default ? "font-medium" : "font-normal"
                      }`}
                    >
                      ************{card.last4}
                    </p>
                    <p className="text-[12px] text-[var(--color-black)]/50 font-normal mt-1">
                      {!isExpired
                        ? checkoutLabels.expires
                        : checkoutLabels.expired}{" "}
                      <span
                        className={
                          isExpired
                            ? "bg-[var(--color-red)] text-[var(--color-black)] p-1 px-2 rounded-sm"
                            : ""
                        }
                      >
                        {card.expiry_month}-{card.expiry_year}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {!isExpired && (
                      <>
                        <Button
                          className="h-[30px] sm:h-[35px] text-[12px] font-semibold bg-[var(--color-blue)] text-[var(--color-white)] px-4 sm:px-6 rounded-full"
                          onClick={() => handlePayNow(card)}
                        >
                          {checkoutLabels.payNow}
                        </Button>
                        {!card.is_default && (
                          <Button
                            className="h-[30px] sm:h-[35px] text-[12px] font-semibold bg-[#0091CA] hover:bg-[#0091CA]/80 px-4 sm:px-6 rounded-full hover:text-[var(--color-white)] cursor-pointer"
                            onClick={() => handleCardAction(card.id, "default")}
                          >
                            {checkoutLabels.setAsDefault}
                          </Button>
                        )}
                      </>
                    )}
                    <Button
                      className="h-[30px] sm:h-[35px] text-[12px] font-semibold bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] px-4 sm:px-6 rounded-full cursor-pointer"
                      onClick={() => handleCardAction(card.id, "delete")}
                    >
                      {checkoutLabels.delete}
                    </Button>
                  </div>

                  {isExpired && (
                    <p className="text-[var(--color-black)] text-[12px] sm:text-[14px] mt-3 bg-[var(--color-red)] p-2 rounded-md">
                      {checkoutLabels.your}{" "}
                      <span className="font-bold">{card.card_type}</span>{" "}
                      {checkoutLabels.cardExpMsg}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
