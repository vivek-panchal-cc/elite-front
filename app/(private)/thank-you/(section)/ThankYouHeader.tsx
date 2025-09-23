"use client";

import { images } from "@/components/images";
import Image from "next/image";
import { checkoutLabels } from "@/lib/labels";
import Check from "@/components/images/svgs/Check";
import useIsMobile from "@/hooks/useIsMobile";

const ThankYouHeader = () => {
  const isMobile = useIsMobile(796);

  return (
    <section className="profile-header-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 pb-7 pt-7 px-4 sm:px-5 md:px-8 lg:px-[60px]">
          <div className="flex justify-center items-center flex-wrap lg:flex-nowrap">
            {isMobile && (
              <div className="leading-8 lg:leading-10 flex flex-col justify-center items-center gap-2 mb-4">
                <Check className="h-12 w-12" />
                <h1 className="text-[26px] text-center font-bold">
                  <span className="block">{checkoutLabels.thankYou}</span>
                  <span className="block">{checkoutLabels.forYourOrder}</span>
                </h1>
              </div>
            )}

            <div className="lg:basis-[50%] flex justify-center">
              <Image
                className="w-auto"
                src={images.thankYouHeader}
                alt="hero"
              />
            </div>

            {!isMobile && (
              <div className="lg:basis-[50%] leading-8 lg:leading-10 flex flex-col justify-center items-center lg:items-center gap-2 mt-6 lg:mt-0">
                <Check />
                <h1 className="text-[26px] text-center lg:text-center lg:text-[42px] font-bold">
                  <span className="block">{checkoutLabels.thankYou}</span>
                  <span className="block">{checkoutLabels.forYourOrder}</span>
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouHeader;
