import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function FilterSidebar() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Filter</h3>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-sm">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="shirts" />
                  <Label htmlFor="shirts">Shirts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="t-shirts" />
                  <Label htmlFor="t-shirts">T-Shirts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="jeans" />
                  <Label htmlFor="jeans">Denim & Jeans</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="knitwear" />
                  <Label htmlFor="knitwear">Knitwear</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="suits" />
                  <Label htmlFor="suits">Suits</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pants" />
                  <Label htmlFor="pants">Pants</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="e-goods" />
                  <Label htmlFor="e-goods">E-Goods</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider defaultValue={[50, 250]} min={0} max={500} step={10} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">$50</span>
                  <span className="text-sm">$250</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger className="text-sm">Size</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-4 gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <div
                    key={size}
                    className="flex h-8 w-full items-center justify-center rounded-md border text-sm hover:border-orange-500 hover:bg-orange-50"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="color">
            <AccordionTrigger className="text-sm">Color</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-6 gap-2">
                {[
                  "bg-red-500",
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-purple-500",
                  "bg-black",
                  "bg-white border",
                  "bg-gray-500",
                  "bg-orange-500",
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full ${color} cursor-pointer hover:ring-2 hover:ring-offset-1`}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
