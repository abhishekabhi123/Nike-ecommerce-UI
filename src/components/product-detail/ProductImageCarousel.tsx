import { useState } from "react";

interface ProductImageCarouselProps {
  images: string[];
  altText: string;
}

export const ProductImageCarousel = ({
  images,
  altText,
}: ProductImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (images.length === 0) {
    return (
      <img
        src="/placeholder.png"
        alt={altText}
        className="w-full rounded-lg object-cover"
      />
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`${altText} + (${currentIndex + 1} of ${images.length})`}
        className="w-full rounded-lg object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-light-300"
            onClick={handlePrev}
            aria-label="Previous Image"
          >
            &#8592;
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-light-300"
            onClick={handleNext}
            aria-label="Next Image"
          >
            &#8594;
          </button>
        </>
      )}
    </div>
  );
};
