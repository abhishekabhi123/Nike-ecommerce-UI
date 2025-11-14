import { formatPrice } from "@/utils/formatter";
import { Button } from "@/components/common";
import { DELIVERY_COST } from "@/utils/constants";

interface CartSummaryProps {
  subTotal: number;
  itemCount: number;
  handleCheckout: () => void;
  isLoading?: boolean;
}

export const CartSummary = ({
  subTotal,
  itemCount,
  handleCheckout,
  isLoading,
}: CartSummaryProps) => {
  const deliveryCost = subTotal > 0 ? DELIVERY_COST : 0;
  const total = subTotal + deliveryCost;
  return (
    <div className="bg-light-300 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-dark-900">Order Summary</h3>
      <div className="space-y-2 border-b border-light-400 pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-dark-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium text-dark-900">
            {formatPrice(subTotal)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-dark-600">Delivery</span>
          <span className="font-medium text-dark-900">
            {formatPrice(deliveryCost)}
          </span>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-dark-900">{formatPrice(total)}</span>
        </div>
        <Button
          onClick={handleCheckout}
          isLoading={isLoading}
          className="w-full"
        >
          Proceed to Checkout
        </Button>
        <p className="text-xs text-center text-dark-600">
          Free shipping on orders over $100
        </p>
      </div>
    </div>
  );
};
