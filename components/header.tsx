"use client"

import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-[#335E6D] shadow-lg border-b border-[#2A4F5C]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2A4F5C] rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-stone-100" style={{ fontFamily: "serif" }}>
                J
              </span>
            </div>
            <div className="text-xl font-bold text-stone-100">Joumla Style</div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-green-400 border-green-400 hover:bg-green-400 hover:text-[#335E6D] bg-transparent"
              onClick={() => window.open("https://wa.me/966559939985", "_blank")}
            >
              <MessageCircle className="h-4 w-4" />
              واتساب
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-stone-100 border-stone-300 hover:bg-stone-100 hover:text-[#335E6D] bg-transparent"
              onClick={() => window.open("tel:+966559939985", "_blank")}
            >
              <Phone className="h-4 w-4" />
              اتصل بنا
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
