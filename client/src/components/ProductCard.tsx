import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  rating: number;
  reviewCount: number;
  category: string;
  badge?: string;
  affiliateUrl?: string;
}

export function ProductCard({
  id,
  title,
  image,
  price,
  rating,
  reviewCount,
  category,
  badge,
  affiliateUrl = "#",
}: ProductCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-accent text-accent"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 group">
      <div className="relative aspect-square overflow-hidden bg-card">
        {badge && (
          <Badge className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground">
            {badge}
          </Badge>
        )}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid={`img-product-${id}`}
        />
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-2">{category}</p>
        <h3 className="font-semibold text-base mb-2 line-clamp-2 min-h-[3rem]" data-testid={`text-title-${id}`}>
          {title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {renderStars(rating)}
          <span className="text-sm text-muted-foreground ml-1">
            ({reviewCount})
          </span>
        </div>
        <p className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
          {price}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full gap-2"
          onClick={() => window.open(affiliateUrl, '_blank')}
          data-testid={`button-buy-${id}`}
        >
          Buy on Amazon
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
