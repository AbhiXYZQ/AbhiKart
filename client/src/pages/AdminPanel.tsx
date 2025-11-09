import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, Save, Edit, Trash2, LogOut } from "lucide-react";
import type { Product, BlogPost } from "@shared/schema";

export default function AdminPanel() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: 'product' | 'blog'; id: string } | null>(null);

  const { data: user, isLoading: isLoadingUser } = useQuery<{ id: string; username: string }>({
    queryKey: ['/api/auth/user'],
    queryFn: async () => {
      const res = await fetch('/api/auth/user', {
        credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Not authenticated');
          }
          return res.json();
          },
    retry: false,
  });

  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!user,
  });

  const { data: blogPosts = [], isLoading: isLoadingBlogs } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
    enabled: !!user,
  });

  const [productForm, setProductForm] = useState({
    title: "",
    category: "",
    price: "",
    rating: "4.5",
    reviewCount: "0",
    description: "",
    affiliateUrl: "",
    image: "",
    badge: "",
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    readTime: "",
    slug: "",
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest('POST', '/api/auth/login', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      toast({ title: "Logged in successfully" });
      setLocation('/admin');
    },
    onError: () => {
      toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/auth/logout'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      toast({ title: "Logged out successfully" });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/products', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product created successfully" });
      resetProductForm();
    },
    onError: () => {
      toast({ title: "Failed to create product", variant: "destructive" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await apiRequest('PATCH', `/api/products/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product updated successfully" });
      setEditingProduct(null);
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product deleted successfully" });
      setShowDeleteConfirm(null);
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    },
  });

  const createBlogPostMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/blog-posts', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({ title: "Blog post created successfully" });
      resetBlogForm();
    },
    onError: () => {
      toast({ title: "Failed to create blog post", variant: "destructive" });
    },
  });

  const updateBlogPostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await apiRequest('PATCH', `/api/blog-posts/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({ title: "Blog post updated successfully" });
      setEditingBlogPost(null);
    },
    onError: () => {
      toast({ title: "Failed to update blog post", variant: "destructive" });
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/blog-posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({ title: "Blog post deleted successfully" });
      setShowDeleteConfirm(null);
    },
    onError: () => {
      toast({ title: "Failed to delete blog post", variant: "destructive" });
    },
  });

  const resetProductForm = () => {
    setProductForm({
      title: "",
      category: "",
      price: "",
      rating: "4.5",
      reviewCount: "0",
      description: "",
      affiliateUrl: "",
      image: "",
      badge: "",
    });
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: "",
      category: "",
      excerpt: "",
      content: "",
      image: "",
      readTime: "",
      slug: "",
    });
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...productForm,
      rating: parseFloat(productForm.rating),
      reviewCount: parseInt(productForm.reviewCount),
      badge: productForm.badge || undefined,
    };
    createProductMutation.mutate(data);
  };

  const handleProductUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const data = {
      ...productForm,
      rating: parseFloat(productForm.rating),
      reviewCount: parseInt(productForm.reviewCount),
      badge: productForm.badge || undefined,
    };
    updateProductMutation.mutate({ id: editingProduct.id, data });
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBlogPostMutation.mutate(blogForm);
  };

  const handleBlogUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogPost) return;
    updateBlogPostMutation.mutate({ id: editingBlogPost.id, data: blogForm });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      category: product.category,
      price: product.price,
      rating: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
      description: product.description,
      affiliateUrl: product.affiliateUrl,
      image: product.image,
      badge: product.badge || "",
    });
  };

  const startEditBlogPost = (blogPost: BlogPost) => {
    setEditingBlogPost(blogPost);
    setBlogForm({
      title: blogPost.title,
      category: blogPost.category,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      image: blogPost.image,
      readTime: blogPost.readTime,
      slug: blogPost.slug,
    });
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Login to access the admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                    data-testid="input-username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    data-testid="input-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loginMutation.isPending} data-testid="button-login">
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold" data-testid="text-page-title">
              Admin Panel
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Welcome, {user.username}</span>
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products" data-testid="tab-products">Products</TabsTrigger>
              <TabsTrigger value="blog" data-testid="tab-blog">Blog Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
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
                          required
                        >
                          <SelectTrigger id="product-category" data-testid="select-product-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Fashion">Fashion</SelectItem>
                            <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                            <SelectItem value="Beauty">Beauty</SelectItem>
                            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
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
                      <div className="space-y-2">
                        <Label htmlFor="product-reviews">Review Count</Label>
                        <Input
                          id="product-reviews"
                          type="number"
                          min="0"
                          placeholder="0"
                          value={productForm.reviewCount}
                          onChange={(e) => setProductForm({ ...productForm, reviewCount: e.target.value })}
                          required
                          data-testid="input-product-reviews"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-image">Image URL</Label>
                        <Input
                          id="product-image"
                          placeholder="https://example.com/image.jpg"
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          required
                          data-testid="input-product-image"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-badge">Badge (optional)</Label>
                        <Input
                          id="product-badge"
                          placeholder="Best Seller"
                          value={productForm.badge}
                          onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                          data-testid="input-product-badge"
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
                    <Button type="submit" className="gap-2" disabled={createProductMutation.isPending} data-testid="button-save-product">
                      <Save className="h-4 w-4" />
                      {createProductMutation.isPending ? "Saving..." : "Save Product"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Products</CardTitle>
                  <CardDescription>Manage your product catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingProducts ? (
                    <p>Loading products...</p>
                  ) : products.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No products yet. Add your first product above.</p>
                  ) : (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.title}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>{product.rating} ⭐</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => startEditProduct(product)}
                                  data-testid={`button-edit-product-${product.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowDeleteConfirm({ type: 'product', id: product.id })}
                                  data-testid={`button-delete-product-${product.id}`}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
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
                          required
                        >
                          <SelectTrigger id="blog-category" data-testid="select-blog-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tech Reviews">Tech Reviews</SelectItem>
                            <SelectItem value="Fashion">Fashion</SelectItem>
                            <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                            <SelectItem value="Beauty">Beauty</SelectItem>
                            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                            <SelectItem value="Guides">Guides</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-slug">Slug</Label>
                        <Input
                          id="blog-slug"
                          placeholder="best-smartphones-under-500"
                          value={blogForm.slug}
                          onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                          required
                          data-testid="input-blog-slug"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-readtime">Read Time</Label>
                        <Input
                          id="blog-readtime"
                          placeholder="5 min read"
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          required
                          data-testid="input-blog-readtime"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="blog-image">Image URL</Label>
                        <Input
                          id="blog-image"
                          placeholder="https://example.com/image.jpg"
                          value={blogForm.image}
                          onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                          required
                          data-testid="input-blog-image"
                        />
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
                    <Button type="submit" className="gap-2" disabled={createBlogPostMutation.isPending} data-testid="button-publish-blog">
                      <Save className="h-4 w-4" />
                      {createBlogPostMutation.isPending ? "Publishing..." : "Publish Post"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Blog Posts</CardTitle>
                  <CardDescription>Manage your blog content</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingBlogs ? (
                    <p>Loading blog posts...</p>
                  ) : blogPosts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No blog posts yet. Create your first post above.</p>
                  ) : (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {blogPosts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium">{post.title}</TableCell>
                              <TableCell>{post.category}</TableCell>
                              <TableCell>{post.slug}</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => startEditBlogPost(post)}
                                  data-testid={`button-edit-blog-${post.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowDeleteConfirm({ type: 'blog', id: post.id })}
                                  data-testid={`button-delete-blog-${post.id}`}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProductUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-product-title">Product Title</Label>
                <Input
                  id="edit-product-title"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-category">Category</Label>
                <Select
                  value={productForm.category}
                  onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                  required
                >
                  <SelectTrigger id="edit-product-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-price">Price</Label>
                <Input
                  id="edit-product-price"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-rating">Rating</Label>
                <Input
                  id="edit-product-rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={productForm.rating}
                  onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-reviews">Review Count</Label>
                <Input
                  id="edit-product-reviews"
                  type="number"
                  value={productForm.reviewCount}
                  onChange={(e) => setProductForm({ ...productForm, reviewCount: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-image">Image URL</Label>
                <Input
                  id="edit-product-image"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-badge">Badge (optional)</Label>
                <Input
                  id="edit-product-badge"
                  value={productForm.badge}
                  onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-product-description">Description</Label>
              <Textarea
                id="edit-product-description"
                rows={4}
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-product-affiliate">Amazon Affiliate URL</Label>
              <Input
                id="edit-product-affiliate"
                type="url"
                value={productForm.affiliateUrl}
                onChange={(e) => setProductForm({ ...productForm, affiliateUrl: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateProductMutation.isPending}>
                {updateProductMutation.isPending ? "Updating..." : "Update Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingBlogPost} onOpenChange={() => setEditingBlogPost(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>Update blog post content</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBlogUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-blog-title">Title</Label>
                <Input
                  id="edit-blog-title"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-blog-category">Category</Label>
                <Select
                  value={blogForm.category}
                  onValueChange={(value) => setBlogForm({ ...blogForm, category: value })}
                  required
                >
                  <SelectTrigger id="edit-blog-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Reviews">Tech Reviews</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Guides">Guides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-blog-slug">Slug</Label>
                <Input
                  id="edit-blog-slug"
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-blog-readtime">Read Time</Label>
                <Input
                  id="edit-blog-readtime"
                  value={blogForm.readTime}
                  onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-blog-image">Image URL</Label>
                <Input
                  id="edit-blog-image"
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-blog-excerpt">Excerpt</Label>
              <Textarea
                id="edit-blog-excerpt"
                rows={3}
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-blog-content">Content</Label>
              <Textarea
                id="edit-blog-content"
                rows={8}
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingBlogPost(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateBlogPostMutation.isPending}>
                {updateBlogPostMutation.isPending ? "Updating..." : "Update Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {showDeleteConfirm?.type === 'product' ? 'product' : 'blog post'}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (showDeleteConfirm?.type === 'product') {
                  deleteProductMutation.mutate(showDeleteConfirm.id);
                } else if (showDeleteConfirm?.type === 'blog') {
                  deleteBlogPostMutation.mutate(showDeleteConfirm.id);
                }
              }}
              disabled={deleteProductMutation.isPending || deleteBlogPostMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteProductMutation.isPending || deleteBlogPostMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
