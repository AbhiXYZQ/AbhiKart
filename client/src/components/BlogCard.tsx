import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  path: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  path,
}: BlogCardProps) {
  return (
    <Link href={path}>
      <a data-testid={`link-blog-${id}`}>
        <Card className="overflow-hidden hover-elevate transition-all duration-300 group cursor-pointer">
          <div className="md:flex">
            <div className="md:w-2/5 relative aspect-video md:aspect-square overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-testid={`img-blog-${id}`}
              />
            </div>
            <CardContent className="md:w-3/5 p-6">
              <Badge className="mb-3 bg-accent text-accent-foreground">{category}</Badge>
              <h3 className="text-xl font-semibold mb-2 line-clamp-2" data-testid={`text-blog-title-${id}`}>
                {title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime}</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </a>
    </Link>
  );
}
