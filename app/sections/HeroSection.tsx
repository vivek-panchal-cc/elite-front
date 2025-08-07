import React, { useState } from "react";
import { Button } from "@/components/ui/ButtonUI";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/components/images";
import { homepageLabels, commonLabels } from "@/lib/labels";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/pages/login-form/LoginForm";
import RegistrationForm from "@/components/pages/registration-form/RegistrationForm";

export default function HeroSection() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  return (
    <>
      <section className="header-section">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10 lg:py-16 px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
            {/* Left Content (Title, Image, Buttons, Find Out More) */}
            <div className="order-1 lg:order-1 space-y-8">
              <h1 className="text-[28px] md:text-[52px] font-bold leading-tight text-center md:text-left">
                {homepageLabels.hero.title}
              </h1>

              {/* Image shown below title in mobile */}
              <div className="flex justify-center lg:hidden">
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
                  <div className="flex sm:flex-row gap-2 sm:gap-4 items-center justify-center">
                    <Button
                      size="lg"
                      className="btn px-8 py-2 text-[15px] sm:px-12 sm:py-7 sm:text-lg border-white rounded-[50px]"
                      onClick={() => setLoginOpen(true)}
                    >
                      {commonLabels.login}
                    </Button>
                    <span className="text-[15px] sm:text-xl font-medium text-white">
                      {commonLabels.or}
                    </span>
                    <Button
                      size="lg"
                      className="btn px-8 py-2 text-[15px] sm:px-12 sm:py-7 sm:text-lg border-white rounded-[50px]"
                      onClick={() => setSignUpOpen(true)}
                    >
                      {commonLabels.signUp}
                    </Button>
                  </div>

                  {/* Lost password */}
                  <div>
                    <Link
                      href="/forgot-password"
                      className="text-[12px] sm:text-sm text-white/80 hover:text-white underline"
                    >
                      {homepageLabels.hero.lostPassword}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Find Out More Section */}
              <div className="relative mt-12 flex justify-center lg:justify-start">
                <div className="w-full lg:w-[392px] border border-white/30 rounded-[15px] pt-3 px-2 sm:px-4 md:px-6 pb-6 bg-white/5">
                  {/* Modified label with better positioning and styling */}
                  <div className="absolute px-2 text-white font-semibold text-md">
                    {homepageLabels.hero.findOutMore}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-10">
                    {[
                      {
                        icon: images.broucher,
                        title: homepageLabels.hero.latestBrochure,
                        link: "/brochure",
                      },
                      {
                        icon: images.contactUs,
                        title: homepageLabels.hero.contactUs,
                        link: "/contact",
                      },
                    ].map(({ icon, title, link }, index) => (
                      <Link
                        key={index}
                        href={link}
                        className="flex flex-col items-center text-center rounded-[12px] hover:bg-white/20 transition px-1"
                      >
                        <div className="w-[30px] h-[30px] sm:w-[48px] sm:h-[48px] flex items-center justify-center">
                          <Image
                            src={icon}
                            alt={`Icon ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="mt-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-wide leading-tight text-white text-center">
                          {title}
                        </div>
                        <div className="text-[11px] sm:text-sm text-white/80 underline mt-1">
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
              <div className="border border-white rounded-2xl p-6 sm:p-5 shadow-lg bg-white/5">
                <h2 className="text-[24px] lg:text-[30px] font-bold text-center mb-8 sm:mb-10 uppercase tracking-wide">
                  {homepageLabels.loginFeatures.title}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-4 sm:gap-8">
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
                      className="flex flex-col items-center justify-start text-center min-h-[120px] px-2"
                    >
                      <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] flex items-center justify-center">
                        <Image
                          src={img}
                          alt="feature icon"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="mt-3 text-[13px] sm:text-[14px] font-semibold uppercase tracking-wide leading-tight">
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
        <LoginForm setLoginClose={setLoginOpen} setSignUpOpen={setSignUpOpen} />
      </Modal>
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        classStyle=""
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <RegistrationForm setRegistrationClose={setSignUpOpen} />
      </Modal>
    </>
  );
}
