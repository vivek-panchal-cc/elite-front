"use client";

import { useBasket } from "@/components/context/BasketContext";
import { useCheckout } from "@/components/context/CheckoutContext";
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
    const { token_id } = card;
    const { grand_total } = order;
    if (payInstant) await payInstant({ token_id, grand_total });
    if (clearCart) await clearCart();
    if (reloadCart) await reloadCart();
    router.push("/dashboard");
  };

  const goBack = () => {
    resetCheckout();
  };

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-6 sm:px-4 md:px-6 lg:px-8">
      <h1 className="pb-4 text-center text-2xl sm:text-4xl text-[var(--color-blue)]">
        {checkoutLabels.selectCard}
      </h1>
      <div className="relative bg-[var(--color-white)] rounded-xl shadow-lg py-8 px-4 md:p-10">
        <div className="absolute card-list-border-top top-0 left-0 w-full h-5 rounded-t-lg bg-gradient-to-r"></div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-2">
          <Button
            className="bg-[var(--color-red)] text-[12px] sm:text-[14px] text-[var(--color-white)] px-4 py-2 rounded-md hover:bg-[var(--color-red-hover)] w-fit sm:w-auto"
            onClick={goBack}
          >
            {checkoutLabels.back}
          </Button>
          <Button
            className="bg-[var(--color-blue)] text-[12px] sm:text-[14px] text-[var(--color-white)] px-4 py-2 rounded-md w-full sm:w-auto"
            onClick={createPayment}
          >
            {checkoutLabels.payWithNew}
          </Button>
        </div>

        {/* Cards Section */}
        {cardList.length > 0 && (
          <h2 className="text-md sm:text-lg font-medium mb-4">
            {checkoutLabels.selectSavedCard}
          </h2>
        )}
        {loadingCards ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-4 shadow-lg bg-[var(--color-white)]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[12px] sm:text-[14px]">
            {cardList.map((card: any) => {
              const isExpired =
                new Date(`${card.expiry_year}-${card.expiry_month}-01`) <
                new Date();
              return (
                <div
                  key={card.id}
                  className="border rounded-lg p-4 flex flex-col shadow-lg bg-[var(--color-white)]"
                >
                  <div>
                    <p className="font-semibold">{card.card_type}</p>
                    <p className="text-sm tracking-widest">
                      **** **** **** {card.last4}
                    </p>
                    <p className="text-sm mt-1">
                      {!isExpired
                        ? checkoutLabels.expires
                        : checkoutLabels.expired}{" "}
                      {!isExpired ? (
                        <span>
                          {card.expiry_month}-{card.expiry_year}
                        </span>
                      ) : (
                        <span className="bg-[var(--color-red)] text-[var(--color-black)] p-1 px-2 rounded-sm">
                          {card.expiry_month}-{card.expiry_year}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {!isExpired && (
                      <>
                        <Button
                          className="text-[12px] sm:text-[14px] bg-[var(--color-blue)] text-[var(--color-white)] px-3 py-0 sm:py-1 rounded-md h-7 sm:h-9"
                          onClick={() => handlePayNow(card)}
                        >
                          {checkoutLabels.payNow}
                        </Button>
                        {!card.is_default && (
                          <button
                            className="border border-[var(--color-green)] text-[var(--color-green)] px-3 py-1 rounded-md hover:bg-[var(--color-green)] hover:text-[var(--color-white)] cursor-pointer"
                            onClick={() => handleCardAction(card.id, "default")}
                          >
                            {checkoutLabels.setAsDefault}
                          </button>
                        )}
                      </>
                    )}
                    <button
                      className="border border-[var(--color-red)] text-[var(--color-red)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] px-3 py-1 rounded-md cursor-pointer"
                      onClick={() => handleCardAction(card.id, "delete")}
                    >
                      {checkoutLabels.delete}
                    </button>
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
