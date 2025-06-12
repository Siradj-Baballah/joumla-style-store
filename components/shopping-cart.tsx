"use client"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function ShoppingCartSheet() {
  // This would normally come from a database or API
  const cartItems = [
    {
      id: "1",
      name: "Hawaiian Shirts",
      price: 120,
      quantity: 1,
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: "3",
      name: "Printed Top Shirts",
      price: 200,
      quantity: 2,
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-hidden">
          {cartItems.length > 0 ? (
            <>
              <div className="flex-1 overflow-auto">
                <div className="space-y-4 pr-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative aspect-square h-16 w-16 min-w-[4rem] overflow-hidden rounded-md border">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ${item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Separator />
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                      <Link href="/cart">Checkout Now</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-muted p-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium">Your cart is empty</h2>
              <p className="text-center text-muted-foreground">
                Looks like you haven't added any products to your cart yet.
              </p>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
