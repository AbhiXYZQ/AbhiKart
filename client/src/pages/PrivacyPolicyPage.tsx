import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="text-page-title">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: November 8, 2025
            </p>

            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  Nainix Dev ("we," "us," or "our") respects your privacy and is committed to 
                  protecting your personal data. This privacy policy explains how we collect, use, 
                  and safeguard your information when you visit our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Email addresses (when you subscribe to our newsletter)</li>
                  <li>Contact information (when you submit a contact form)</li>
                  <li>Usage data and analytics (through cookies and similar technologies)</li>
                  <li>Device and browser information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To send newsletters and updates (if you've subscribed)</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To improve our website and content</li>
                  <li>To analyze website usage and trends</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to enhance your browsing 
                  experience and analyze website traffic. You can control cookie settings through 
                  your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites and services, including 
                  Amazon. We are not responsible for the privacy practices of these third parties. 
                  We encourage you to review their privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your 
                  personal data. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Unsubscribe from our newsletter at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us through our contact page.
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
