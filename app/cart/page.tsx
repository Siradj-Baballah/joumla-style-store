import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import CategoryNav from "@/components/category-nav"

export default function CartPage() {
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
  const shipping = 15
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold">
              Styleco.
            </Link>
            <CategoryNav />
          </div>
        </div>
      </header>

      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-lg border">
                <div className="p-6">
                  <div className="hidden border-b pb-4 md:grid md:grid-cols-6">
                    <div className="col-span-3 font-medium">Product</div>
                    <div className="font-medium">Price</div>
                    <div className="font-medium">Quantity</div>
                    <div className="text-right font-medium">Total</div>
                  </div>
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 md:grid md:grid-cols-6 md:items-center">
                        <div className="col-span-3 flex items-center space-x-4">
                          <div className="relative aspect-square h-20 w-20 min-w-[5rem] overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground md:hidden">
                              ${item.price} x {item.quantity}
                            </p>
                            <button className="mt-1 flex items-center text-sm text-red-500 md:hidden">
                              <Trash2 className="mr-1 h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="hidden md:block">${item.price}</div>
                        <div className="mt-2 flex items-center md:mt-0">
                          <div className="flex items-center rounded-md border">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="w-10 text-center">{item.quantity}</div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <button className="ml-4 hidden text-sm text-red-500 md:flex md:items-center">
                            <Trash2 className="mr-1 h-3 w-3" />
                            Remove
                          </button>
                        </div>
                        <div className="hidden text-right md:block">${item.price * item.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-lg border">
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full bg-orange-500 hover:bg-orange-600">Checkout Now</Button>
                </div>
              </div>
              <div className="mt-4 rounded-lg border p-6">
                <h3 className="mb-4 text-sm font-medium">Have a promo code?</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Enter code" className="h-9" />
                  <Button variant="outline" size="sm" className="shrink-0">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border py-12">
            <div className="rounded-full bg-muted p-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium">Your cart is empty</h2>
            <p className="text-center text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
