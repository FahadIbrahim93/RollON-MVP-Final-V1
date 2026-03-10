import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { ProductCard } from '@/components/shop/ProductCard';
import { Footer } from '@/sections/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import { FadeIn } from '@/components/animations/FadeIn';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  const product = products.find((p) => p.slug === slug);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
      });
    }
  };

  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <FadeIn className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/shop" className="hover:text-foreground transition-colors">
                Shop
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to={`/shop?category=${product.category.toLowerCase().replace(' ', '-')}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.name}</span>
            </nav>
          </FadeIn>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Images */}
            <FadeIn>
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {productImages.length > 1 && (
                  <div className="flex gap-2">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index
                            ? 'border-primary'
                            : 'border-transparent'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                {/* Category & Badges */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.new && <Badge className="bg-green-500">New</Badge>}
                  {product.salePrice && <Badge className="bg-red-500">Sale</Badge>}
                </div>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl font-bold font-['Poppins'] text-foreground">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">
                    ৳{(product.salePrice || product.price).toLocaleString()}
                  </span>
                  {product.salePrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ৳{product.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-green-500">
                        In Stock ({product.stock} available)
                      </span>
                    </>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="px-3 py-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 flex-1">
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isWishlisted ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </Button>
                    <Button size="lg" variant="outline">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  {[
                    { icon: Truck, text: 'Free Delivery' },
                    { icon: Shield, text: 'Secure Payment' },
                    { icon: RotateCcw, text: 'Easy Returns' },
                  ].map((feature) => (
                    <div key={feature.text} className="text-center">
                      <feature.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Tabs */}
          <FadeIn delay={0.2} className="mb-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Experience the difference with our premium quality products.
                    Each item is carefully selected and tested to ensure the best
                    experience for our customers. We source only from trusted
                    manufacturers who share our commitment to excellence.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                {product.specifications ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between p-4 bg-card rounded-lg"
                      >
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No specifications available.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Reviews coming soon!
                  </p>
                  <Button variant="outline">Write a Review</Button>
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <FadeIn delay={0.3}>
              <div className="border-t border-border pt-16">
                <h2 className="text-2xl font-bold font-['Poppins'] text-foreground mb-8">
                  You May Also Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
