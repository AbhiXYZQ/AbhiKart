import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { Star, ExternalLink, Check, X } from "lucide-react";
import { useRoute } from "wouter"; // useRoute को सही से इंपोर्ट करें
import { Navigate } from "wouter"; // Navigate को अलग से या ऐसे इंपोर्ट करें
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function ProductReviewPage() {
    // 1. URL से product ID पढ़ें
    const [, params] = useRoute("/product/:productId");
    const productId = params?.productId;

    // 2. डेटाबेस से सिंगल प्रोडक्ट फ़ेच करें
    const { data: product, isLoading, isError } = useQuery<Product>({
        queryKey: ['/api/products', productId],
        enabled: !!productId, // तभी चलाएँ जब ID उपलब्ध हो
        queryFn: async () => {
            const res = await fetch(`/api/products/${productId}`);
            if (res.status === 404) {
                throw new Error("Product Not Found"); 
            }
            if (!res.ok) {
                throw new Error("Failed to fetch product data");
            }
            return res.json();
        },
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

    // LOADING और ERROR स्टेट
    if (!productId) {
        return <Navigate to="/" />; 
    }
    
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><p>Loading Product Details...</p></div>;
    }

    if (isError || !product) {
        return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1 container mx-auto px-4 py-12 text-center"><h1 className="text-3xl font-bold text-destructive">404 - Product Not Found</h1><p className="text-muted-foreground">The requested product could not be loaded or does not exist.</p></main><Footer /></div>;
    }

    // TODO: remove mock related products - replace with real data from backend (optional)
    const relatedProducts = [
        { id: "2", title: "Latest Smartphone", image: "https://via.placeholder.com/150", price: "$899.99", rating: 4.8, reviewCount: 2341, category: "Electronics" },
        { id: "3", title: "Smart Fitness Watch", image: "https://via.placeholder.com/150", price: "$199.99", rating: 4.6, reviewCount: 1023, category: "Electronics" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Home / {product.category} / <span className="text-foreground">{product.title}</span>
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Product Image */}
                        <div className="space-y-4">
                            <Card className="overflow-hidden">
                                <img
                                    src={product.image} 
                                    alt={product.title}
                                    className="w-full aspect-square object-cover"
                                    data-testid="img-product-main"
                                />
                            </Card>
                        </div>

                        {/* Product Info */}
                        <div>
                            {product.badge && <Badge className="mb-3 bg-accent text-accent-foreground">{product.badge}</Badge>}
                            <h1 className="text-3xl font-bold mb-4" data-testid="text-product-title">
                                {product.title}
                            </h1>
                            
                            <div className="flex items-center gap-2 mb-4">
                                {renderStars(product.rating)}
                                <span className="text-muted-foreground ml-2">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
                            </div>

                            <p className="text-4xl font-bold text-primary mb-6" data-testid="text-product-price">
                                {product.price}
                            </p>

                            <p className="text-muted-foreground mb-6">
                                {product.description}
                            </p>

                            <Button size="lg" className="w-full gap-2 mb-4" data-testid="button-buy-now" asChild>
                                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                                    Buy Now on Amazon
                                    <ExternalLink className="h-5 w-5" />
                                </a>
                            </Button>

                            <Card className="bg-muted/50">
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2">Key Features</h3>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        <li>• Active Noise Cancellation (ANC)</li>
                                        <li>• 30-hour battery life</li>
                                        <li>• Premium leather ear cushions</li>
                                        <li>• Bluetooth 5.0 connectivity</li>
                                        <li>• Foldable design with carrying case</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Detailed Review */}
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
                                        {product.description}
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
                                                <li>• 40mm dynamic drivers</li>
                                                <li>• Frequency range: 20Hz - 20kHz</li>
                                                <li>• Impedance: 32 Ohms</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Connectivity</h4>
                                            <ul className="space-y-1 text-sm text-muted-foreground">
                                                <li>• Bluetooth 5.0</li>
                                                <li>• 3.5mm wired option</li>
                                                <li>• Multi-device pairing</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        
                        {/* Pros & Cons Tab Content */}
                        <TabsContent value="pros-cons" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-green-500/20 bg-green-500/5">
                                    <CardContent className="p-6">
                                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                                            <Check className="h-5 w-5" />
                                            Pros
                                        </h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>• Excellent noise cancellation</li>
                                            <li>• Long battery life</li>
                                            <li>• Superior sound quality</li>
                                            <li>• Comfortable for extended wear</li>
                                            <li>• Premium build quality</li>
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
                                            <li>• Higher price point</li>
                                            <li>• Bulky for travel</li>
                                            <li>• Limited color options</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Verdict Tab Content */}
                        <TabsContent value="verdict" className="mt-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Final Verdict</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        These headphones are an excellent choice for anyone seeking premium audio quality and 
                                        effective noise cancellation. While they come at a higher price point, the superior 
                                        sound quality, long battery life, and exceptional comfort justify the investment. 
                                        Perfect for audiophiles, frequent travelers, and professionals who need to focus in 
                                        noisy environments.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Overall Rating:</span>
                                        {renderStars(product.rating)}
                                        <span className="text-lg font-bold">{product.rating.toFixed(1)}/5</span>
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