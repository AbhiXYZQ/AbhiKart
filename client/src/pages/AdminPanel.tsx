import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save } from "lucide-react";

export default function AdminPanel() {
  const { toast } = useToast();
  const [productForm, setProductForm] = useState({
    title: "",
    category: "",
    price: "",
    rating: "",
    description: "",
    affiliateUrl: "",
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
  });

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: remove mock functionality - implement actual product creation
    console.log("Create product:", productForm);
    toast({
      title: "Product added!",
      description: "The product has been successfully added to the catalog.",
    });
    setProductForm({
      title: "",
      category: "",
      price: "",
      rating: "",
      description: "",
      affiliateUrl: "",
    });
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: remove mock functionality - implement actual blog post creation
    console.log("Create blog post:", blogForm);
    toast({
      title: "Blog post published!",
      description: "Your blog post has been successfully published.",
    });
    setBlogForm({
      title: "",
      category: "",
      excerpt: "",
      content: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8" data-testid="text-page-title">
            Admin Panel
          </h1>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products" data-testid="tab-products">Products</TabsTrigger>
              <TabsTrigger value="blog" data-testid="tab-blog">Blog Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Product
                  </CardTitle>
                  <CardDescription>
                    Create a new product listing with affiliate link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="product-title">Product Title</Label>
                        <Input
                          id="product-title"
                          placeholder="Premium Wireless Headphones"
                          value={productForm.title}
                          onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                          required
                          data-testid="input-product-title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-category">Category</Label>
                        <Select
                          value={productForm.category}
                          onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                        >
                          <SelectTrigger id="product-category" data-testid="select-product-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-price">Price</Label>
                        <Input
                          id="product-price"
                          placeholder="$299.99"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          required
                          data-testid="input-product-price"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-rating">Rating (1-5)</Label>
                        <Input
                          id="product-rating"
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          placeholder="4.5"
                          value={productForm.rating}
                          onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                          required
                          data-testid="input-product-rating"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea
                        id="product-description"
                        placeholder="Enter product description..."
                        rows={4}
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        required
                        data-testid="textarea-product-description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-affiliate">Amazon Affiliate URL</Label>
                      <Input
                        id="product-affiliate"
                        type="url"
                        placeholder="https://www.amazon.com/..."
                        value={productForm.affiliateUrl}
                        onChange={(e) => setProductForm({ ...productForm, affiliateUrl: e.target.value })}
                        required
                        data-testid="input-product-affiliate"
                      />
                    </div>
                    <Button type="submit" className="gap-2" data-testid="button-save-product">
                      <Save className="h-4 w-4" />
                      Save Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Blog Post
                  </CardTitle>
                  <CardDescription>
                    Write a new article or product review
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="blog-title">Post Title</Label>
                        <Input
                          id="blog-title"
                          placeholder="Best Smartphones Under $500"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          required
                          data-testid="input-blog-title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-category">Category</Label>
                        <Select
                          value={blogForm.category}
                          onValueChange={(value) => setBlogForm({ ...blogForm, category: value })}
                        >
                          <SelectTrigger id="blog-category" data-testid="select-blog-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech-reviews">Tech Reviews</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                            <SelectItem value="guides">Guides</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blog-excerpt">Excerpt</Label>
                      <Textarea
                        id="blog-excerpt"
                        placeholder="A brief summary of the blog post..."
                        rows={3}
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        required
                        data-testid="textarea-blog-excerpt"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blog-content">Content</Label>
                      <Textarea
                        id="blog-content"
                        placeholder="Write your blog post content here..."
                        rows={12}
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        required
                        data-testid="textarea-blog-content"
                      />
                    </div>
                    <Button type="submit" className="gap-2" data-testid="button-publish-blog">
                      <Save className="h-4 w-4" />
                      Publish Post
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
