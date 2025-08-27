import { images } from "@/components/images";
import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import React from "react";

const PaypalModal = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} classStyle="" isClose={false}>
      {/* border-[1.5px] border-[var(--color-red)] */}
      <div className="relative h-[96px] text-white bg-[#10499E] text-center flex items-center justify-center">
        <h4 className="text-[28px] md:text-[34px] font-bold">PAYPAL</h4>
        <Button
          variant="ghost"
          size="icon"
          className="mt-[10px] mr-[10px] border text-white h-[20px] w-[20px] rounded-[50px] absolute top-2 right-2 right-2 text-2xl"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </Button>
      </div>
      <div className="p-5 md:px-13 md:py-8 max-w-[809px]">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-4 md:gap-y-8`}
        >
          <div className="space-y-1">
            <Label className="font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
              Available Balance
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
              // value={formCompany.companyName}
              placeholder="Available Balance"
              // onChange={(e) =>
              //   handleInputChange("companyName", e.target.value)
              // }
            />
          </div>

          {/* Address 1 */}
          <div className="space-y-1">
            <Label className="font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
              Transfer Amount
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
              // value={formCompany.companyName}
              placeholder="Transfer Amount"
              // onChange={(e) =>
              //   handleInputChange("companyName", e.target.value)
              // }
            />
          </div>

          <div className="space-y-1">
            <Label className="font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
              Paypal fee
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
              // value={formCompany.companyName}
              placeholder="Paypal fee"
              // onChange={(e) =>
              //   handleInputChange("companyName", e.target.value)
              // }
            />
          </div>

          <div className="space-y-1">
            <Label className="font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
              Receivable Amount
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
              // value={formCompany.companyName}
              placeholder="Receivable Amount"
              // onChange={(e) =>
              //   handleInputChange("companyName", e.target.value)
              // }
            />
          </div>

          <div className="space-y-1">
            <Label className="font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
              Email Address
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
              // value={formCompany.companyName}
              placeholder="Email Address"
              // onChange={(e) =>
              //   handleInputChange("companyName", e.target.value)
              // }
            />
          </div>

          <div className="space-y-1">
            <Label className="font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
              Confirm Email Address
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
              // value={formCompany.companyName}
              placeholder="Confirm Email Address"
              // onChange={(e) =>
              //   handleInputChange("companyName", e.target.value)
              // }
            />
          </div>
        </div>
        <div className="w-auto text-[12px] text-neutral-500 flex flex-col gap-2 mt-5">
          <p>Please note: </p>
          <p>
            You must pay the PayPal charges at a rate of 3.4% of the transfer
            amount plus 30p per transaction. All PayPal credits will be subject
            to eligibility checks before your account will be credited.Once
            approved, transfers can take up to 3 days to complete and will show
            as pending until we confirm or cancel your request to transfer your
            requested amount to your PayPal account.
          </p>
          <p>
            By requesting the transfer below, you are confirming that you are
            happy for Elite Mobile Limited to raise a Self Bill on your account.
            You will be responsible for any tax and VAT amounts payable, you
            agree to notify HMRC of such income.
          </p>
        </div>
        <div className="text-center flex justify-center mt-3">
          <Image src={images.paypalButton} alt={"paypal"} />
        </div>
      </div>
    </Modal>
  );
};

export default PaypalModal;
