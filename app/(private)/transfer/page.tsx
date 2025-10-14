"use client";

import { images } from "@/components/images";
import { SidebarNav } from "@/components/ui/SidebarNav";
import Image from "next/image";
import { useEffect, useState } from "react";
import TransferRightComponent from "./components/TransferRightComponent";
import PaypalModal from "./components/PaypalModal";
import useIsMobile from "@/hooks/useIsMobile";
import { transferLabels } from "@/lib/labels";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import Breadcrumb from "@/components/ui/Breadrumb";

interface SidebarItem {
  title: string;
  icon?: React.ReactNode | null;
}
const Transfer = () => {
  const { dealer } = useAuthStoreWithAutoRefresh();
  const {
    simply_user_ref = "",
    paypal_transfer_eligible = "0",
    gcerpid = "",
  } = dealer || {};
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [paypalAmount, setPaypalAmount] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const flagObj = {
    simply_user_ref,
    gcerpid,
    paypal_transfer_eligible,
  };

  const renderActiveSection = () => {
    return (
      <TransferRightComponent
        setIsOpen={setIsOpen}
        isMobile={isMobile}
        activeIndex={activeIndex}
        flag={flagObj}
        setAmount={setPaypalAmount}
      />
    );
  };

  const sidebarNavItems: SidebarItem[] = [
    {
      title: transferLabels.simply,
      icon: null,
    },
    {
      title: transferLabels.vapeJucce,
      icon: null,
    },
    { title: transferLabels.paypal, icon: null },
  ];

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="profile-header-section">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mx-auto gap-6 pb-7 lg:pb-7 pt-7 sm:pt-7 md:pt-7 lg:pt-7 px-4 sm:px-5 md:px-8 lg:px-[60px]">
            {!isMobile && (
              <div className="[&_nav]:text-[14px] md:[&_nav]:text-[16px] [&_a]:text-[var(--color-white)] [&_span]:text-[var(--color-white)] [&_li]:text-[var(--color-white)] pb-4 font-semibold leading-[22px]">
                <Breadcrumb />
              </div>
            )}
            <div className="flex justify-center items-center flex-wrap lg:flex-nowrap mt-0 md:-mt-10 lg:-mt-13">
              <div className="lg:basis-[45%]">
                <Image
                  className="w-auto h-[200px] lg:h-[269px]"
                  src={images.transferHero}
                  alt="hero"
                />
              </div>
              <div className="lg:basis-[45%]">
                <h1
                  className="text-[26px] leading-8 lg:leading-[53px] text-center lg:text-left lg:text-[42px] mb-6 sm:mb-0 font-bold"
                  dangerouslySetInnerHTML={{
                    __html: transferLabels.transferFund,
                  }}
                ></h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto w-full">
        <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
          {/* <Breadcrumb /> */}
          <div className="flex-1 space-y-4 py-12">
            <div className="flex flex-col md:flex-row gap-16">
              {/* Sidebar */}
              <div className="w-full md:w-1/3">
                <SidebarNav
                  items={sidebarNavItems?.map((item, index) => ({
                    ...item,
                    renderContent:
                      isMobile && index === activeIndex
                        ? renderActiveSection()
                        : null,
                  }))}
                  activeIndex={activeIndex}
                  onItemSelect={(index: number) => {
                    setActiveIndex(index);
                  }}
                />
              </div>
              {!isMobile && renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
      <PaypalModal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        amount={paypalAmount || 0}
      />
    </>
  );
};

export default Transfer;
