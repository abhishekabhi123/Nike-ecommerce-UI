import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks";
import { LoadingSpinner } from "@/components/common";
import { CartItemRow, CartSummary, EmptyCart } from "@/components/cart";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const { data: cartData, isLoading } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();

  if (isLoading) {
    return (
      <div className="container-custom py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const items = cartData?.items || [];
  const subtotal = parseFloat(cartData?.total || "0") - 2.0; // Subtract delivery cost
  if (items.length === 0) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark-900 mb-8">Shopping Cart</h1>
        <EmptyCart />
      </div>
    );
  }

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    updateCartItem.mutate({
      itemId,
      data: { quantity },
    });
  };
  const handleRemove = (itemId: number) => {
    removeFromCart.mutate(itemId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-dark-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"></div>
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
              isUpdating={updateCartItem.isPending || removeFromCart.isPending}
            />
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <CartSummary
          subTotal={subtotal}
          itemCount={items.length}
          handleCheckout={handleCheckout}
          isLoading={updateCartItem.isPending}
        />
      </div>
    </div>
  );
};
