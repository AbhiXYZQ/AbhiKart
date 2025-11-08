import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nainix Dev</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted source for honest product reviews and smart shopping recommendations.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-social-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-social-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-social-youtube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-contact">
                    Contact
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-blog">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-admin">
                    Admin Panel
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/electronics">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Electronics</a>
                </Link>
              </li>
              <li>
                <Link href="/category/fashion">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Fashion</a>
                </Link>
              </li>
              <li>
                <Link href="/category/home-kitchen">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Home & Kitchen</a>
                </Link>
              </li>
              <li>
                <Link href="/category/beauty">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Beauty</a>
                </Link>
              </li>
              <li>
                <Link href="/category/lifestyle">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Lifestyle</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-privacy">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-disclaimer">
                    Disclaimer
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Nainix Dev by Abhishek Kumar. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 rounded-full shadow-lg"
        onClick={scrollToTop}
        data-testid="button-back-to-top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
}
