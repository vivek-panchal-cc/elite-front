import React, { useEffect, useState } from "react";
import { footerLabels } from "@/lib/labels";
import { Button } from "@/components/ui/ButtonUI";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/pages/login-form/LoginForm";
import ResetPassword from "@/components/pages/reset-password/ResetPasswordForm";
import RegistrationForm from "@/components/pages/registration-form/RegistrationForm";
import useIsMobile from "@/hooks/useIsMobile";

export default function OffersHeader() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <>
      <section
        className={`${
          !isMobile ? "offers-header-section" : "offers-header-section-mobile"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div
            className={`mx-auto gap-6 py-14 sm:py-16 md:py-20 lg:py-22 px-4 sm:px-5 md:px-8 lg:px-[60px] ${
              !isMobile ? "leading-[45px]" : "leading-[32px]"
            }`}
          >
            {!isMobile ? (
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-start font-bold pl-[60%]">
                {footerLabels.offers.exclusiveOffersFor}
              </p>
            ) : (
              <p className="text-[32px] sm:text-3xl md:text-4xl lg:text-[42px] text-center font-bold">
                {footerLabels.offers.exclusiveOffersFor}
              </p>
            )}

            {!isMobile ? (
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-start text-[var(--color-red)] font-bold pl-[60%]">
                {footerLabels.offers.eliteMobileRetailer}
              </p>
            ) : (
              <p className="text-[32px] sm:text-3xl md:text-4xl lg:text-[42px] text-center text-[var(--color-red)] font-bold">
                {footerLabels.offers.eliteMobileRetailer}
              </p>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="bg-[var(--color-blue)] mx-auto flex flex-col items-center justify-center py-10 sm:py-12 md:py-12 lg:py-12 px-4 sm:px-5 md:px-8 lg:px-[25%]">
          <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-center text-[var(--color-white)]">
            {footerLabels.offers.secondFooterMsg}
          </p>
          <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-center text-[var(--color-white)] font-bold py-3">
            {footerLabels.offers.secondFooterHeader}
          </p>
          <Button
            className="px-8 w-fit bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] rounded-[50px]"
            onClick={() => {
              setLoginOpen(true);
            }}
          >
            {footerLabels.offers.secondFooterButton}
          </Button>
        </div>
      </section>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        // classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        classStyle="w-[444px]"
        isClose={true}
      >
        <LoginForm
          setLoginClose={setLoginOpen}
          setSignUpOpen={setSignUpOpen}
          setResetPasswordOpen={setResetPasswordOpen}
        />
      </Modal>
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        classStyle="w-full max-w-[600px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px] xl:max-w-[600px]"
        isClose={true}
      >
        <RegistrationForm
          setRegistrationClose={setSignUpOpen}
          setLogin={setLoginOpen}
        />
      </Modal>
      <Modal
        isOpen={resetPasswordOpen}
        onClose={() => setResetPasswordOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <ResetPassword setLoginClose={setResetPasswordOpen} />
      </Modal>
    </>
  );
}
