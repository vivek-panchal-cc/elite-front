import React, { useState } from "react";
import { footerLabels } from "@/lib/labels";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/pages/login-form/LoginForm";
import RegistrationForm from "@/components/pages/registration-form/RegistrationForm";
import ResetPassword from "@/components/pages/reset-password/ResetPasswordForm";

export default function OffersFooter() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  return (
    <>
      <section className="bg-[var(--color-blue)] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[30px] font-bold text-[var(--color-white)] mb-10">
            {footerLabels.offers.footerHeader}
          </h2>

          {/* Stats Grid */}
          <div className="flex flex-wrap justify-evenly sm:justify-center gap-5 sm:gap-10 text-[var(--color-white)]">
            {/* Item 1 */}
            <div className="text-center w-[30%] sm:w-[45%] lg:w-[30%]">
              <p className="number-stroke text-2xl sm:text-3xl md:text-4xl font-bold">
                56,000+
              </p>

              <p className="text-[10px] sm:text-[14px] mt-2">
                Trusted by 56,000+ UK retailers
              </p>
            </div>

            {/* Item 2 */}
            <div className="text-center w-[30%] sm:w-[45%] lg:w-[30%]">
              <p className="number-stroke text-2xl sm:text-3xl md:text-4xl font-bold">
                27,000+
              </p>
              <p className="text-[10px] sm:text-[14px] mt-2">
                Active rewards members
              </p>
            </div>

            {/* Item 3 */}
            <div className="text-center w-[30%] sm:w-[45%] lg:w-[30%]">
              <p className="number-stroke text-2xl sm:text-3xl md:text-4xl font-bold">
                200+
              </p>
              <p className="text-[10px] sm:text-[14px] mt-2">
                Nationwide coverage with 200 vans on the road daily
              </p>
            </div>

            {/* Item 4 */}
            <div className="text-center w-[30%] sm:w-[45%] lg:w-[30%]">
              <p className="number-stroke text-2xl sm:text-3xl md:text-4xl font-bold">
                30+ Years
              </p>
              <p className="text-[10px] sm:text-[14px] mt-2">
                Over 30 years of telecom distribution experience
              </p>
            </div>

            {/* Item 5 */}
            <div className="text-center w-[30%] sm:w-[45%] lg:w-[30%]">
              <p className="number-stroke text-2xl sm:text-3xl md:text-4xl font-bold">
                1:1
              </p>
              <p className="text-[10px] sm:text-[14px] mt-2">
                Dedicated account manager for every retailer
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-white)] mx-auto flex flex-col items-center justify-center px-4 sm:px-5 md:px-8 lg:px-[25%]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mx-auto gap-6 py-10 sm:py-12 md:py-16 lg:py-18 px-4 sm:px-5 md:px-8 lg:px-[60px]">
            <p className="text-[22px] sm:text-[25px] md:text-[28px] lg:text-[30px] text-[var(--color-red)] text-center font-bold">
              {footerLabels.offers.secondFooterHead}
            </p>
            <p className="py-1 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-[var(--color-black)] text-center font-semibold">
              <span
                className="text-[var(--color-blue)] underline cursor-pointer"
                onClick={() => {
                  setLoginOpen(true);
                }}
              >
                {footerLabels.offers.secondFooterLogin}
              </span>{" "}
              {footerLabels.offers.secondFooterLoginMsg}
            </p>
          </div>
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
