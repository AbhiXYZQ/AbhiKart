import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import ProductReviewPage from "@/pages/ProductReviewPage";
import BlogPage from "@/pages/BlogPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/not-found";
import SearchPage from "@/pages/SearchPage";

// [!!!] NAYE BLOG POST PAGE KO IMPORT KAREIN [!!!]
import BlogPostPage from "@/pages/BlogPostPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/category/:categoryName" component={CategoryPage} />
      <Route path="/product/:productId" component={ProductReviewPage} />
      
      {/* Yeh route blog list page (saare posts) ke liye hai */}
      <Route path="/blog" component={BlogPage} />
      
      {/* [!!!] ISS ROUTE KO UPDATE KAREIN [!!!] */}
      {/* Ise 'BlogPage' se badal kar 'BlogPostPage' karein */}
      <Route path="/blog/:slug" component={BlogPostPage} />
      
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/search" component={SearchPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
