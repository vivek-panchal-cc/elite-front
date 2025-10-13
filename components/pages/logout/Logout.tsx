import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/ButtonUI";
import { commonLabels, logoutLabels } from "@/lib/labels";
import { images } from "@/components/images";
import Image from "next/image";
import { removeToken } from "@/lib/utils";
import { useAuthContext } from "@/lib/AuthProvider";

const Logout = ({
  setLogoutOpen,
}: {
  setLogoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useAuthContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setShowConfirmModal(true);
    setTimeout(async () => {
      await setLogoutOpen(false);
    }, 2500);
    router.push("/logout");
  };

  return (
    <div className="w-full max-w-[600px] bg-[var(--color-white)] rounded-lg py-8 md:py-12 px-4 md:px-10 mx-auto">
      {!showConfirmModal ? (
        <>
          <h2 className="text-lg md:text-xl font-semibold text-[var(--color-gray)] text-center sm:text-left leading-[26px] sm:leading-[24px]">
            <span className="text-[22px] sm:text-[25px] font-bold text-[var(--color-blue)]">
              {logoutLabels.areYouSure}
            </span>
            <span className="text-[22px] sm:text-[25px] text-[var(--color-red)] font-bold">
              {logoutLabels.logoutRed}?
            </span>
          </h2>

          <p className="text-[12px] sm:text-[14px] text-[var(--color-gray)] text-center sm:text-left mt-1 sm:mt-3 leading-[19px] font-medium">
            {logoutLabels.logoutMessage}
          </p>

          <div className="flex flex-col md:flex-row w-full gap-3 sm:gap-4 mt-6 sm:mt-12">
            <Button
              className="w-full md:flex-1 bg-[var(--color-red)] hover:bg-[var(--color-red)] text-[var(--color-white)] py-2 rounded-full font-semibold text-[15px] leading-[24px]"
              onClick={handleLogout}
            >
              {logoutLabels.logoutConfirm}
            </Button>
            <Button
              className="w-full md:flex-1 bg-[var(--color-blue)] text-[var(--color-white)] py-2 rounded-full font-semibold text-[15px] leading-[24px]"
              onClick={() => setLogoutOpen(false)}
            >
              {commonLabels.cancel}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 text-center px-4 sm:px-20 py-4 sm:py-0">
          <Image src={images.rightTick} alt="right" className="shrink-0" />
          <h2 className="text-[18px] sm:text-[25px] font-bold text-[var(--color-blue)]">
            {logoutLabels.logoutSuccessMessage}
          </h2>
          {/* <Button
            className="bg-[var(--color-blue)] hover:bg-blue-800 text-[var(--color-white)] py-2 px-6 rounded-full font-medium"
            onClick={() => {
              setShowConfirmModal(false);
              setLogoutOpen(false); // close entire modal after confirmation
            }}
          >
            {commonLabels.okay}
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default Logout;
