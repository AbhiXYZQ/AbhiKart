import { Link } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Electronics", path: "/category/electronics" },
    { name: "Fashion", path: "/category/fashion" },
    { name: "Home & Kitchen", path: "/category/home-kitchen" },
    { name: "Beauty", path: "/category/beauty" },
    { name: "Lifestyle", path: "/category/lifestyle" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer" data-testid="link-home">
              <div className="text-2xl font-bold text-primary">Abhi's Kart</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((category) => (
              <Link key={category.path} href={category.path}>
                <div
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                  data-testid={`link-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category.name}
                </div>
              </Link>
            ))}
            <Link href="/blog">
              <div className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer" data-testid="link-blog">
                Blog
              </div>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-mobile"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link key={category.path} href={category.path}>
                  <div
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </div>
                </Link>
              ))}
              <Link href="/blog">
                <div
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </div>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
