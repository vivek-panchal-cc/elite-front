import React, { useEffect, useState } from "react";
import { images } from "@/components/images";
import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import { profileLabels, transferLabels } from "@/lib/labels";
import Image, { StaticImageData } from "next/image";
import { CURRENCY_SYMBOL } from "@/lib/constants/all";
import { useLoader } from "@/components/providers/loader-provider";
import { apiRequest } from "@/lib/apiRequest";
import { toast } from "sonner";
import Phone from "@/components/images/svgs/Phone";
import Mail from "@/components/images/svgs/Mail";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import IconTryAgain from "@/components/images/svgs/TryAgain";

type FlagType = {
  gcerpid: string | null;
  paypal_transfer_eligible: string | null;
  simply_user_ref: string | null;
};

const content: {
  [key: number]: {
    image: StaticImageData;
    title: string;
    description: string;
    flagKey: keyof FlagType;
    setAmount?: React.Dispatch<React.SetStateAction<string>>;
  };
} = {
  0: {
    image: images.simplyElite,
    title: transferLabels.simplyTitle,
    description: transferLabels.simplyDesc,
    flagKey: "simply_user_ref",
  },
  1: {
    image: images.vapeJucceAc,
    title: transferLabels.vapeJucceTitle,
    description: transferLabels.vapeJucceDesc,
    flagKey: "gcerpid",
  },
  2: {
    image: images.paypal,
    title: transferLabels.paypalTitle,
    description: transferLabels.paypalDesc,
    flagKey: "paypal_transfer_eligible",
  },
};

