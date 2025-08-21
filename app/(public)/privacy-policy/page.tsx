"use client";

import PrivacyPolicyHeader from "./(section)/PrivacyPolicyHeader";
import { footerLabels } from "@/lib/labels";
import PrivacyPolicyFooter from "./(section)/PrivacyPolicyFooter";
import { useState } from "react";
import Arrow from "@/components/images/svgs/Arrow";
import { cn } from "@/lib/utils";
import PrivacyProtect from "@/components/images/svgs/PrivacyProtect";

type AccordionItem = {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
};

export default function PrivacyPolicy() {
  const [openId, setOpenId] = useState<number | null>(1);

  const items: AccordionItem[] = [
    {
      id: 1,
      title: "What personal information do we collect?",
      content:
        "We may hold information relating to you that you have provided to us (such as on an application or registration form). This information may include, amongst other things, your name, address, telephone numbers, information on how you use our products and services (such as the type, date, time, location and information on your browsing activity), lifestyle information and any other information collected in relation to your use of our products and services.",
      icon: (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-red)] text-white">
          <PrivacyProtect />
        </div>
      ),
    },
    {
      id: 2,
      title: "How do we use your personal information?",
      content:
        "We use your information to provide our services, improve customer experience, personalize content, and for legal and compliance purposes. This may include sending you updates, offers, or service-related notifications.",
      icon: (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-soft-gray)] text-[var(--color-red)]">
          <PrivacyProtect />
        </div>
      ),
    },
    {
      id: 3,
      title: "Sharing your personal information",
      content:
        "We use your information to provide our services, improve customer experience, personalize content, and for legal and compliance purposes. This may include sending you updates, offers, or service-related notifications.",
      icon: (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-soft-gray)] text-[var(--color-red)]">
          <PrivacyProtect />
        </div>
      ),
    },
    {
      id: 4,
      title: "Cookie",
      content:
        "We use your information to provide our services, improve customer experience, personalize content, and for legal and compliance purposes. This may include sending you updates, offers, or service-related notifications.",
      icon: (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-soft-gray)] text-[var(--color-red)]">
          <PrivacyProtect />
        </div>
      ),
    },
  ];
  return (
    <>
      <PrivacyPolicyHeader />
      <div className="max-w-7xl mx-auto w-full">
        <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
          <div className="flex-1 space-y-4 py-6">
            <div className="flex items-center justify-center mb-10 mt-4">
              <div className="w-full p-6 sm:p-8 flex items-center text-[12px] sm:text-[14px] text-[#374151] font-medium border-l-[3px] border-l-[var(--color-red)] rounded-md bg-[var(--color-light-gray)]">
                {footerLabels.privacy.privacyHeaderMessage}
              </div>
            </div>
            <div className="space-y-8 mb-10">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`border bg-white shadow-sm overflow-hidden ${
                    openId === item.id ? "rounded-2xl" : "rounded-full"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenId(openId === item.id ? null : item.id)
                    }
                    className="w-full flex items-center justify-between px-4 py-2 md:px-4 md:py-3 sm:px-3 sm:py-2 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      {item.icon}
                      <span className="text-[12px] md:text-[16px] sm:text-[15px] font-bold text-[var(--color-black)]">
                        {item.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "mr-0 ml-5 sm:mr-8 md:mr-8 lg:mr-8 transition-transform duration-300",
                        openId === item.id ? "rotate-270" : "rotate-90"
                      )}
                    >
                      <Arrow
                        className="w-3 h-3 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"
                        stroke="var(--color-blue)"
                      />
                    </span>
                  </button>
                  {openId === item.id && (
                    <div className="px-6 pb-2 md:pb-6 sm:pb-4 text-[12px] md:text-[14px] sm:text-[13px] text-[#374151] leading-relaxed">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicyFooter />
    </>
  );
}
