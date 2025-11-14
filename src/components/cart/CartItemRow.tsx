import { X } from "lucide-react";
import type { CartItem } from "@/types";
import { formatPrice } from "@/utils/formatter";

interface cartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
  isUpdating?: boolean;
}

export const CartItemRow = ({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}: cartItemRowProps) => {
  const price = item.product.discountPrice || item.product.price;
  const total = price * item.quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 1;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };
  const increment = () => onUpdateQuantity(item.id, item.quantity + 1);
  const decrement = () => {
    if (item.quantity > 1) onUpdateQuantity(item.id, item.quantity - 1);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-light-400">
      <img
        src={item.product.imageUrl || "/placeholder.png"}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-base font-medium text-dark-900">
          {item.product.name}
        </h3>
        <p className="text-sm text-dark-700 mt-1">
          {item.product.category?.name}
        </p>
        <div className="flex gap-4 mt-2 text-sm">
          {item.size && (
            <span className="text-dark-700">
              Size: <span className="font-medium">{item.size}</span>
            </span>
          )}
          {item.color && (
            <span className="text-dark-700">
              Color: <span className="font-medium">{item.color}</span>
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-light-400 rounded-full">
            <button
              onClick={decrement}
              disabled={isUpdating}
              className="px-3 py-1 hover:bg-light-300 disabled:opacity-50"
            >
              −
            </button>
            <input
              type="number"
              value={item.quantity}
              disabled={isUpdating}
              onChange={handleQuantityChange}
              className="w-12 text-center border-0 focus:ring-0 disabled:opacity-50"
            />
            <button
              onClick={increment}
              disabled={isUpdating}
              className="px-3 py-1 hover:bg-light-300 disabled:opacity-50"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-light font-medium text-dark-900">
              {formatPrice(total)}
            </p>
            <p className="text-sm text-dark-700">{formatPrice(price)} each</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        disabled={isUpdating}
        className="p-2 hover:bg-red/10 rounded-lg transition-colors disabled:opacity-50"
        aria-label="Remove item"
      >
        <X className="w-5 h-5 text-red" />
      </button>
    </div>
  );
};