const TransferRightComponent = ({
  isMobile,
  activeIndex = 0,
  setIsOpen,
  flag,
  setAmount,
}: {
  isMobile: boolean;
  activeIndex: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  flag: FlagType;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { dealer } = useAuthStoreWithAutoRefresh();
  const [amountInput, setAmountInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setIsLoading } = useLoader();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(CURRENCY_SYMBOL, "");
    val = val.replace(/[^0-9.]/g, "");

    const parts = val.split(".");
    if (parts.length > 2) {
      val = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[1]?.length > 2) {
      val = parts[0] + "." + parts[1].slice(0, 2);
    }
    setAmountInput(val);
    if (errorMessage) setErrorMessage("");
  };

  const handlePayment = async () => {
    const amount = parseFloat(amountInput);
    if (isNaN(amount)) return;
    if (dealer && amount > dealer.current_amount_bal) {
      setErrorMessage(
        `Amount cannot exceed ${CURRENCY_SYMBOL}${dealer.current_amount_bal}`
      );
      return;
    } else {
      setErrorMessage("");
    }

    setIsLoading(true);
    try {
      let response;
      switch (activeIndex) {
        case 0:
          response = await apiRequest.transferSimply({
            transfer_amount: parseFloat(amountInput),
          });
          break;
        case 1:
          response = await apiRequest.transferGCERP({
            transfer_amount: parseFloat(amountInput),
          });
          break;
        case 2:
          setAmount(amountInput);
          setIsOpen(true);
          setIsLoading(false);
          setAmountInput("");
          return;
        default:
          return toast.error("Invalid tab selection");
      }
      if (!response.data.success) throw response.data.message;
      toast.success(response.data.message);
      setAmountInput("");
    } catch (error: any) {
      if (typeof error === "string") return toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAmountInput("");
    setErrorMessage("");
  }, [activeIndex]);

  const currentContent = content[activeIndex];
  const flagValue = flag[currentContent.flagKey];

  const eligibilityRules: Record<
    keyof FlagType,
    (val: string | null) => boolean
  > = {
    simply_user_ref: (val) => !!val && val.trim() !== "",
    gcerpid: (val) => !!val && val.trim() !== "",
    paypal_transfer_eligible: (val) => val === "1",
  };

  const isEligible = eligibilityRules[currentContent.flagKey](flagValue);

  return (
    <div className={`${isMobile ? "w-[95%] mx-auto" : "w-[90%]"}`}> {/* w-3/4 */}      
      <div
        className={`border-[2px] border-[var(--color-red)] ${
          isMobile ? "border-t-0 rounded-t-none rounded-b-xl" : "rounded-xl"
        } ${
          isEligible
            ? "px-6 py-6 sm:py-8 md:py-12 md:px-20"
            : "px-6 py-6 sm:py-8 md:py-8 md:px-20"
        } bg-[var(--color-light-gray)] shadow-sm`}
      >
        {isEligible ? (
          <div className="flex flex-wrap lg:flex-nowrap gap-5 md:gap-4 lg:gap-14 justify-center text-center lg:text-left">
            {/* <div> */}
            <Image
              className="h-[80px] md:h-auto w-auto"
              src={content[activeIndex].image}
              alt="transfer-img"
            />
            {/* </div> */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h4
                className="text-[18px] md:text-[29px] font-bold leading-[18px] sm:leading-[30px]"
                dangerouslySetInnerHTML={{ __html: content[activeIndex].title }}
              >
                {/* {content[activeIndex].title} */}
              </h4>
              <p className="text-[14px] leading-[14px] sm:leading-[18px] mb-2 sm:mb-0 font-medium capitalize">
                {content[activeIndex].description}
              </p>
              <div className="flex gap-2 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    className="max-h-[28px] lg:max-h-[37px] bg-[var(--color-white)] border-[1.5px] border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px] text-[12px] sm:text-[14px]"
                    type="text"
                    value={`${CURRENCY_SYMBOL} ${amountInput}`}
                    onChange={handleAmountChange}
                  />
                  {errorMessage && (
                    <p className="text-[12px] text-[var(--color-red)] font-medium">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <Button
                  className="min-w-[76px] max-h-[28px] lg:min-w-[118px] lg:max-h-[37px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] sm:text-[14px] font-medium leading-[40px]"
                  onClick={handlePayment}
                  disabled={
                    parseFloat(amountInput) < 10 ||
                    isNaN(parseFloat(amountInput))
                  }
                >
                  {transferLabels.submit}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 text-center">
              {/* <p className="text-[22px] md:text-[32px] font-bold text-[var(--color-blue)]">
                {activeIndex === 0
                  ? transferLabels.transSimplyHeader
                  : activeIndex === 1
                  ? transferLabels.transEliquidHead
                  : activeIndex === 2
                  ? transferLabels.transPaypalHead
                  : ""}
              </p> */}
              <div className="flex justify-center items-center">
                <IconTryAgain className="w-[62px] h-[57px]" />
              </div>
              {/* <div className="bg-[var(--color-white)] rounded-xl shadow-lg pb-3 sm:pb-4 text-center flex flex-col justify-center text-[var(--color-black)]"> */}
              <div className="pb-3 sm:pb-4 text-center flex flex-col justify-center text-[var(--color-black)]">
                {/* <p className="card-list-border-top text-[18px] sm:text-[20px] text-[var(--color-white)] font-semibold rounded-t-xl p-2 mb-2">
                  {activeIndex === 0
                    ? transferLabels.transSimplySubHead
                    : activeIndex === 1
                    ? transferLabels.transEliquidSubHead
                    : activeIndex === 2
                    ? transferLabels.transPaypalSubHead
                    : ""}
                </p> */}
                <p className="text-[14px] sm:text-[16px] font-bold sm:font-semibold leading-[18px] sm:leading-[20px] px-3">
                  {activeIndex === 0
                    ? transferLabels.transSimplyDesc
                    : activeIndex === 1
                    ? transferLabels.transEliquidDesc
                    : activeIndex === 2
                    ? transferLabels.transPaypalDesc
                    : ""}
                </p>
              </div>
              {/* <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4 text-center flex flex-col justify-center text-[var(--color-black)]"> */}
              <div className="p-3 sm:p-4 pb-0 sm:pb-0 text-center flex flex-col justify-center text-[var(--color-black)]">
                <p className="text-[12px] sm:text-[12px] leading-[17px] font-medium mb-3 text-[var(--color-black)]/80">
                  {transferLabels.trasnferCommonFooter}
                </p>
                <span className="">
                  <div className="flex flex-col lg:flex-row gap-2 w-full lg:px-24">
                    <a
                      href={`tel:${profileLabels.profilePhone}`}
                      className="flex items-center justify-center gap-2 bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] text-xs sm:text-sm md:text-[12px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full h-[29px] w-full"
                    >
                      <Phone fill="var(--color-white)" />
                      {profileLabels.profilePhone}
                    </a>
                    <a
                      href={`mailto:${profileLabels.profileEmail}`}
                      className="flex items-center justify-center gap-2 bg-[var(--color-dark-blue)] hover:bg-primary/90 text-[var(--color-white)] text-xs sm:text-sm md:text-[12px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full h-[29px] w-full"
                    >
                      <Mail fill="var(--color-white)" />
                      {profileLabels.profileEmail}
                    </a>
                  </div>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransferRightComponent;
