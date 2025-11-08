import { ProductCard } from '../ProductCard';
import headphonesImg from '@assets/generated_images/Wireless_headphones_product_d0c9cf29.png';

export default function ProductCardExample() {
  return (
    <div className="max-w-sm">
      <ProductCard
        id="1"
        title="Premium Wireless Noise-Cancelling Headphones"
        image={headphonesImg}
        price="$299.99"
        rating={4.5}
        reviewCount={1234}
        category="Electronics"
        badge="Best Seller"
      />
    </div>
  );
}
