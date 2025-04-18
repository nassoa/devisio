"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, Info } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Générateur de Devis",
      href: "/",
      icon: <FileText className="h-4 w-4 mr-2" />,
    },
    {
      name: "À propos",
      href: "/about",
      icon: <Info className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center  space-x-8 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-teal-600",
                pathname === item.href ? "text-teal-600" : "text-gray-600"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
