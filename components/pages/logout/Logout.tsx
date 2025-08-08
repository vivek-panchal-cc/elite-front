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
    logout();
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg p-6 md:p-8 space-y-4 mx-auto">
      {!showConfirmModal ? (
        <>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-left">
            <span className="text-[var(--color-blue)]">
              {logoutLabels.areYouSure}
            </span>
            <span className="text-[var(--color-red)] font-bold">
              {logoutLabels.logoutRed}?
            </span>
          </h2>

          <p className="text-sm text-gray-600 text-left mt-3">
            {logoutLabels.logoutMessage}
          </p>

          <div className="flex flex-col md:flex-row w-full gap-3 mt-6">
            <Button
              className="w-full md:flex-1 bg-[var(--color-red)] hover:bg-pink-700 text-white py-2 rounded-full font-medium"
              onClick={handleLogout}
            >
              {logoutLabels.logoutConfirm}
            </Button>
            <Button
              className="w-full md:flex-1 bg-[var(--color-blue)] hover:bg-blue-800 text-white py-2 rounded-full font-medium"
              onClick={() => setLogoutOpen(false)}
            >
              {commonLabels.cancel}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Image src={images.rightTick} alt="right" className="shrink-0" />
          <h2 className="text-xl font-bold text-[var(--color-blue)]">
            {logoutLabels.logoutSuccessMessage}
          </h2>
          {/* <Button
            className="bg-[var(--color-blue)] hover:bg-blue-800 text-white py-2 px-6 rounded-full font-medium"
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
