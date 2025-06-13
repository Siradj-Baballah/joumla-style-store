"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, User } from "lucide-react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // بيانات الدخول الثابتة (يمكنك تغييرها)
    const ADMIN_USERNAME = "admin"
    const ADMIN_PASSWORD = "joumla2024"

    // محاكاة تأخير الشبكة
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // حفظ حالة تسجيل الدخول
      localStorage.setItem("adminLoggedIn", "true")
      localStorage.setItem("adminLoginTime", Date.now().toString())

      // توجيه إلى لوحة الإدارة
      router.push("/admin")
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#335E6D] rounded-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-stone-100" style={{ fontFamily: "serif" }}>
                J
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#335E6D]">Joumla Style</CardTitle>
          <p className="text-slate-600">تسجيل دخول لوحة الإدارة</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-right block">
                اسم المستخدم
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="أدخل اسم المستخدم"
                  className="pl-10 text-right"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block">
                كلمة المرور
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="pl-10 pr-10 text-right"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-[#335E6D] hover:bg-[#2A4F5C] text-stone-100" disabled={loading}>
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => router.push("/")} className="text-slate-600 hover:text-[#335E6D]">
              العودة للمتجر
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800 text-center font-medium">بيانات الدخول التجريبية:</p>
            <p className="text-xs text-blue-600 text-center mt-1">المستخدم: admin | كلمة المرور: joumla2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
