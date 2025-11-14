import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/common";
import { useNavigate } from "react-router-dom";

export const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-20">
      <ShoppingCart className="w-16 h-16 mx-auto text-light-600 mb-4" />
      <h2 className="text-2xl font-bold text-dark-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-dark-600 mb-8">Add some items to get started</p>
      <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
    </div>
  );
};
