"use client";

import { images } from "@/components/images";
import { SidebarNav } from "@/components/ui/SidebarNav";
import Image from "next/image";
import { useEffect, useState } from "react";
import TransferRightComponent from "./components/TransferRightComponent";
import PaypalModal from "./components/PaypalModal";
import useIsMobile from "@/hooks/useIsMobile";

interface SidebarItem {
  title: string;
  icon?: React.ReactNode | null;
}

const Transfer = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeIndex) {
      case 0:
        return (
          <TransferRightComponent
            setIsOpen={setIsOpen}
            isMobile={isMobile}
            activeIndex={activeIndex}
          />
        );
      case 1:
        return (
          <TransferRightComponent
            setIsOpen={setIsOpen}
            isMobile={isMobile}
            activeIndex={activeIndex}
          />
        );
      case 2:
        return (
          <TransferRightComponent
            setIsOpen={setIsOpen}
            isMobile={isMobile}
            activeIndex={activeIndex}
          />
        );
      default:
        return null;
    }
  };

  const sidebarNavItems: SidebarItem[] = [
    {
      title: "SIMply",
      icon: null,
    },
    {
      title: "Vape Jucce",
      icon: null,
    },
    { title: "Paypal", icon: null },
  ];

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="profile-header-section">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mx-auto gap-6 pb-7 lg:pb-7 pt-7 sm:pt-7 md:pt-7 lg:pt-7 px-4 sm:px-5 md:px-8 lg:px-[60px]">
            <div className="flex justify-center items-center flex-wrap lg:flex-nowrap">
              <div className="lg:basis-[50%]">
                <Image
                  className="w-auto h-[200px] lg:h-[369px]"
                  src={images.transferHero}
                  alt="hero"
                />
              </div>
              <div className="lg:basis-[50%]">
                <h1 className="text-[26px] leading-8 lg:leading-14 text-center lg:text-left lg:text-[42px] font-bold">
                  Transfer your funds to your FAVOURITE account
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto w-full">
        <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
          {/* <Breadcrumb /> */}
          <div className="flex-1 space-y-4 py-12">
            <div className="flex flex-col md:flex-row gap-4">
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
      <PaypalModal isOpen={isOpen} handleClose={handleCloseModal} />
    </>
  );
};

export default Transfer;
