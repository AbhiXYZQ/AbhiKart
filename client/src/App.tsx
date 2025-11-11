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

// [!!!] Step 1: Naye SearchPage ko import karein [!!!]
import SearchPage from "@/pages/SearchPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/category/:categoryName" component={CategoryPage} />
      <Route path="/product/:productId" component={ProductReviewPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/admin" component={AdminPanel} />
      
      {/* [!!!] Step 2: SearchPage ka route yahaan add karein (NotFound se theek pehle) [!!!] */}
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
