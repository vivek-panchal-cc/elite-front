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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 px-4">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {homepageLabels.hero.title}
              </h1>

              <div className="flex items-center justify-center bg-cover bg-center">
                <div className="space-y-4 text-center">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Button
                      size="lg"
                      className="btn px-8 py-3 text-lg border-white rounded-[50px]"
                      onClick={() => setLoginOpen(true)}
                    >
                      {commonLabels.login}
                    </Button>
                    <span className="text-xl font-medium text-white">
                      {commonLabels.or}
                    </span>
                    <Button
                      size="lg"
                      className="btn px-8 py-3 text-lg border-white rounded-[50px]"
                      onClick={() => setSignUpOpen(true)}
                    >
                      {commonLabels.signUp}
                    </Button>
                  </div>

                  <div>
                    <Link
                      href="/forgot-password"
                      className="text-white/80 hover:text-white underline text-sm"
                    >
                      {homepageLabels.hero.lostPassword}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Find Out More Section */}
              <div className="relative mt-12 flex justify-center">
                <div className="w-full max-w-3xl border border-white/30 rounded-[15px] pt-10 px-6 pb-6 bg-white/5">
                  <div className="absolute -top-0 left-6 px-2 text-white font-semibold text-lg mt-2">
                    {homepageLabels.hero.findOutMore}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <Link
                      href="/brochure"
                      className="flex flex-col items-center text-center space-y-2 pt-2 rounded-[12px] hover:bg-white/20 transition"
                    >
                      <Image
                        src={images.broucher}
                        alt="Brochure Icon"
                        width={48}
                        height={48}
                      />
                      <div className="text-white font-semibold">
                        {homepageLabels.hero.latestBrochure}
                      </div>
                      <div className="text-sm text-white/80 underline">
                        {homepageLabels.hero.clickHere}
                      </div>
                    </Link>

                    <Link
                      href="/contact"
                      className="flex flex-col items-center text-center space-y-2 pt-2 rounded-[12px] hover:bg-white/20 transition"
                    >
                      <Image
                        src={images.contactUs}
                        alt="Contact Icon"
                        width={48}
                        height={48}
                      />
                      <div className="text-white font-semibold">
                        {homepageLabels.hero.contactUs}
                      </div>
                      <div className="text-sm text-white/80 underline">
                        {homepageLabels.hero.clickHere}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative">
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <Image
                  src={images.productOne}
                  width={422}
                  height={458}
                  alt="log img"
                />
              </div>
            </div>
          </div>
          <div className="pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="border border-white rounded-2xl p-10 shadow-lg bg-white/5">
                <h2 className="text-2xl font-bold text-center mb-10 uppercase tracking-wide">
                  {homepageLabels.loginFeatures.title}
                </h2>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  {/* Feature: See Your Latest Statement */}
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Image src={images.bankStagementNew} alt="log img" />
                    <span className="text-xs font-semibold text-center uppercase tracking-wide mt-3">
                      {homepageLabels.loginFeatures.seeLatestStatement}
                    </span>
                  </div>
                  {/* Feature: Check and Claim Rewards */}
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Image src={images.badge_new} alt="log img" />
                    <span className="text-xs font-semibold text-center uppercase tracking-wide mt-3">
                      {homepageLabels.loginFeatures.checkClaimRewards}
                    </span>
                  </div>
                  {/* Feature: Order Vape Products */}
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Image src={images.liquidNew} alt="log img" />
                    <span className="text-xs font-semibold text-center uppercase tracking-wide mt-3">
                      {homepageLabels.loginFeatures.orderVapeProducts}
                    </span>
                  </div>
                  {/* Feature: Order SIMs */}
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Image src={images.simToolkitNew} alt="log img" />
                    <span className="text-xs font-semibold text-center uppercase tracking-wide mt-3">
                      {homepageLabels.loginFeatures.orderSims}
                    </span>
                  </div>
                  {/* Feature: Claim Super Bonus */}
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Image src={images.commissionNew} alt="log img" />
                    <span className="text-xs font-semibold text-center uppercase tracking-wide mt-3">
                      {homepageLabels.loginFeatures.claimSuperBonus}
                    </span>
                  </div>
                  {/* Feature: Check a SIM Card */}
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Image src={images.dualSim} alt="log img" />
                    <span className="text-xs font-semibold text-center uppercase tracking-wide mt-3">
                      {homepageLabels.loginFeatures.checkSimCard}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        classStyle=""
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <LoginForm setLoginClose={setLoginOpen} setSignUpOpen={setSignUpOpen} />
      </Modal>
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        classStyle="w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[700px]"
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <RegistrationForm />
      </Modal>
    </>
  );
}
