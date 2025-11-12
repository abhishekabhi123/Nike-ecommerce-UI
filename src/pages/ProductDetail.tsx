import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProductBySlug } from "@/hooks/useProducts";
import { useAddToCart } from "@/hooks/useCart";
import { useFilterStore, useUiStore } from "@/store";
import { Button, LoadingSpinner } from "@/components/common";
import {
  ProductImageCarousel,
  ProductOptions,
  AddToCartSection,
  ProductDescription,
} from "@/components/product-detail";
import { ChevronLeft } from "lucide-react";

export const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const setFilters = useFilterStore((state) => state.setFilters);
  const showToast = useUiStore((state) => state.showToast);

  const { data: product, isLoading, error } = useProductBySlug(slug);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const addToCart = useAddToCart();
  useEffect(() => {
    setFilters({ category: product?.category?.slug });
  }, [product?.category?.slug, setFilters]);

  if (isLoading) {
    return (
      <div className="container-custom py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold text-dark-900 mb-4">
          Product Not Found
        </h1>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  // const images = [product.imageUrl, ...(product.images || [])].filter(Boolean);
  const images = [product.imageUrl, ...(product.images || [])].filter(
    (img): img is string => Boolean(img)
  );

  const handleAddToCart = (quantity: number) => {
    if (product.sizes.length > 0 && !selectedSize) {
      showToast("Please select product size", "error");
    }
    addToCart.mutate({
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };
  return (
    <div className="container-custom py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark-700 hover:text-dark-900 mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageCarousel images={images} altText={product.name} />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-900 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-dark-600">
              {product.category?.name} • ${product.price.toFixed(2)}
            </p>
          </div>
          <ProductOptions
            sizes={product.sizes}
            colors={product.colors}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeSelect={setSelectedSize}
            onColorSelect={setSelectedColor}
          />
          <AddToCartSection
            price={product.price}
            discountPrice={product.discountPrice}
            onAddToCart={handleAddToCart}
          />
          {product.stock > 0 ? (
            <p className="text-sm text-dark-600">{product.stock} items left</p>
          ) : (
            <p className="text-sm text-red font-medium">Out of stock</p>
          )}
          <ProductDescription description={product.description} />
        </div>
      </div>
    </div>
  );
};
