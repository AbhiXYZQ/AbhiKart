// Nayi file: client/src/pages/BlogPostPage.tsx

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { 
    data: post, 
    isLoading, 
    isError 
  } = useQuery<BlogPost>({
    queryKey: ['/api/blog-posts/slug', slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");
      // Yeh API route aapke 'routes.ts' mein pehle se hai
      const res = await fetch(`/api/blog-posts/slug/${slug}`);
      if (!res.ok) {
        throw new Error('Blog post not found');
      }
      return res.json();
    },
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading post...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card><CardContent className="p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Post not found</h2>
            <p>The blog post you are looking for does not exist.</p>
          </CardContent></Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Image */}
        <div className="h-[400px] w-full overflow-hidden relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <Badge className="mb-4 bg-accent text-accent-foreground">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Content */}
            {/* Tailwind 'prose' class typography ko handle karne ke liye @tailwindcss/typography plugin ka istemaal karti hai, 
              jo aapke 'tailwind.config.ts' mein pehle se install hai.
              Yeh 'content' se aaye HTML/Markdown ko style karega.
            */}
            <Card>
              <CardContent className="p-6">
                <div 
                  className="prose prose-lg max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </CardContent>
            </Card>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}