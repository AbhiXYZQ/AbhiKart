import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

const CATEGORY_SLUG_MAP: Record<string, string> = {
  'electronics': 'Electronics',
  'fashion': 'Fashion',
  'home-kitchen': 'Home & Kitchen',
  'beauty': 'Beauty',
  'lifestyle': 'Lifestyle',
};

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState("featured");
  
  // [!!!] NAYI STATE RATING FILTERS KE LIYE
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categoryParam = params?.category || "";
  const categoryName = CATEGORY_SLUG_MAP[categoryParam] || categoryParam
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', categoryName],
    queryFn: async () => {
      const res = await fetch(`/api/products/category/${encodeURIComponent(categoryName)}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return res.json();
    },
  });

  // [!!!] NAYA HANDLER RATING CHANGE KE LIYE
  const handleRatingChange = (rating: number, checked: boolean) => {
    setSelectedRatings(prev => {
      if (checked) {
        // Rating ko array mein add karein
        return [...prev, rating];
      } else {
        // Rating ko array se remove karein
        return prev.filter(r => r !== rating);
      }
    });
  };

  const products = useMemo(() => {
    let filtered = [...allProducts];
    
    // [!!!] RATING FILTER LOGIC
    // Agar koi rating select ki gayi hai, toh minimum select ki gayi rating dhoondhein
    // (jaise agar "3+" aur "4+" select kiya hai, toh hum 3 se filter karenge)
    const minRating = selectedRatings.length > 0 ? Math.min(...selectedRatings) : 0;

    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }
    // [!!!] RATING FILTER LOGIC KHATM
    
    // Price filter (yeh pehle se tha)
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price.replace('₹', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort logic (yeh pehle se tha)
    if (sortBy === "price-low") {
      filtered.sort((a, b) => parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', '')));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', '')));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      filtered.reverse();
    }

    return filtered;
  }, [allProducts, priceRange, sortBy, selectedRatings]); // [!!!] selectedRatings ko dependency array mein add karein

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4 border-b">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground">
              Home / <span className="text-foreground">{categoryName}</span>
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
                      max={500000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                      data-testid="slider-price-range"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-medium mb-3">Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          {/* [!!!] CHECKBOX KO UPDATE KIYA GAYA */}
                          <input 
                            type="checkbox" 
                            className="rounded" 
                            checked={selectedRatings.includes(rating)}
                            onChange={(e) => handleRatingChange(rating, e.target.checked)}
                          />
                          <span className="text-sm">{rating}+ Stars</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Note: Yeh button abhi bhi UI ka hissa hai, lekin filter real-time mein apply hote hain. */}
                  <Button className="w-full" data-testid="button-apply-filters">Apply Filters</Button>
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h1 className="text-3xl font-bold" data-testid="text-category-title">{categoryName}</h1>
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
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found for these filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      {...product} 
                      badge={product.badge || undefined}
                    />
                  ))}
                </div>
              )}

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
