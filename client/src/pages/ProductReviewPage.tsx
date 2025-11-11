import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { Star, ExternalLink } from "lucide-react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query"; // [!!!] useQuery import kiya gaya
import type { Product } from "@shared/schema"; // [!!!] Product type schema se import kiya gaya

// [!!!] Poora static 'allProducts' array yahaan se hata diya gaya hai.

// Product Review Page — Ab yeh dynamic hai
export default function ProductReviewPage() {
  // URL se product id praapt karein
  const [match, params] = useRoute("/product/:id");
  const productId = params?.id;

  // [!!!] API se product fetch karne ke liye useQuery ka istemaal karein
  const { 
    data: selectedProduct, 
    isLoading, 
    isError 
  } = useQuery<Product>({
    queryKey: ['/api/products', productId], // Product ID se key banayein
    queryFn: async () => {
      if (!productId) throw new Error("No product ID");
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) {
        // Yeh 'isError' state ko trigger karega
        throw new Error('Product not found');
      }
      return res.json();
    },
    enabled: !!productId, // Yeh tabhi run hoga jab productId maujood ho
    retry: false, // 404 par retry na karein
  });

  // [!!!] Related products ko category ke adhaar par fetch karein
  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/category', selectedProduct?.category],
    queryFn: async () => {
      if (!selectedProduct?.category) return [];
      const res = await fetch(`/api/products/category/${encodeURIComponent(selectedProduct.category)}`);
      if (!res.ok) throw new Error('Failed to fetch related products');
      return res.json();
    },
    // select ka istemaal karke current product ko list se filter karein aur sirf 3 dikhayein
    select: (data) => data.filter(p => p.id !== selectedProduct?.id).slice(0, 3),
    enabled: !!selectedProduct, // Yeh tabhi run hoga jab main product load ho chuka ho
  });


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 ${
          i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  // [!!!] Loading state add karein
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // [!!!] Error state (ya product na milne par)
  if (isError || !selectedProduct) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card><CardContent className="p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <p>The product you are looking for does not exist.</p>
          </CardContent></Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Ab 'selectedProduct' database se aaya hua data hai
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <p className="text-sm text-muted-foreground mb-6">
            Home / {selectedProduct.category} / <span className="text-foreground">{selectedProduct.title}</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full aspect-square object-cover"
                  data-testid="img-product-main"
                />
              </Card>
            </div>

            {/* Product Info */}
            <div>
              {selectedProduct.badge && (
                <Badge className="mb-3 bg-accent text-accent-foreground">{selectedProduct.badge}</Badge>
              )}
              <h1 className="text-3xl font-bold mb-4" data-testid="text-product-title">
                {selectedProduct.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                {renderStars(selectedProduct.rating)}
                <span className="text-muted-foreground ml-2">
                  {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-primary mb-6" data-testid="text-product-price">
                {selectedProduct.price}
              </p>
              <p className="text-muted-foreground mb-6">
                {selectedProduct.description}
              </p>

              <Button size="lg" className="w-full gap-2 mb-4" data-testid="button-buy-now"
                onClick={() => window.open(selectedProduct.affiliateUrl, "_blank")}>
                Buy Now on Amazon
                <ExternalLink className="h-5 w-5" />
              </Button>

              {/* [!!!] Key Features section hata diya gaya hai kyonki 'features' array schema mein nahi hai */}
            </div>
          </div>

          {/* [!!!] Tabs ko simplify kiya gaya hai sirf 'description' dikhane ke liye */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
              {/* 'Features', 'Pros & Cons', 'Verdict' tabs hata diye gaye hain */}
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Baaki tabs ke content hata diye gaye hain */}

          </Tabs>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl font-bold mb-6" data-testid="text-related-products">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
