import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
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
      { name: "How it Works", href: "/how-it-works" },
      { name: "Free Trial", href: "/free-trial" },
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
      { name: footerLabels.contact.phone, href: "tel:01619071717" },
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
      <div className="max-w-7xl mx-auto px-[12px] pt-[20px] pb-[0px] sm:pt-[40px] sm:pb-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[12px] sm:text-[14px] font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[12px] sm:text-[14px] text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mb-6 sm:mb-8">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-end gap-4 lg:mt-[-50px] lg:ml-[-50px] md:mt-[-100px] md:ml-[-60px]">
            <div className="w-full md:w-auto">
              <label
                htmlFor="newsletter"
                className="block text-[12px] sm:text-[16px] font-semibold text-gray-900 mb-1 ml-[10px]"
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

                <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-10px] min-w-[25%]">
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
                  className="text-[8px] sm:text-[10px] text-black-600 cursor-pointer"
                >
                  {footerLabels.newsletter.description}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 sm:pt-8 pb-6 sm:pb-0">
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
      <div className="flex justify-center bg-[#ffffff] border-t border-gray-200 p-5">
        <p className="text-center text-sm text-gray-600">
          {footerLabels.copyright}
        </p>
      </div>
    </footer>
  );
}
