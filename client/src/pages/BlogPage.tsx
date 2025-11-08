import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { ProductCard } from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import heroImg from "@assets/generated_images/Hero_banner_background_64ea9cd3.png";
import headphonesImg from "@assets/generated_images/Wireless_headphones_product_d0c9cf29.png";
import smartphoneImg from "@assets/generated_images/Smartphone_product_shot_52f1a2b5.png";

export default function BlogPage() {
  // TODO: remove mock functionality - replace with real data from backend
  const blogPosts = [
    {
      id: "1",
      title: "Best Smartphones Under $500 in 2025",
      excerpt: "Looking for a budget-friendly smartphone that doesn't compromise on features? We've tested and reviewed the top options available this year.",
      image: heroImg,
      category: "Tech Reviews",
      date: "Nov 8, 2025",
      readTime: "5 min read",
      path: "/blog/best-smartphones-under-500",
    },
    {
      id: "2",
      title: "Top 10 Kitchen Appliances Every Home Needs",
      excerpt: "Transform your cooking experience with these essential kitchen appliances that combine functionality with modern design.",
      image: heroImg,
      category: "Home & Kitchen",
      date: "Nov 7, 2025",
      readTime: "8 min read",
      path: "/blog/top-kitchen-appliances",
    },
  ];

  const relatedProducts = [
    {
      id: "1",
      title: "Premium Wireless Headphones",
      image: headphonesImg,
      price: "$299.99",
      rating: 4.5,
      reviewCount: 1234,
      category: "Electronics",
    },
    {
      id: "2",
      title: "Latest Flagship Smartphone",
      image: smartphoneImg,
      price: "$899.99",
      rating: 4.8,
      reviewCount: 2341,
      category: "Electronics",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8" data-testid="text-page-title">
            Blog & Reviews
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-2 space-y-6">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Popular Articles */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Popular Articles</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-sm hover:text-primary transition-colors">
                        Ultimate Guide to Smart Home Devices 2025
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm hover:text-primary transition-colors">
                        Best Wireless Earbuds for Fitness
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm hover:text-primary transition-colors">
                        Skincare Routine for Beginners
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Related Products */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Featured Products</h3>
                <div className="space-y-4">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
