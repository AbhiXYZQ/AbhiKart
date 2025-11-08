import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Footer } from "@/components/Footer";
import { Smartphone, ShoppingBag, Home, Sparkles, Dumbbell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import smartphoneImg from "@assets/generated_images/Smartphone_product_shot_52f1a2b5.png";
import handbagImg from "@assets/generated_images/Fashion_handbag_product_50bd0aac.png";
import coffeeMakerImg from "@assets/generated_images/Coffee_maker_appliance_d0be156c.png";
import serumImg from "@assets/generated_images/Skincare_serum_product_1ebaaf55.png";
import yogaMatImg from "@assets/generated_images/Yoga_mat_product_067e6db4.png";

export default function HomePage() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const categories = [
    { name: "Electronics", icon: Smartphone, productCount: products.filter(p => p.category === "Electronics").length, path: "/category/electronics", image: smartphoneImg },
    { name: "Fashion", icon: ShoppingBag, productCount: products.filter(p => p.category === "Fashion").length, path: "/category/fashion", image: handbagImg },
    { name: "Home & Kitchen", icon: Home, productCount: products.filter(p => p.category === "Home & Kitchen").length, path: "/category/home-kitchen", image: coffeeMakerImg },
    { name: "Beauty", icon: Sparkles, productCount: products.filter(p => p.category === "Beauty").length, path: "/category/beauty", image: serumImg },
    { name: "Lifestyle", icon: Dumbbell, productCount: products.filter(p => p.category === "Lifestyle").length, path: "/category/lifestyle", image: yogaMatImg },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Featured Categories */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-section-categories">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </section>

        {/* Top Deals Today */}
        <section className="container mx-auto px-4 py-16 bg-muted/30">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-section-deals">
            Top Deals Today
          </h2>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-4 py-16">
          <NewsletterForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
