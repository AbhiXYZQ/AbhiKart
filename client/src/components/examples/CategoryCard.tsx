import { CategoryCard } from '../CategoryCard';
import { Smartphone } from 'lucide-react';
import electronicsImg from '@assets/generated_images/Smartphone_product_shot_52f1a2b5.png';

export default function CategoryCardExample() {
  return (
    <div className="max-w-md">
      <CategoryCard
        name="Electronics"
        icon={Smartphone}
        productCount={150}
        path="/category/electronics"
        image={electronicsImg}
      />
    </div>
  );
}
