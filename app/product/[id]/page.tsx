import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoryNav from "@/components/category-nav"

export default function ProductPage({ params }: { params: { id: string } }) {
  // This would normally come from a database or API
  const product = {
    id: params.id,
    name: "Korean Clothes Turn-Down Collar Dress Shirts For Men",
    price: 130.0,
    rating: 4.5,
    reviews: 1634,
    description:
      "Browse through our carefully curated collection of high-quality clothing & accessories featuring the latest trends and styles.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Orange", class: "bg-orange-500" },
      { name: "Teal", class: "bg-teal-500" },
      { name: "Black", class: "bg-black" },
      { name: "Beige", class: "bg-amber-100" },
    ],
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
  }

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
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square w-20 cursor-pointer overflow-hidden rounded-md border ${
                    index === 0 ? "ring-2 ring-orange-500" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : i < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-3xl font-bold text-orange-500">${product.price.toFixed(2)}</p>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-sm hover:border-orange-500 hover:bg-orange-50"
                    >
                      {size}
                    </div>
                  ))}
                  <Link href="#" className="flex h-10 items-center text-sm text-muted-foreground underline">
                    Size Guide
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Colors Available</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`h-8 w-8 cursor-pointer rounded-full ${color.class} ${
                        index === 0 ? "ring-2 ring-offset-2" : ""
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button size="lg" className="flex-1 bg-black text-white hover:bg-gray-800">
                Buy This Product
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <ul className="list-inside list-disc space-y-1">
                  <li>100% Cotton</li>
                  <li>Button closure</li>
                  <li>Machine Wash</li>
                  <li>Imported</li>
                  <li>Turn-down collar</li>
                  <li>Regular fit</li>
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <Button variant="outline" size="sm">
                      Write a Review
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">Great quality and fit!</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The material is excellent and the sizing is perfect. Highly recommend!
                      </p>
                      <p className="text-xs text-muted-foreground">John D. - 2 weeks ago</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">Good value for money</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nice shirt, comfortable to wear all day. Would buy again.
                      </p>
                      <p className="text-xs text-muted-foreground">Sarah M. - 1 month ago</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
