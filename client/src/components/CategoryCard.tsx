import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  productCount: number;
  path: string;
  image?: string;
}

export function CategoryCard({ name, icon: Icon, productCount, path, image }: CategoryCardProps) {
  return (
    <Link href={path}>
      <a data-testid={`link-category-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        <Card className="overflow-hidden hover-elevate transition-all duration-300 group cursor-pointer">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon className="h-16 w-16 text-primary" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold mb-1" data-testid={`text-category-${name}`}>{name}</h3>
              <p className="text-sm text-white/90">{productCount}+ Products</p>
            </div>
          </div>
        </Card>
      </a>
    </Link>
  );
}
