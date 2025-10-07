import React, { useState } from "react";
import { Button } from "@/components/ui/ButtonUI";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/components/images";
import { homepageLabels, commonLabels } from "@/lib/labels";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/pages/login-form/LoginForm";
import RegistrationForm from "@/components/pages/registration-form/RegistrationForm";
import ResetPassword from "@/components/pages/reset-password/ResetPasswordForm";

export default function HeroSection() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  return (
    <>
      <section className="header-section">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center py-10 lg:py-16 px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
            {/* Left Content (Title, Image, Buttons, Find Out More) */}
            <div className="order-1 lg:order-1 space-y-2 sm:space-y-8">
              <h1 className="text-[28px] md:text-[52px] font-bold leading-tight text-center md:text-left">
                {homepageLabels.hero.titleOne}
                <br />
                {homepageLabels.hero.titleTwo}
              </h1>

              {/* Image shown below title in mobile */}
              <div className="flex justify-center lg:hidden mb-8">
                <Image
                  src={images.productOne}
                  width={259}
                  height={282}
                  alt="product image"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center lg:justify-start bg-cover bg-center">
                <div className="space-y-4 text-center">
                  {/* Buttons & OR */}
                  <div className="flex sm:flex-row gap-2 sm:gap-4 items-center justify-center mb-2 sm:mb-4">
                    <Button
                      size="lg"
                      className="btn px-8 py-2 text-[11px] sm:px-12 sm:py-7 sm:text-[16px] font-bold border-[var(--color-white)] rounded-[50px]"
                      onClick={() => setLoginOpen(true)}
                    >
                      {commonLabels.loginCaps}
                    </Button>
                    <span className="text-[9px] sm:text-[16px] font-bold text-[var(--color-white)]">
                      {commonLabels.or}
                    </span>
                    <Button
                      size="lg"
                      className="btn px-8 py-2 text-[11px] sm:px-12 sm:py-7 sm:text-[16px] font-bold border-[var(--color-white)] rounded-[50px]"
                      onClick={() => setSignUpOpen(true)}
                    >
                      {commonLabels.signUpCaps}
                    </Button>
                  </div>

                  {/* Lost password */}
                  <div>
                    {/* <Link
                      href="/forgot-password"
                      className="text-[12px] sm:text-sm text-[var(--color-white)]/80 hover:text-[var(--color-white)] underline"
                    > */}
                    {/* </Link> */}
                    <a
                      className="text-[12px] sm:text-[16px] font-semibold text-[var(--color-white)] hover:text-[var(--color-white)] cursor-pointer"
                      onClick={() => setResetPasswordOpen(true)}
                    >
                      {homepageLabels.hero.lostPassword}
                    </a>
                  </div>
                </div>
              </div>

              {/* Find Out More Section */}
              <div className="relative mt-12 flex justify-center lg:justify-start">
                <div className="w-full lg:w-[392px] border border-[#D9D9D940] rounded-[15px] sm:rounded-[20px] pt-1 sm:pt-3 px-10 sm:px-4 md:px-6 pb-3 sm:pb-6">
                  {/* Modified label with better positioning and styling */}
                  <div className="absolute px-2 text-[var(--color-white)] font-normal text-[10px] sm:text-[16px] -mt-3 sm:-mt-6 -ml-2 sm:ml-5 bg-[#7c3176] sm:bg-[#773277]">
                    {homepageLabels.hero.findOutMore}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {[
                      {
                        icon: images.broucher,
                        title: homepageLabels.hero.latestBrochure,
                        link: "#",
                      },
                      {
                        icon: images.contactUs,
                        title: homepageLabels.hero.contactUs,
                        link: "#",
                      },
                    ].map(({ icon, title, link }, index) => (
                      <Link
                        key={index}
                        href={link}
                        className="flex flex-col items-center text-center rounded-[12px] hover:bg-[var(--color-white)]/20 transition px-1"
                      >
                        <div className="w-[30px] h-[30px] sm:w-[48px] sm:h-[48px] flex items-center justify-center">
                          <Image
                            src={icon}
                            alt={`Icon ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="mt-2 text-[11px] sm:text-[14px] font-bold uppercase tracking-wide leading-tight text-[var(--color-white)] text-center">
                          {title}
                        </div>
                        <div className="text-[8px] sm:text-[11px] text-[var(--color-white)]/80 underline mt-1">
                          {homepageLabels.hero.clickHere}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Desktop only Image */}
            <div className="order-2 lg:order-2 hidden lg:flex justify-center">
              <Image
                src={images.productOne}
                width={422}
                height={458}
                alt="product image"
              />
            </div>
          </div>

          <div className="pb-10 lg:pb-16 px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
            <div className="max-w-7xl mx-auto">
              <div className="border-2 border-[var(--color-white)] justify-items-center rounded-3xl p-6 pb-0 sm:p-5 shadow-lg bg-[var(--color-white)]/5">
                <h2 className="text-[24px] lg:text-[30px] font-bold text-center mb-5 sm:mb-3 uppercase tracking-wide">
                  {homepageLabels.loginFeatures.title}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-4 sm:gap-0">
                  {[
                    {
                      img: images.bankStagementNew,
                      label: homepageLabels.loginFeatures.seeLatestStatement,
                    },
                    {
                      img: images.badge_new,
                      label: homepageLabels.loginFeatures.checkClaimRewards,
                    },
                    {
                      img: images.liquidNew,
                      label: homepageLabels.loginFeatures.orderVapeProducts,
                    },
                    {
                      img: images.simToolkitNew,
                      label: homepageLabels.loginFeatures.orderSims,
                    },
                    {
                      img: images.commissionNew,
                      label: homepageLabels.loginFeatures.claimSuperBonus,
                    },
                    {
                      img: images.dualSim,
                      label: homepageLabels.loginFeatures.checkSimCard,
                    },
                  ].map(({ img, label }, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-start text-center min-h-[120px] px-0"
                    >
                      <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] flex items-center justify-center">
                        <Image
                          src={img}
                          alt="feature icon"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="mt-3 text-[13px] sm:text-[17px] font-semibold uppercase tracking-wide leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <LoginForm
          setLoginClose={setLoginOpen}
          setSignUpOpen={setSignUpOpen}
          setResetPasswordOpen={setResetPasswordOpen}
        />
      </Modal>
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
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
