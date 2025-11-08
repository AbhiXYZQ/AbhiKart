import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { ProductCard } from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost, Product } from "@shared/schema";
import { format } from "date-fns";

export default function BlogPage() {
  const { data: blogPosts = [], isLoading: isLoadingPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const relatedProducts = products.slice(0, 2);

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
              {isLoadingPosts ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading blog posts...</p>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
                </div>
              ) : (
                blogPosts.map((post) => (
                  <BlogCard 
                    key={post.id} 
                    {...post} 
                    date={format(new Date(post.date), "MMM d, yyyy")}
                    path={`/blog/${post.slug}`}
                  />
                ))
              )}
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
                {isLoadingProducts ? (
                  <p className="text-sm text-muted-foreground">Loading products...</p>
                ) : (
                  <div className="space-y-4">
                    {relatedProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        {...product} 
                        badge={product.badge || undefined}
                      />
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
