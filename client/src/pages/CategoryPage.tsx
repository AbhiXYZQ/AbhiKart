import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import headphonesImg from "@assets/generated_images/Wireless_headphones_product_d0c9cf29.png";
import smartphoneImg from "@assets/generated_images/Smartphone_product_shot_52f1a2b5.png";
import smartwatchImg from "@assets/generated_images/Smart_watch_product_707b82da.png";
import lampImg from "@assets/generated_images/Desk_lamp_product_36683480.png";

export default function CategoryPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");

  // TODO: remove mock functionality - replace with real data from backend
  const products = [
    {
      id: "1",
      title: "Premium Wireless Noise-Cancelling Headphones",
      image: headphonesImg,
      price: "$299.99",
      rating: 4.5,
      reviewCount: 1234,
      category: "Electronics",
      badge: "Best Seller",
    },
    {
      id: "2",
      title: "Latest Flagship Smartphone with 5G",
      image: smartphoneImg,
      price: "$899.99",
      rating: 4.8,
      reviewCount: 2341,
      category: "Electronics",
    },
    {
      id: "3",
      title: "Smart Fitness Watch with Heart Monitor",
      image: smartwatchImg,
      price: "$199.99",
      rating: 4.6,
      reviewCount: 1023,
      category: "Electronics",
    },
    {
      id: "4",
      title: "LED Desk Lamp with USB Charging",
      image: lampImg,
      price: "$45.99",
      rating: 4.3,
      reviewCount: 445,
      category: "Electronics",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4 border-b">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground">
              Home / <span className="text-foreground">Electronics</span>
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                      data-testid="slider-price-range"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-medium mb-3">Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{rating}+ Stars</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" data-testid="button-apply-filters">Apply Filters</Button>
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h1 className="text-3xl font-bold" data-testid="text-category-title">Electronics</h1>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
