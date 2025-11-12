interface ProductOptionsProps {
  sizes: string[];
  colors?: { name: string; hex: string }[];
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: string) => void;
  selectedSize?: string;
  selectedColor?: string;
}

export const ProductOptions = ({
  sizes,
  colors,
  onSizeSelect,
  onColorSelect,
  selectedColor,
  selectedSize,
}: ProductOptionsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-semibold mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`border rounded px-4 py-2 text-sm font-medium ${
                selectedSize === size
                  ? "bg-dark-900 text-white"
                  : "bg-white text-dark-900 hover:bg-light-300"
              }`}
              onClick={() => onSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      {colors && (
        <div>
          <h4 className="text-base font-semibold mb-2">Color</h4>
          <div className="flex flex-wrap gap-2 items-center">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.name
                    ? "border-dark-900"
                    : "border-light-400 hover:border-dark-700"
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => onColorSelect(color.name)}
                type="button"
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
