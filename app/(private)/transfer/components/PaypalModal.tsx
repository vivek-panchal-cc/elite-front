import { images } from "@/components/images";
import { useLoader } from "@/components/providers/loader-provider";
import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import { apiRequest } from "@/lib/apiRequest";
import { CURRENCY_SYMBOL } from "@/lib/constants/all";
import { transferLabels } from "@/lib/labels";
import { transferSchema } from "@/lib/validations/transferSchema";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import { Transfer } from "@/types/payments";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "sonner";

const PaypalModal = ({
  isOpen,
  handleClose,
  amount,
}: {
  isOpen: boolean;
  handleClose: () => void;
  amount: number | string;
}) => {
  const { dealer, reloadUser, setReloadUser } = useAuthStoreWithAutoRefresh();
  const { setIsLoading } = useLoader();

  const formik = useFormik<Transfer>({
    enableReinitialize: true,
    initialValues: {
      paypal_email: "",
      confirm_paypal_email: "",
      transfer_amount: Number(amount) || 0,
      avaialble_balance: dealer?.current_amount_bal
        ? Number(((dealer.current_amount_bal - 0.2) / 1.034).toFixed(2))
        : 0,
      paypal_fee: 0,
      receivable_amount: 0,
    },
    validationSchema: transferSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setIsLoading(true);
      try {
        const { data } = await apiRequest.transferPaypal({
          transfer_amount: values.transfer_amount,
          paypal_email: values.paypal_email,
        });
        if (!data.success) throw data.message;
        toast.success(data.message);
        setReloadUser(!reloadUser);
        handleCloseModal();
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const transferAmount = Number(formik.values.transfer_amount || 0);
    const fee = Number(((transferAmount * 3.4) / 100 + 0.3).toFixed(2));
    const receivable = Number((transferAmount - fee).toFixed(2));

    formik.setFieldValue("paypal_fee", fee, false);
    formik.setFieldValue("receivable_amount", receivable, false);
  }, [formik.values.transfer_amount]);

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };

  const readOnlyInputClass =
    "w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px] text-[12px] sm:text-[14px] cursor-not-allowed";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      classStyle="overflow-y-auto max-h-[90vh]"
      isClose={false}
    >
      <div className="sticky top-0 z-20 h-[96px] text-white bg-[var(--color-blue)] text-center flex items-center justify-center">
        <h4 className="text-[28px] md:text-[34px] font-bold">
          {transferLabels.ppModal}
        </h4>
        <Button
          variant="ghost"
          size="icon"
          className="mt-[10px] mr-[10px] border text-white h-[20px] w-[20px] rounded-[50px] absolute top-2 right-2 text-2xl"
          onClick={handleCloseModal}
          aria-label="Close"
        >
          &times;
        </Button>
      </div>
      <form
        className="p-5 md:px-13 md:py-8 max-w-[809px] bg-[var(--color-light-gray)]"
        onSubmit={formik.handleSubmit}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-4 md:gap-y-8`}
        >
          <div className="space-y-1">
            <Label className="font-medium text-sm sm:text-base md:text-base text-[var(--color-black)]">
              {transferLabels.ppAvailBal}
            </Label>
            <Input
              className={`${readOnlyInputClass} font-bold !text-[18px] sm:!text-[22px]`}
              name="avaialble_balance"
              placeholder="Available Balance"
              value={`${CURRENCY_SYMBOL}${formik.values.avaialble_balance}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.avaialble_balance &&
                formik.errors.avaialble_balance
              }
              readOnly
            />
          </div>

          <div className="space-y-1">
            <Label className="font-medium text-sm sm:text-base md:text-base text-[var(--color-black)]">
              {transferLabels.ppTransAmt}
            </Label>
            <Input
              className={readOnlyInputClass}
              name="transfer_amount"
              value={`${CURRENCY_SYMBOL}${
                formik.values.transfer_amount || amount
              }`}
              placeholder="Transfer Amount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.transfer_amount && formik.errors.transfer_amount
              }
              readOnly
            />
          </div>

          <div className="space-y-1">
            <Label className="font-medium text-sm sm:text-base md:text-base text-[var(--color-black)]">
              {transferLabels.ppFee}
            </Label>
            <Input
              className={readOnlyInputClass}
              placeholder="Paypal fee"
              name="paypal_fee"
              value={`${CURRENCY_SYMBOL}${(
                (Number(formik.values.transfer_amount) * 3.4) / 100 +
                0.3
              ).toFixed(2)}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.paypal_fee && formik.errors.paypal_fee}
              readOnly
            />
          </div>

          <div className="space-y-1">
            <Label className="font-medium text-sm sm:text-base md:text-base text-[var(--color-black)]">
              {transferLabels.ppRecAmt}
            </Label>
            <Input
              className={readOnlyInputClass}
              placeholder="Receivable Amount"
              name="receivable_amount"
              value={`${CURRENCY_SYMBOL}${(
                Number(formik.values.transfer_amount) -
                ((Number(formik.values.transfer_amount) * 3.4) / 100 + 0.3)
              ).toFixed(2)}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.receivable_amount &&
                formik.errors.receivable_amount
              }
              readOnly
            />
          </div>

          <div className="space-y-1">
            <Label className="font-medium text-sm sm:text-base md:text-base text-[var(--color-black)]">
              {transferLabels.ppEmail}
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px] text-[12px] sm:text-[14px]"
              value={formik.values.paypal_email}
              name="paypal_email"
              placeholder="Email Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.paypal_email && formik.errors.paypal_email}
            />
          </div>

          <div className="space-y-1">
            <Label className="font-medium text-sm sm:text-base md:text-base text-[var(--color-black)]">
              {transferLabels.ppEmailConfirm}
            </Label>
            <Input
              className="w-[100%] lg:w-[334px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px] text-[12px] sm:text-[14px]"
              name="confirm_paypal_email"
              value={formik.values.confirm_paypal_email}
              placeholder="Confirm Email Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirm_paypal_email &&
                formik.errors.confirm_paypal_email
              }
            />
          </div>
        </div>
        <div className="w-auto text-[12px] text-neutral-500 flex flex-col gap-2 mt-5">
          <p>{transferLabels.note}</p>
          <p>{transferLabels.note1}</p>
          <p>{transferLabels.note2}</p>
        </div>
        <div className="text-center flex justify-center mt-3">
          <button className="cursor-pointer" type="submit">
            <Image src={images.paypalButton} alt={"paypal"} />
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PaypalModal;
