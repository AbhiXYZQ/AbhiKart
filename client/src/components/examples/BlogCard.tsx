import { BlogCard } from '../BlogCard';
import heroImg from '@assets/generated_images/Hero_banner_background_64ea9cd3.png';

export default function BlogCardExample() {
  return (
    <div className="max-w-2xl">
      <BlogCard
        id="1"
        title="Best Smartphones Under $500 in 2025"
        excerpt="Looking for a budget-friendly smartphone that doesn't compromise on features? We've tested and reviewed the top options available this year."
        image={heroImg}
        category="Tech Reviews"
        date="Nov 8, 2025"
        readTime="5 min read"
        path="/blog/best-smartphones-under-500"
      />
    </div>
  );
}
