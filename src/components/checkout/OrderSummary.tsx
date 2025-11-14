import type { CartItem } from "@/types";
import { formatPrice } from "@/utils/formatter";
import { DELIVERY_COST } from "@/utils/constants";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export const OrderSummary = ({ items, subtotal }: OrderSummaryProps) => {
  const deliveryCost = DELIVERY_COST;
  const total = subtotal + deliveryCost;
  return (
    <div className="bg-light-300 rounded-lg  space-y-4 sticky top-24">
      <h3 className="text-lg font-semibold text-dark-900">Order Summary</h3>
      <div className="space-y-3 border-b border-light-400 p-4 max-h-64 overflow-y-auto">
        {items.map((item) => {
          const price = item.product.discountPrice || item.product.price;
          return (
            <div>
              <img
                src={item.product.imageUrl || "/placeholder.png"}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-dark-900 truncate">
                  {item.product.name}
                </h4>
                <p className="text-xs text-dark-600 mt-1">
                  Qty: {item.quantity}
                  {item.size && ` • Size: ${item.size}`}
                  {item.color && ` • ${item.color}`}
                </p>
                <p className="text-sm font-medium text-dark-900 mt-1">
                  {formatPrice(price * item.quantity)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-2 border-b border-light-400 pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-dark-600">Subtotal</span>
          <span className="font-medium text-dark-900">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-dark-600">Delivery</span>
          <span className="font-medium text-dark-900">
            {formatPrice(deliveryCost)}
          </span>
        </div>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-dark-900">{formatPrice(total)}</span>
      </div>
    </div>
  );
};
