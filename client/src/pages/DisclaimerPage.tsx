import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="text-page-title">
              Affiliate Disclaimer
            </h1>

            <Card className="mb-8 border-accent/50 bg-accent/5">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Amazon Associate Disclosure</h2>
                    <p className="text-muted-foreground">
                      As an Amazon Associate, I earn from qualifying purchases. This means that when 
                      you click on certain links on this website and make a purchase, I may receive 
                      a small commission at no additional cost to you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">How Affiliate Links Work</h2>
                <p className="text-muted-foreground">
                  When you click on an affiliate link and make a purchase through Amazon, I may 
                  receive a commission. This commission comes at no extra cost to you and helps 
                  support the operation of this website, allowing me to continue providing quality 
                  content and honest product reviews.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Our Commitment to Honesty</h2>
                <p className="text-muted-foreground">
                  While I may earn commissions from affiliate links, this does not influence my 
                  reviews or recommendations. I am committed to providing honest, unbiased reviews 
                  based on thorough research and testing. I only recommend products that I believe 
                  will provide value to my readers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Product Prices and Availability</h2>
                <p className="text-muted-foreground">
                  The prices displayed on this website are approximate and may not reflect the current 
                  prices on Amazon. Product availability, prices, and specifications are subject to 
                  change without notice. Please check the product page on Amazon for the most current 
                  information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">No Liability</h2>
                <p className="text-muted-foreground">
                  The information provided on this website is for general informational purposes only. 
                  While I strive to keep the information up-to-date and accurate, I make no 
                  representations or warranties of any kind about the completeness, accuracy, 
                  reliability, or suitability of the information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this disclaimer or our affiliate relationships, 
                  please feel free to contact us through our contact page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
