import React from "react";
import { commonLabels } from "@/lib/labels";
import CheckCircle from "../images/svgs/CheckCircle";
import { Button } from "../ui/ButtonUI";

interface AlertModalProps {
  setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  headerMsg?: string;
  message?: string;
  btnLabel?: string;
  handleCallback: () => void;
  icon?: React.ReactNode;
}

const AlertModal = ({
  setModalClose,
  headerMsg,
  message,
  btnLabel = commonLabels.okay,
  handleCallback,
  icon,
}: AlertModalProps) => {
  return (
    <>
      <div className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg p-6 md:p-8 space-y-4 mx-auto">
        {icon && <div className="mx-auto mb-4 flex justify-center">{icon}</div>}
        <h2 className="text-center text-xl font-bold mb-2 text-[var(--color-blue)] pt-5">
          {headerMsg}
        </h2>
        <p className="text-center mb-2 text-[var(--color-black)]">{message}</p>
        <Button
          type="button"
          className="w-full mt-4 rounded-[50px]"
          onClick={handleCallback}
        >
          {btnLabel}
        </Button>
      </div>
    </>
  );
};

export default AlertModal;
