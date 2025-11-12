import React, { useState } from "react";
import { Button } from "../common";

interface AddToCartSelectionProps {
  price: number;
  discountedPrice?: number;
  onAddToCart: (quantity: number) => void;
}

export const AddToCartSelection = ({
  price,
  discountedPrice,
  onAddToCart,
}: AddToCartSelectionProps) => {
  const [quantity, setQuantity] = useState(1);

  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const increment = () => setQuantity((q) => q + 1);

  const displayPrice = discountedPrice || price;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-light-400 rounded-full">
          <button
            onClick={decrement}
            className="px-4 py-2 text-lg font-semibold hover:bg-light-300 rounded-l-full"
            aria-label="Decrease quantity"
            type="button"
          >
            -
          </button>
          <span className="px-5 py-2 font-medium">{quantity}</span>
          <button
            onClick={increment}
            className="px-4 py-2 text-lg font-semibold hover:bg-light-300 rounded-r-full"
            aria-label="Increase quantity"
            type="button"
          >
            +
          </button>
        </div>
        <p className="text-2xl font-semibold text-dark-900">
          ${displayPrice.toFixed(2)}
        </p>
      </div>
      <Button onClick={() => onAddToCart(quantity)}>Add to Cart</Button>
    </div>
  );
};
