"use client";

import { Button } from "@/components/ui/ButtonUI";
import Link from "next/link";
import { CustomLink } from "@/components/ui/CustomLink";
import Image from "next/image";
import { footerLabels } from "@/lib/labels";
import { ReactNode } from "react";
import {
  awardFive,
  awardFour,
  awardOne,
  awardSix,
  awardThree,
  awardTwo,
  rightArrow,
} from "../images";
import { Input } from "@/components/ui/Input";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";

interface FooterLink {
  name: string | ReactNode;
  href: string;
  id: string;
}

const footerSections = [
  {
    title: footerLabels.sections.getStarted,
    links: [
      { name: "Home", href: "/dashboard", id: "home" },
      { name: "About Elite Galaxy", href: "#", id: "about" },
      { name: "Careers", href: "#", id: "careers" },
      { name: "Contact", href: "#", id: "contact" },
    ],
  },
  {
    title: footerLabels.sections.legals,
    links: [
      { name: footerLabels.sections.terms, href: "#", id: "terms" },
      {
        name: footerLabels.sections.privacy,
        href: "/privacy-policy",
        id: "privacy",
      },
      { name: footerLabels.sections.cookies, href: "#", id: "cookies" },
      { name: footerLabels.sections.companyPolicy, href: "#", id: "policy" },
    ],
  },
  {
    title: footerLabels.sections.simCards,
    links: [
      {
        name: (
          <span className="inline-flex items-center">
            <span className="text-[var(--color-gray)]">
              {footerLabels.sections.call}&nbsp;
            </span>
            <span className="hover:text-[var(--color-red)]">
              {footerLabels.contact.phone}
            </span>
          </span>
        ),
        href: "tel:01619071717",
        id: "sim-phone",
      },
      {
        name: (
          <span className="inline-flex items-center">
            <span className="text-[var(--color-gray)]">
              {footerLabels.contact.email}&nbsp;
            </span>
            <span className="hover:text-[var(--color-red)]">
              {footerLabels.contact.infoEmail}
            </span>
          </span>
        ),
        href: "mailto:sims@elitemobile.com",
        id: "sim-email",
      },
    ],
  },
  {
    title: footerLabels.sections.dealerAccounts,
    links: [
      {
        name: (
          <span className="inline-flex items-center">
            <span className="text-[var(--color-gray)]">
              {footerLabels.sections.call}&nbsp;
            </span>
            <span className="hover:text-[var(--color-red)]">
              {footerLabels.sections.dealerRegistrationNumber}
            </span>
          </span>
        ),
        href: "tel:+44(0)1785216850",
        id: "dealer-phone",
      },
      {
        name: (
          <span className="inline-flex items-center">
            <span className="text-[var(--color-gray)]">
              {footerLabels.contact.email}&nbsp;
            </span>
            <span className="hover:text-[var(--color-red)]">
              {footerLabels.contact.dealerEmailAdd}
            </span>
          </span>
        ),
        href: "mailto:dealer@elitegalaxy.co.uk",
        id: "dealer-email",
      },
    ],
  },
  {
    title: footerLabels.sections.corporateAccounts,
    links: [
      {
        name: (
          <span className="inline-flex items-center">
            <span className="text-[var(--color-gray)]">
              {footerLabels.sections.call}&nbsp;
            </span>
            <span className="hover:text-[var(--color-red)]">
              {footerLabels.contact.corporatePhone}
            </span>
          </span>
        ),
        href: "tel:+44(0)1785216850",
        id: "corp-phone",
      },
      {
        name: (
          <span className="inline-flex items-center">
            <span className="text-[var(--color-gray)]">
              {footerLabels.contact.email}&nbsp;
            </span>
            <span className="hover:text-[var(--color-red)]">
              {footerLabels.contact.corpEmail}
            </span>
          </span>
        ),
        href: "mailto:corp@elitegalaxy.co.uk",
        id: "corp-email",
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
  const { dealer } = useAuthStoreWithAutoRefresh();
  return (
    <footer className="bg-[var(--color-soft-white)] border-t">
      <div className="max-w-7xl mx-auto px-[40px] pt-[20px] pb-[0px] sm:pt-[40px] sm:pb-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        {/* Mobile View Custom Layout */}
        <div className="block lg:hidden space-y-6 mb-8 md:mb-4">
          {/* Group 1: Get Started + Legals in a row */}
          <div className="grid grid-cols-2 gap-6 items-start">
            {[footerSections[0], footerSections[1]].map((section, index) => (
              <div
                key={section.title}
                className={`flex-1 ${
                  index === 1
                    ? "[@media_(min-width:426px)_and_(max-width:493px)]:ml-16 [@media_(min-width:494px)_and_(max-width:639px)]:ml-35 [@media_(min-width:640px)_and_(max-width:1023px)]:ml-35"
                    : ""
                }`}
              >
                <h3 className="text-[14px] sm:text-[14px] font-bold text-[var(--color-gray)] mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-0 sm:space-y-2">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <CustomLink
                        href={link.href}
                        className="text-[12px] sm:text-[14px] text-[var(--color-gray)] group"
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
                    <h3 className="text-[14px] sm:text-[14px] font-bold text-[var(--color-gray)] mb-2">
                      {section.title}
                    </h3>
                    <ul className="space-y-0 sm:space-y-2">
                      {section.links.map((link) => (
                        <li key={link.id}>
                          <CustomLink
                            href={link.href}
                            className="text-[12px] sm:text-[14px] text-[var(--color-gray)] group"
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
            {/* <div className="grid grid-cols-2 w-fit gap-2 sm:gap-4 justify-self-end"> */}
            <div className="grid grid-cols-2 w-fit gap-2 sm:gap-4 [@media_(min-width:426px)_and_(max-width:493px)]:ml-16 [@media_(min-width:494px)_and_(max-width:639px)]:ml-35 [@media_(min-width:640px)_and_(max-width:1023px)]:ml-35">
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

        {/* Web View (Unchanged) */}
        {/* <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"> */}
        <div className="hidden lg:grid grid-cols-[repeat(auto-fit,minmax(max-content,180px))] gap-6 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[14px] sm:text-[18px] font-bold text-[var(--color-gray)] mb-2 sm:leading-[21px]">
                {section.title}
              </h3>
              <ul className="space-y-0 sm:space-y-2">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <CustomLink
                      href={link.href}
                      className="text-[14px] sm:text-[16px] text-[var(--color-gray)] leading-[22px] group"
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
        <div className="hidden lg:flex border-t border-gray-200 mb-6 sm:mb-8 relative">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-end gap-4 lg:mt-[-70px] lg:ml-[-120px] md:mt-[-100px] md:ml-[-60px] pointer-events-none">
            <div className="w-full md:w-auto pointer-events-auto">
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
                  className="rounded-r-none bg-[var(--color-white)] w-full placeholder:text-[12px] placeholder:text-[rgba(0,0,0,0.3)] px-6 text-[12px] md:text-[12px] sm:text-[12px]"
                />
                <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-10px] min-w-[80px] max-w-[100px] bg-[#10499E]">
                  <Image src={rightArrow} alt="right arrow icon" />
                </Button>
              </div>

              <div className="flex items-start gap-2 mt-0 ml-[10px]">
                <input
                  type="checkbox"
                  id="newsletterConsent"
                  className="mt-[4px] w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] leading-[22px]"
                />
                <label
                  htmlFor="newsletterConsent"
                  className="text-[8px] sm:text-[10px] text-[var(--color-black)] cursor-pointer leading-[22px]"
                >
                  {footerLabels.newsletter.description}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter for Mobile/Tablet (bottom) */}
        <div className="block lg:hidden border-t sm:justify-items-center border-gray-200 md:pt-0 sm:pt-0 pb-6 sm:pb-0">
          <div className="w-full sm:w-[50%]">
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
                className="rounded-r-none text-[10px] md:text-[10px] sm:text-[10px] bg-[var(--color-white)] w-full placeholder:text-[rgba(0,0,0,0.3)] px-6"
              />
              <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-10px] min-w-[80px] max-w-[100px] bg-[#10499E]">
                <Image src={rightArrow} alt="right arrow icon" />
              </Button>
            </div>

            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                id="newsletterConsentMobile"
                className="mt-[4px] w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] leading-[22px]"
              />
              <label
                htmlFor="newsletterConsentMobile"
                className="text-[8px] sm:text-[10px] text-[var(--color-black)] cursor-pointer leading-[22px]"
              >
                {footerLabels.newsletter.description}
              </label>
            </div>
          </div>
        </div>

        {/* Desktop Only Awards */}
        <div className="hidden lg:block border-t border-gray-200 pt-6 sm:pt-0 pb-6 sm:pb-0">
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
