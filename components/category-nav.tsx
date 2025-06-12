"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { name: "Shop", href: "/" },
  { name: "Women", href: "/category/women" },
  { name: "Men", href: "/category/men" },
  { name: "Children", href: "/category/children" },
]

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = React.useState("Shop")

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-orange-500",
            activeCategory === category.name ? "text-orange-500" : "text-muted-foreground",
          )}
          onClick={() => setActiveCategory(category.name)}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
