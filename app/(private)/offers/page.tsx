"use client";

import OffersHeader from "./(section)/OffersHeader";
import OffersFooter from "./(section)/OffersFooter";
import { footerLabels } from "@/lib/labels";
import Tag from "@/components/images/svgs/Tag";
import LimitedTime from "@/components/images/svgs/LimitedTime";
import Marketing from "@/components/images/svgs/Marketing";
import RewardGift from "@/components/images/svgs/RewardGift";
import DealerPortal from "@/components/images/svgs/DealerPortal";
import LatestPromotion from "@/components/images/svgs/LatestPromotion";
import PlaceOrder from "@/components/images/svgs/PlaceOrder";
import SellEarn from "@/components/images/svgs/SellEarn";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/pages/login-form/LoginForm";
import RegistrationForm from "@/components/pages/registration-form/RegistrationForm";
import ResetPassword from "@/components/pages/reset-password/ResetPasswordForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

const offers = [
  { icon: <Tag />, label: footerLabels.offers.contentWholesalePrice },
  { icon: <LimitedTime />, label: footerLabels.offers.contentLimited },
  { icon: <RewardGift />, label: footerLabels.offers.contentLoyalty },
  { icon: <Marketing />, label: footerLabels.offers.contentPOS },
];

const portals = [
  {
    id: 0,
    icon: <DealerPortal />,
    label: footerLabels.offers.dealerPortal,
    desc: footerLabels.offers.dealerPortalMsg,
    href: null,
  },
  {
    id: 1,
    icon: <LatestPromotion />,
    label: footerLabels.offers.dealerViewLatest,
    desc: footerLabels.offers.dealerViewLatestMsg,
    href: "#",
  },
  {
    id: 2,
    icon: <PlaceOrder />,
    label: footerLabels.offers.dealerPlaceOrder,
    desc: footerLabels.offers.dealerPlaceOrderMsg,
    href: "#",
  },
  {
    id: 3,
    icon: <SellEarn />,
    label: footerLabels.offers.dealerSellEarn,
    desc: footerLabels.offers.dealerSellEarnMsg,
    href: "#",
  },
];

export default function Offers() {
  const router = useRouter();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  return (
    <>
      <OffersHeader />
      <div className="max-w-7xl mx-auto w-full">
        <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px] py-6">
          <div className="p-6 pb-0 flex items-center justify-center text-[30px] sm:text-[30px] font-medium">
            <div className="text-[22px] sm:text-[25px] md:text-[28px] lg:text-[30px] text-[var(--color-red)] text-center font-bold">
              {footerLabels.offers.contentHeader}
            </div>
          </div>
          <div className="py-2">
            <p className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-[var(--color-black)] text-center">
              {footerLabels.offers.contentHeaderDetails}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4 mb-4 text-center sm:text-left">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
              >
                {offer.icon}
                <span className="text-[var(--color-blue)] font-semibold text-[14px] sm:text-[16px] leading-[16px] sm:leading-[20px]">
                  {offer.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center flex justify-center">
            <p className="p-2 px-6 border-1 border-dashed w-fit rounded-full border-[var(--color-red)] font-bold text-[12px] sm:text-[16px]">
              {footerLabels.offers.contentCenterDesc}
            </p>
          </div>
          <div className="mt-12 text-center flex justify-center">
            <div className="text-[22px] sm:text-[25px] md:text-[28px] lg:text-[30px] text-[var(--color-red)] text-center font-bold">
              {footerLabels.offers.contentHowToAccess}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4 mb-10 text-center">
            {portals.map((p, index) => (
              <div
                key={p.id || index}
                className={`flex flex-col items-center gap-1 sm:gap-2 p-4 py-8 bg-[var(--color-light-gray)] rounded-md shadow-md ${
                  p.href ? "cursor-pointer" : ""
                }`}
                onClick={p.href ? () => router.push(p.href) : undefined}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                  {p.icon}
                </div>
                <span className="text-[var(--color-blue)] font-semibold text-[12px] sm:text-[16px] leading-[16px] sm:leading-[20px] mt-0 sm:mt-2">
                  {p.label}
                </span>
                <span className="text-[var(--color-gray)] text-[10px] sm:text-[12px] leading-[14px] sm:leading-[18px] font-normal">
                  {p.desc}{" "}
                  {p.id === 0 && (
                    <span
                      className="block sm:inline text-[var(--color-blue)] underline cursor-pointer"
                      onClick={() => setLoginOpen(true)}
                    >
                      {footerLabels.offers.dealerPortalHighlight}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <OffersFooter />
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <LoginForm
          setLoginClose={setLoginOpen}
          setSignUpOpen={setSignUpOpen}
          setResetPasswordOpen={setResetPasswordOpen}
        />
      </Modal>
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <RegistrationForm
          setRegistrationClose={setSignUpOpen}
          setLogin={setLoginOpen}
        />
      </Modal>
      <Modal
        isOpen={resetPasswordOpen}
        onClose={() => setResetPasswordOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <ResetPassword setLoginClose={setResetPasswordOpen} />
      </Modal>
    </>
  );
}
