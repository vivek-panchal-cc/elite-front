import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import Image from "next/image";
import { footerLabels } from "@/lib/labels";

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
  {
    name: footerLabels.awards.partnerOfYear,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: footerLabels.awards.indirectPartner,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: footerLabels.awards.bestServiceProvider,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: footerLabels.awards.customerChoice,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: footerLabels.awards.innovationExcellence,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: footerLabels.awards.qualityAssurance,
    image: "/placeholder.svg?height=80&width=80",
  },
];

export function FooterLayout() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {footerLabels.newsletter.title}
              </h3>
              <p className="text-sm text-gray-600">
                {footerLabels.newsletter.description}
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder={footerLabels.newsletter.placeholder}
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">
                {footerLabels.newsletter.subscribe}
              </Button>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {awards.map((award, index) => (
              <div key={index} className="flex-shrink-0 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🏆</span>
                </div>
                <div className="text-xs text-gray-600 max-w-20">
                  {award.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <p className="text-center text-sm text-gray-600">
            {footerLabels.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
