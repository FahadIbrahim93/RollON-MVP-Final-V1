import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Star, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';


import { useProducts, useCategories } from '@/hooks/useApi';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, cn } from '@/lib/utils';
import { filterProducts, getNextVisibleCount, getVisibleProducts, INITIAL_VISIBLE_PRODUCTS, resolveCategoryIdFromSlug, sortProducts } from '@/lib/shop';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductSkeleton } from '@/components/ui/ProductSkeleton';


export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_PRODUCTS);

  const sectionRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);

  const { data: products = [], isLoading: isProductsLoading } = useProducts();
  const { data: categories = [] } = useCategories();

  const selectedCategoryId = useMemo(() => resolveCategoryIdFromSlug(categories, selectedCategory), [categories, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, selectedCategoryId, searchQuery);
  }, [products, selectedCategoryId, searchQuery]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  const visibleProducts = useMemo(() => getVisibleProducts(sortedProducts, visibleCount), [sortedProducts, visibleCount]);

  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Best Rating', value: 'rating' },
  ];

  return (
    <main className="min-h-screen bg-[#050505] pt-24">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Curated Header */}
        <section className="relative py-20 lg:py-32 overflow-hidden px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge variant="outline" className="rounded-full border-primary/20 text-primary tracking-[0.3em] font-black px-6 py-2 bg-primary/5 mb-8">
                COLLECTION 2024
              </Badge>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tighter leading-[0.9] mb-8">
                Elevate Your <span className="text-primary italic">Sessions.</span>
              </h1>
              <p className="text-white/60 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
                Explore our ultra-premium selection of accessories, where industrial engineering meets artisan craft.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intelligence Bar */}
        <section className="sticky top-20 z-40 bg-[#050505]/80 backdrop-blur-2xl border-y border-white/5 px-4 sm:px-6 lg:px-12 xl:px-20 py-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative group flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Find your aesthetic..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(INITIAL_VISIBLE_PRODUCTS);
                  }}
                  className="pl-11 pr-4 py-6 bg-white/[0.03] border-white/10 rounded-2xl focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all text-white placeholder:text-white/20"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className={cn("h-12 w-12 rounded-2xl lg:hidden transition-all", isFilterVisible && "bg-primary text-black border-primary")}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-[1.25rem]">
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchParams({});
                  setVisibleCount(INITIAL_VISIBLE_PRODUCTS);
                }}
                className={cn(
                  "rounded-xl px-6 h-10 text-sm font-bold tracking-tight transition-all",
                  selectedCategory === 'all'
                    ? "bg-primary text-black hover:bg-primary shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                Discover All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="ghost"
                  onClick={() => {
                    setSearchParams({ category: cat.slug });
                    setVisibleCount(INITIAL_VISIBLE_PRODUCTS);
                  }}
                  className={cn(
                    "rounded-xl px-6 h-10 text-sm font-bold tracking-tight transition-all",
                    selectedCategory === cat.slug
                      ? "bg-primary text-black hover:bg-primary shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
              <span className="text-white/50 text-sm font-medium tracking-wide tabular-nums">
                {sortedProducts.length} <span className="text-[10px] uppercase font-black ml-1">Items Found</span>
              </span>

              <div className="flex items-center gap-2">
                <div className="relative group min-w-[200px]">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setVisibleCount(INITIAL_VISIBLE_PRODUCTS);
                    }}
                    className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-sm font-bold text-white/60 hover:text-white hover:border-primary/30 appearance-none focus:outline-none transition-all cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#111] text-white py-2">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-primary pointer-events-none transition-colors" />
                </div>

              </div>
            </div>
          </div>

          {/* Mobile Filter Sheet (Expansion) */}
          <AnimatePresence>
            {isFilterVisible && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-8 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchParams({});
                      setVisibleCount(INITIAL_VISIBLE_PRODUCTS);
                      setIsFilterVisible(false);
                    }}
                    className={cn(
                      "rounded-2xl h-14 font-bold border-white/10",
                      selectedCategory === 'all' && "bg-primary text-black border-primary"
                    )}
                  >
                    All Items
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant="outline"
                      onClick={() => {
                        setSearchParams({ category: cat.slug });
                        setVisibleCount(INITIAL_VISIBLE_PRODUCTS);
                        setIsFilterVisible(false);
                      }}
                      className={cn(
                        "rounded-2xl h-14 font-bold border-white/10",
                        selectedCategory === cat.slug && "bg-primary text-black border-primary"
                      )}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Product Matrix */}
        <section ref={sectionRef} className="px-4 sm:px-6 lg:px-12 xl:px-20 py-24">
          {isProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="group relative flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                        {/* Visual Interface */}
                        <Link to={`/product/${product.slug}`} className="relative aspect-[4/5] block overflow-hidden bg-white/[0.02]">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23111" width="400" height="500"/%3E%3C/svg%3E`;
                            }}
                          />

                          {/* Interaction Overlay */}
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 z-20">
                            <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-primary px-8 font-black tracking-tight">
                              <Link to={`/product/${product.slug}`}>VIEW SPECIFICATIONS</Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="lg"
                              onClick={(e) => { e.preventDefault(); addItem(product); }}
                              className="px-8 font-bold text-white hover:text-primary"
                            >
                              <ShoppingCart className="w-5 h-5 mr-3" />
                              QUICK ADD
                            </Button>
                          </div>

                          {product.badge && (
                            <div className="absolute top-6 left-6 z-30">
                              <Badge className={cn(
                                "px-3 py-1 text-xs font-black tracking-tighter rounded-full shadow-lg border-white/10 backdrop-blur-md",
                                product.badge.includes('%') ? 'bg-red-500/90 text-white' : 'bg-primary/90 text-black'
                              )}>
                                {product.badge}
                              </Badge>
                            </div>
                          )}
                        </Link>

                        {/* Metadata */}
                        <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black">{product.category}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-primary fill-primary" />
                                <span className="text-[10px] text-white/50 font-bold tabular-nums">{product.rating}</span>
                              </div>
                            </div>
                            <Link to={`/product/${product.slug}`}>
                              <h3 className="text-xl font-display font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            <span className="text-2xl font-black text-white tracking-tighter tabular-nums">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-white/50 line-through font-light tabular-nums">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty Intelligence */}
              {sortedProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-40 space-y-8"
                >
                  <div className="w-32 h-32 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Search className="w-12 h-12 text-white/10" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-display font-black text-white tracking-tighter">Negative Match Found</h3>
                    <p className="text-white/60 text-lg max-w-sm mx-auto">None of our current artifacts match your specific criteria. Try reframing your search.</p>
                  </div>
                  <Button
                    onClick={() => { setSearchQuery(''); setSearchParams({}); setVisibleCount(INITIAL_VISIBLE_PRODUCTS); }}
                    className="rounded-full bg-white text-black hover:bg-primary px-12 h-14 font-black shadow-2xl"
                  >
                    Reset Exploration
                  </Button>
                </motion.div>
              )}

              {visibleCount < sortedProducts.length && (
                <div className="mt-16 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount((prev) => getNextVisibleCount(prev))}
                    className="rounded-full border-white/10 hover:bg-white/5 hover:text-white px-12 h-14 text-sm font-black tracking-widest text-white/60 shadow-2xl"
                  >
                    LOAD MORE ITEMS
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
