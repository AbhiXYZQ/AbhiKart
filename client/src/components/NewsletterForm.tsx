import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: remove mock functionality - implement actual newsletter subscription
      console.log("Newsletter subscription:", email);
      setIsSubscribed(true);
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive the latest deals and reviews in your inbox.",
      });
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Stay Updated!</CardTitle>
        <CardDescription className="text-base">
          Get the latest product reviews and exclusive deals delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              data-testid="input-newsletter-email"
            />
            <Button type="submit" data-testid="button-subscribe">
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 text-primary py-3">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Thanks for subscribing!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
