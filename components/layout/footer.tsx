import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

const footerSections = [
  {
    title: "Get Started",
    links: [
      { name: "About Elite Galaxy", href: "/about" },
      { name: "How it Works", href: "/how-it-works" },
      { name: "Free Trial", href: "/free-trial" },
      { name: "Pricing Plans", href: "/pricing" },
    ],
  },
  {
    title: "Legals",
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
    ],
  },
  {
    title: "Site Goals",
    links: [
      { name: "Call us on 0161 907 1717", href: "tel:01619071717" },
      { name: "info@elitegalaxy.co.uk", href: "mailto:info@elitegalaxy.co.uk" },
    ],
  },
  {
    title: "Dealer Accounts",
    links: [
      { name: "Dealer Registration", href: "/dealer-registration" },
      { name: "dealer@elitegalaxy.co.uk", href: "mailto:dealer@elitegalaxy.co.uk" },
    ],
  },
  {
    title: "Corporate Accounts",
    links: [
      { name: "Call us on 0161 907 1717", href: "tel:01619071717" },
      { name: "corp@elitegalaxy.co.uk", href: "mailto:corp@elitegalaxy.co.uk" },
    ],
  },
]

const awards = [
  { name: "Award 1", image: "/placeholder.svg?height=80&width=80" },
  { name: "Award 2", image: "/placeholder.svg?height=80&width=80" },
  { name: "Award 3", image: "/placeholder.svg?height=80&width=80" },
  { name: "Award 4", image: "/placeholder.svg?height=80&width=80" },
  { name: "Award 5", image: "/placeholder.svg?height=80&width=80" },
  { name: "Award 6", image: "/placeholder.svg?height=80&width=80" },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Newsletter</h3>
              <p className="text-sm text-gray-600">Get the latest updates and offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {awards.map((award, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={award.image || "/placeholder.svg"}
                  alt={award.name}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Elite Galaxy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
