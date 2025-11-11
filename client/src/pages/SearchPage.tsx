// client/src/pages/SearchPage.tsx

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
// [!!!] 'useLocation' ki zaroorat nahi hai
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { Search } from "lucide-react";

export default function SearchPage() {
  // [!!!] FIX: URL se query string padhne ka sahi tareeka
  // Hum 'window.location.search' ka istemaal karenge
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q') || "";

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/search', query],
    queryFn: async () => {
      if (!query) return [];
      // Backend API ko call karein
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error("Search failed");
      }
      return res.json();
    },
    enabled: !!query, // Query hone par hi run karein
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6" data-testid="text-page-title">
            Search Results
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {isLoading 
              ? "Searching..." 
              : `Found ${products.length} results for: "${query}"`
            }
          </p>

          {/* Products */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <Search className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No products found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  badge={product.badge || undefined}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}