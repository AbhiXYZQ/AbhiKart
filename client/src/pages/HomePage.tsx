import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Footer } from "@/components/Footer";
import { Smartphone, ShoppingBag, Home, Sparkles, Dumbbell } from "lucide-react";
import headphonesImg from "@assets/generated_images/Wireless_headphones_product_d0c9cf29.png";
import smartphoneImg from "@assets/generated_images/Smartphone_product_shot_52f1a2b5.png";
import handbagImg from "@assets/generated_images/Fashion_handbag_product_50bd0aac.png";
import coffeeMakerImg from "@assets/generated_images/Coffee_maker_appliance_d0be156c.png";
import serumImg from "@assets/generated_images/Skincare_serum_product_1ebaaf55.png";
import yogaMatImg from "@assets/generated_images/Yoga_mat_product_067e6db4.png";
import smartwatchImg from "@assets/generated_images/Smart_watch_product_707b82da.png";
import lampImg from "@assets/generated_images/Desk_lamp_product_36683480.png";

export default function HomePage() {
  // TODO: remove mock functionality - replace with real data from backend
  const categories = [
    { name: "Electronics", icon: Smartphone, productCount: 150, path: "/category/electronics", image: smartphoneImg },
    { name: "Fashion", icon: ShoppingBag, productCount: 200, path: "/category/fashion", image: handbagImg },
    { name: "Home & Kitchen", icon: Home, productCount: 180, path: "/category/home-kitchen", image: coffeeMakerImg },
    { name: "Beauty", icon: Sparkles, productCount: 120, path: "/category/beauty", image: serumImg },
    { name: "Lifestyle", icon: Dumbbell, productCount: 90, path: "/category/lifestyle", image: yogaMatImg },
  ];

  const topDeals = [
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
      badge: "Hot Deal",
    },
    {
      id: "3",
      title: "Designer Leather Handbag",
      image: handbagImg,
      price: "$159.99",
      rating: 4.6,
      reviewCount: 567,
      category: "Fashion",
    },
    {
      id: "4",
      title: "Smart Coffee Maker with Timer",
      image: coffeeMakerImg,
      price: "$89.99",
      rating: 4.4,
      reviewCount: 891,
      category: "Home & Kitchen",
    },
    {
      id: "5",
      title: "Anti-Aging Vitamin C Serum",
      image: serumImg,
      price: "$34.99",
      rating: 4.7,
      reviewCount: 1456,
      category: "Beauty",
      badge: "Trending",
    },
    {
      id: "6",
      title: "Premium Yoga Mat - Extra Thick",
      image: yogaMatImg,
      price: "$49.99",
      rating: 4.5,
      reviewCount: 678,
      category: "Lifestyle",
    },
    {
      id: "7",
      title: "Smart Fitness Watch with Heart Monitor",
      image: smartwatchImg,
      price: "$199.99",
      rating: 4.6,
      reviewCount: 1023,
      category: "Electronics",
    },
    {
      id: "8",
      title: "LED Desk Lamp with USB Charging",
      image: lampImg,
      price: "$45.99",
      rating: 4.3,
      reviewCount: 445,
      category: "Home & Kitchen",
    },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topDeals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
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
