import React from "react";
import PrivacyPolicy from "@/components/images/svgs/PrivacyPolicy";
import { footerLabels } from "@/lib/labels";

export default function PrivacyPolicyHeader() {
  return (
    <section className="privacy-policy-header-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 py-14 sm:py-16 md:py-20 lg:py-22 px-4 sm:px-5 md:px-8 lg:px-[60px]">
          <div className="flex justify-center">
            <PrivacyPolicy />
          </div>

          {/* Responsive heading */}
          <p className="py-3 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-center font-bold">
            {footerLabels.privacy.privacyPolicy}
          </p>

          {/* Responsive subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-center">
            {footerLabels.privacy.privacyMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
