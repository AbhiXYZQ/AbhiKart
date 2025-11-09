import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="text-page-title">
              About Abhi's Kart
            </h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground mb-6">
                Welcome to Abhi's Kart, your trusted source for honest product reviews and smart 
                shopping recommendations. Founded by <strong>Abhishek Kumar</strong>, our mission 
                is to help you make informed purchasing decisions by providing detailed, unbiased 
                reviews across a wide range of product categories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    In-depth analysis and honest opinions on every product we feature
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">
                    To empower smart shopping decisions through comprehensive product insights
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Community First</h3>
                  <p className="text-sm text-muted-foreground">
                    Building a community of informed shoppers who trust our recommendations
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                <p className="text-muted-foreground mb-4">
                  At Abhi's Kart, we believe in transparency and authenticity. Every product we review 
                  is carefully evaluated based on real-world testing and extensive research. We cover 
                  categories including electronics, fashion, home & kitchen, beauty, and lifestyle 
                  products to help you find exactly what you need.
                </p>
                <p className="text-muted-foreground">
                  Whether you're looking for the latest tech gadgets, fashion essentials, or home 
                  improvement products, our detailed reviews and comparisons will guide you to make 
                  the best choice for your needs and budget.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
