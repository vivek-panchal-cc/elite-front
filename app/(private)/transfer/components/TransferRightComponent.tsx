import { images } from "@/components/images";
import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";
import React from "react";

const content: {
  [key: number]: {
    image: StaticImageData;
    title: string;
    description: string;
  };
} = {
  0: {
    image: images.simplyElite,
    title: "Transfer to Your SIMply Account",
    description:
      "How much would you like to transfer from your rewards account to SIMply?",
  },
  1: {
    image: images.vapeJucceAc,
    title: "Transfer to Your Vape Jucce Account",
    description:
      "How much would you like to transfer from your rewards account to Vape Jucce?",
  },
  2: {
    image: images.paypal,
    title: "Transfer to Your paypal Account",
    description:
      "How much would you like to transfer from your rewards account to Paypal?",
  },
};

const TransferRightComponent = ({
  isMobile,
  activeIndex = 0,
  setIsOpen,
}: {
  isMobile: boolean;
  activeIndex: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"}`}>
      <div
        className={`border-[2px] border-[var(--color-red)] ${
          isMobile ? "border-t-0 rounded-t-none rounded-b-xl" : "rounded-xl"
        } px-6 py-6 sm:py-8 md:py-12 md:px-20 bg-[var(--color-light-gray)] shadow-sm`}
      >
        <div className="flex flex-wrap lg:flex-nowrap gap-5 md:gap-14 justify-center text-center lg:text-left">
          <div>
            <Image
              className="h-[80px] md:h-auto w-auto"
              src={content[activeIndex].image}
              alt="transfer-img"
            />
          </div>
          <div className="flex flex-col gap-2  md:gap-4">
            <h4 className="text-[18px] md:text-[29px] font-bold leading-[30px]">
              {content[activeIndex].title}
            </h4>
            <p className="text-[14px]">{content[activeIndex].description}</p>
            <div className="flex gap-2 md:gap-4">
              <Input
                className="max-h-[28px] lg:max-h-[37px] bg-[var(--color-white)] border-[1.5px] border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                //   value={}
                //   onChange={(e) =>
                //     handleInputChange("companyName", e.target.value)
                //   }
              />
              <Button
                className="min-w-[76px] max-h-[28px] lg:min-w-[118px] lg:max-h-[37px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-sm font-normal"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferRightComponent;
