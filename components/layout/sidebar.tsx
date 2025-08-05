"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/ButtonUI";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  User,
  Settings,
  CreditCard,
  FileText,
  BarChart3,
  Users,
  Bell,
  Shield,
  Home,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { sidebarLabels } from "@/lib/labels";

interface SidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

const menuItems = [
  {
    category: sidebarLabels.myAccount,
    items: [
      { id: "dashboard", label: sidebarLabels.dashboard, icon: Home },
      { id: "profile", label: sidebarLabels.profileInformation, icon: User },
      { id: "settings", label: sidebarLabels.accountSettings, icon: Settings },
      { id: "billing", label: sidebarLabels.billingPayments, icon: CreditCard },
      { id: "documents", label: sidebarLabels.documents, icon: FileText },
    ],
  },
  {
    category: sidebarLabels.analytics,
    items: [
      { id: "reports", label: sidebarLabels.reports, icon: BarChart3 },
      { id: "analytics", label: sidebarLabels.analytics, icon: BarChart3 },
    ],
  },
  {
    category: sidebarLabels.management,
    items: [
      { id: "users", label: sidebarLabels.userManagement, icon: Users },
      { id: "notifications", label: sidebarLabels.notifications, icon: Bell },
      { id: "security", label: sidebarLabels.security, icon: Shield },
    ],
  },
];

export function Sidebar({ activeItem, onItemSelect }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    sidebarLabels.myAccount,
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {sidebarLabels.menu}
          </h2>

          {menuItems.map((section) => (
            <div key={section.category} className="mb-6">
              <Button
                variant="ghost"
                className="w-full justify-between p-2 h-auto text-left font-medium text-gray-700 hover:text-gray-900"
                onClick={() => toggleCategory(section.category)}
              >
                <span>{section.category}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedCategories.includes(section.category) && "rotate-90"
                  )}
                />
              </Button>

              {expandedCategories.includes(section.category) && (
                <div className="ml-2 mt-2 space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start p-2 h-auto text-sm",
                          activeItem === item.id
                            ? "bg-purple-50 text-purple-700 border-r-2 border-purple-600"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                        onClick={() => onItemSelect(item.id)}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
