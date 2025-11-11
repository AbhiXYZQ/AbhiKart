import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { Star, ExternalLink, Check, X } from "lucide-react";
import { useRoute } from "wouter";
// Import your product data and images
import headphonesImg from "@assets/generated_images/Wireless_headphones_product_d0c9cf29.png";
import smartphoneImg from "@assets/generated_images/Smartphone_product_shot_52f1a2b5.png";
import smartwatchImg from "@assets/generated_images/Smart_watch_product_707b82da.png";

// Step 1: Central Product Data Array
const allProducts = [
  {
    id: "1",
    title: "Premium Wireless Noise-Cancelling Headphones",
    image: headphonesImg,
    price: "$299.99",
    rating: 4.5,
    reviewCount: 1234,
    category: "Electronics",
    badge: "Best Seller",
    affiliateUrl: "#",
    description: "These premium wireless headphones deliver exceptional audio quality with powerful bass, clear mids, and crisp highs. The active noise cancellation technology effectively blocks out ambient noise, making them perfect for commuting, travel, or focused work sessions. The comfortable over-ear design with memory foam cushions ensures you can wear them for hours without discomfort.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Foldable design with carrying case"
    ],
    audio: [
      "40mm dynamic drivers",
      "Frequency range: 20Hz - 20kHz",
      "Impedance: 32 Ohms"
    ],
    connectivity: [
      "Bluetooth 5.0",
      "3.5mm wired option",
      "Multi-device pairing"
    ],
    pros: [
      "Excellent noise cancellation",
      "Long battery life",
      "Superior sound quality",
      "Comfortable for extended wear",
      "Premium build quality"
    ],
    cons: [
      "Higher price point",
      "Bulky for travel",
      "Limited color options"
    ],
    verdict: "These headphones are an excellent choice for anyone seeking premium audio quality and effective noise cancellation. While they come at a higher price point, the superior sound quality, long battery life, and exceptional comfort justify the investment. Perfect for audiophiles, frequent travelers, and professionals who need to focus in noisy environments.",
    overallRating: 4.5
  },
  {
    id: "2",
    title: "Latest Flagship Smartphone",
    image: smartphoneImg,
    price: "$899.99",
    rating: 4.8,
    reviewCount: 2341,
    category: "Electronics",
    badge: "Editor's Choice",
    affiliateUrl: "#",
    description: "Experience lightning-fast performance, a stunning camera, and a beautiful OLED display in the latest flagship smartphone. Its robust battery and sleek design make it a top choice for mobile enthusiasts.",
    features: [
      "Triple-lens camera system",
      "5G connectivity",
      "Water-resistant design",
      "128GB/256GB storage options",
      "Fast wireless charging"
    ],
    audio: [
      "Stereo speakers",
      "Dolby Atmos support"
    ],
    connectivity: [
      "5G / 4G LTE",
      "Dual SIM support",
      "Wi-Fi 6"
    ],
    pros: [
      "Superb camera quality",
      "Fast performance",
      "Long battery life",
      "Elegant design"
    ],
    cons: [
      "Expensive",
      "No 3.5mm headphone jack"
    ],
    verdict: "Perfect for users who want the best in class smartphone experience with lots of features.",
    overallRating: 4.8
  },
  {
    id: "3",
    title: "Smart Fitness Watch",
    image: smartwatchImg,
    price: "$199.99",
    rating: 4.6,
    reviewCount: 1023,
    category: "Electronics",
    badge: "",
    affiliateUrl: "#",
    description: "Track your health stats, monitor your workouts, and stay connected with this feature-rich smart fitness watch. It offers GPS, heart-rate monitoring, phone notifications, and water resistance.",
    features: [
      "Heart-rate sensor",
      "Built-in GPS",
      "Sleep tracking",
      "Water resistant to 50m",
      "Long battery life"
    ],
    audio: ["Vibration & notification alerts"],
    connectivity: [
      "Bluetooth",
      "Works with Android/iOS"
    ],
    pros: [
      "Lightweight and comfortable",
      "Accurate fitness tracking",
      "Long battery life"
    ],
    cons: [
      "Limited app ecosystem"
    ],
    verdict: "Ideal for fitness enthusiasts who want reliable tracking with the convenience of a smartwatch.",
    overallRating: 4.6
  }
];

// Step 2: Product Review Page — Dynamic
export default function ProductReviewPage() {
  // Get product id from URL
  const [match, params] = useRoute("/product/:id");
  const productId = params?.id;

  // Find selected product
  const selectedProduct = allProducts.find(p => p.id === productId);

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

  if (!selectedProduct) {
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

  // Related products show others except current
  const relatedProducts = allProducts.filter(p => p.id !== selectedProduct.id);

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

              {/* Key Features */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {selectedProduct.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Review Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
              <TabsTrigger value="features" data-testid="tab-features">Features</TabsTrigger>
              <TabsTrigger value="pros-cons" data-testid="tab-pros-cons">Pros & Cons</TabsTrigger>
              <TabsTrigger value="verdict" data-testid="tab-verdict">Verdict</TabsTrigger>
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

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Audio Performance</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {(selectedProduct.audio || []).map((line, i) => (
                          <li key={i}>• {line}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Connectivity</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {(selectedProduct.connectivity || []).map((line, i) => (
                          <li key={i}>• {line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pros-cons" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      Pros
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {(selectedProduct.pros || []).map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                      <X className="h-5 w-5" />
                      Cons
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {(selectedProduct.cons || []).map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="verdict" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Final Verdict</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {selectedProduct.verdict}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Overall Rating:</span>
                    {renderStars(selectedProduct.overallRating)}
                    <span className="text-lg font-bold">{selectedProduct.overallRating}/5</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
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
