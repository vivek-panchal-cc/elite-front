import React from "react";
import { footerLabels } from "@/lib/labels";
import { Button } from "@/components/ui/ButtonUI";
import Phone from "@/components/images/svgs/Phone";
import PrivacyMail from "@/components/images/svgs/PrivacyMail";

export default function PrivacyPolicyFooter() {
  return (
    <section className="privacy-policy-footer-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 py-10 sm:py-12 md:py-16 lg:py-18 px-4 sm:px-5 md:px-8 lg:px-[60px]">
          <p className="py-3 text-2xl sm:text-2xl md:text-3xl lg:text-[30px] text-center font-bold">
            {footerLabels.privacy.privacyFooterMessage}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-center pb-6">
            {footerLabels.privacy.privacyFooterDesc}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href={`tel:${footerLabels.privacy.privacyFooterMobile}`}>
              <Button
                className="flex items-center justify-center gap-2 
               bg-[var(--color-white)] hover:bg-[var(--color-soft-white)] 
               text-[var(--color-red)] rounded-[50px] font-semibold 
               min-w-[215px] sm:min-w-[284px] min-h-[45px] px-4 sm:px-6 py-2 sm:py-3"
              >
                <Phone fill="var(--color-red)" className="w-5 h-5" />
                <span>{footerLabels.privacy.privacyFooterMobile}</span>
              </Button>
            </a>
            <a href="mailto:dealers@elitemobile.com">
              <Button
                className="flex items-center justify-center gap-2 
               bg-[var(--color-white)] hover:bg-[var(--color-soft-white)] 
               text-[var(--color-red)] rounded-[50px] font-semibold 
               min-w-[215px] sm:min-w-[284px] min-h-[45px] px-4 sm:px-6 py-2 sm:py-3"
              >
                <PrivacyMail fill="var(--color-red)" className="w-5 h-5" />
                <span>{footerLabels.privacy.privacyFooterEmail}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
