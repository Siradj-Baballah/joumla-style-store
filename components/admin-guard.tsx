"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("adminLoggedIn")
      const loginTime = localStorage.getItem("adminLoginTime")

      if (!isLoggedIn || !loginTime) {
        router.push("/admin/login")
        return
      }

      // التحقق من انتهاء صلاحية الجلسة (24 ساعة)
      const currentTime = Date.now()
      const sessionDuration = 24 * 60 * 60 * 1000 // 24 ساعة

      if (currentTime - Number.parseInt(loginTime) > sessionDuration) {
        localStorage.removeItem("adminLoggedIn")
        localStorage.removeItem("adminLoginTime")
        router.push("/admin/login")
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#335E6D] mx-auto"></div>
          <p className="text-slate-600 mt-4">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
