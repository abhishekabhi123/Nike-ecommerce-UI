import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { formatPrice } from "@/utils/formatter";

interface ProductCardProps {
  product: Product;
}

export const ProductCart = ({ product }: ProductCardProps) => {
  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;

  return (
    <Link to={`/products/${product.slug}`} className="group">
      <div className="bg-light-300 rounded-lg overflow-hidden mb-3 aspect-square">
        <img
          src={product.imageUrl || product.images[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-1">
        {product.badge && (
          <p className="text-orange text-sm font-medium">{product.badge}</p>
        )}
        <h3 className="text-base font-medium text-dark-900 line-clamp-2">
          {product.name}
        </h3>
        {product.category && (
          <p className="text-sm text-dark-400">{product.category.name}</p>
        )}
        <div className="flex items-center gap-2">
          <p className="text-base font-medium text-dark-900">
            {formatPrice(displayPrice)}
          </p>
          {hasDiscount && (
            <p className="text-sm text-dark-400 line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex  items-center gap-1 mt-2">
            {product.colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-light-400"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              ></div>
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-dark-400 ml-1">
                {" "}
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
