import React from "react";

interface ProductDescriptionProps {
  description?: string;
}

export const ProductDescription = ({
  description,
}: ProductDescriptionProps) => {
  if (!description) return null;
  return (
    <section className="prose max-w-none text-dark-900">
      <h4 className="text-xl font-bold mb-4">Product Description</h4>
      <p>{description}</p>
    </section>
  );
};
