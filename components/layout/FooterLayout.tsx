import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { CustomLink } from "@/components/ui/CustomLink";
import Image from "next/image";
import { footerLabels } from "@/lib/labels";
import {
  awardFive,
  awardFour,
  awardOne,
  awardSix,
  awardThree,
  awardTwo,
  rightArrow,
} from "../images";

const footerSections = [
  {
    title: footerLabels.sections.getStarted,
    links: [
      { name: "Home", href: "/" },
      { name: "About Elite Galaxy", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: footerLabels.sections.legals,
    links: [
      { name: footerLabels.sections.terms, href: "/terms" },
      { name: footerLabels.sections.privacy, href: "/privacy" },
      { name: footerLabels.sections.cookies, href: "/cookies" },
      { name: footerLabels.sections.gdpr, href: "/gdpr" },
    ],
  },
  {
    title: footerLabels.sections.simCards,
    links: [
      { name: footerLabels.contact.phone, href: "tel:01619071717" },
      {
        name: footerLabels.contact.infoEmail,
        href: "mailto:info@elitegalaxy.co.uk",
      },
    ],
  },
  {
    title: footerLabels.sections.dealerAccounts,
    links: [
      {
        name: footerLabels.sections.dealerRegistration,
        href: "/dealer-registration",
      },
      {
        name: footerLabels.contact.dealerEmail,
        href: "mailto:dealer@elitegalaxy.co.uk",
      },
    ],
  },
  {
    title: footerLabels.sections.corporateAccounts,
    links: [
      { name: footerLabels.contact.corporatePhone, href: "tel:01619071717" },
      {
        name: footerLabels.contact.corpEmail,
        href: "mailto:corp@elitegalaxy.co.uk",
      },
    ],
  },
];

const awards = [
  { image: awardOne },
  { image: awardTwo },
  { image: awardThree },
  { image: awardFour },
  { image: awardFive },
  { image: awardSix },
];

export function FooterLayout() {
  return (
    <footer className="bg-[#E9E9E9] border-t">
      <div className="max-w-7xl mx-auto px-[40px] pt-[20px] pb-[0px] sm:pt-[40px] sm:pb-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        {/* ✅ Mobile View Custom Layout */}
        <div className="block lg:hidden space-y-6 mb-8">
          {/* Group 1: Get Started + Legals in a row */}
          <div className="grid grid-cols-2 gap-6 items-start">
            {[footerSections[0], footerSections[1]].map((section) => (
              <div key={section.title} className="flex-1">
                <h3 className="text-[12px] sm:text-[14px] font-semibold text-[var(--color-gray)] mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-0 sm:space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <CustomLink
                        href={link.href}
                        className="text-[12px] sm:text-[14px] text-[var(--color-gray)]"
                      >
                        {link.name}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Group 2: Sim Cards, Dealer Accounts, Corporate Accounts (stacked) */}
          <div className="grid grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              {[footerSections[2], footerSections[3], footerSections[4]].map(
                (section) => (
                  <div key={section.title}>
                    <h3 className="text-[12px] sm:text-[14px] font-semibold text-[var(--color-gray)] mb-2">
                      {section.title}
                    </h3>
                    <ul className="space-y-0 sm:space-y-2">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <CustomLink
                            href={link.href}
                            className="text-[12px] sm:text-[14px] text-[var(--color-gray)]"
                          >
                            {link.name}
                          </CustomLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>

            {/* Awards in second column */}
            <div className="grid grid-cols-2 w-fit gap-2 sm:gap-4">
              {awards.map((award, index) => (
                <div key={index} className="flex justify-center items-center">
                  <Image
                    src={award.image}
                    alt={`Award ${index + 1}`}
                    width={60}
                    height={60}
                    className="sm:w-[100px] sm:h-[100px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Web View (Unchanged) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[12px] sm:text-[14px] font-semibold text-[var(--color-gray)] mb-2">
                {section.title}
              </h3>
              <ul className="space-y-0 sm:space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <CustomLink
                      href={link.href}
                      className="text-[12px] sm:text-[14px] text-[var(--color-gray)]"
                    >
                      {link.name}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter for Desktop (top-right) */}
        <div className="hidden lg:flex border-t border-gray-200 mb-6 sm:mb-8">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-end gap-4 lg:mt-[-50px] lg:ml-[-50px] md:mt-[-100px] md:ml-[-60px]">
            <div className="w-full md:w-auto">
              <label
                htmlFor="newsletter"
                className="block text-[12px] sm:text-[16px] font-semibold text-[var(--color-gray)] mb-1 ml-[10px]"
              >
                {footerLabels.newsletter.title}
              </label>

              <div className="flex w-full md:min-w-[400px]">
                <Input
                  id="newsletter"
                  type="email"
                  placeholder={footerLabels.newsletter.placeholder}
                  className="rounded-r-none text-[12px] sm:text-[14px] bg-white w-full"
                />
                <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-10px] min-w-[80px] max-w-[100px]">
                  <Image src={rightArrow} alt="right arrow icon" />
                </Button>
              </div>

              <div className="flex items-start gap-2 mt-2 ml-[10px]">
                <input
                  type="checkbox"
                  id="newsletterConsent"
                  className="mt-[2px] w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]"
                />
                <label
                  htmlFor="newsletterConsent"
                  className="text-[8px] sm:text-[10px] text-[var(--color-black)] cursor-pointer"
                >
                  {footerLabels.newsletter.description}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter for Mobile/Tablet (bottom) */}
        <div className="block lg:hidden border-t border-gray-200 sm:pt-8 pb-6 sm:pb-0">
          <div className="w-full">
            <label
              htmlFor="newsletter-mobile"
              className="block text-[12px] sm:text-[16px] font-semibold text-[var(--color-gray)] mb-1"
            >
              {footerLabels.newsletter.title}
            </label>

            <div className="flex w-full">
              <Input
                id="newsletter-mobile"
                type="email"
                placeholder={footerLabels.newsletter.placeholder}
                className="rounded-r-none text-[12px] sm:text-[14px] bg-white w-full"
              />
              <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-10px] min-w-[80px] max-w-[100px]">
                <Image src={rightArrow} alt="right arrow icon" />
              </Button>
            </div>

            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                id="newsletterConsentMobile"
                className="mt-[2px] w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]"
              />
              <label
                htmlFor="newsletterConsentMobile"
                className="text-[8px] sm:text-[10px] text-[var(--color-black)] cursor-pointer"
              >
                {footerLabels.newsletter.description}
              </label>
            </div>
          </div>
        </div>

        {/* Desktop Only Awards */}
        <div className="hidden lg:block border-t border-gray-200 pt-6 sm:pt-8 pb-6 sm:pb-0">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {awards.map((award, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={award.image}
                  alt={`Award ${index + 1}`}
                  width={80}
                  height={80}
                  className="mx-auto sm:w-[150px] sm:h-[150px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-center bg-[var(--color-white)] border-t border-gray-200 p-5">
        <p className="text-center text-sm text-[var(--color-gray)]">
          {footerLabels.copyright}
        </p>
      </div>
    </footer>
  );
}
