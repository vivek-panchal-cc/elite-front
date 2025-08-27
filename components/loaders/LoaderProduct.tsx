import ContentLoader from "react-content-loader";

interface LoaderProductProps {
  count?: number;
}

const LoaderProduct = ({ count = 5 }: LoaderProductProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="bg-[var(--color-white)] p-2 rounded-lg">
            <ContentLoader
              speed={2}
              width="100%"
              height={250}
              viewBox="0 0 200 250"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              {/* Product Image */}
              <rect x="0" y="0" rx="8" ry="8" width="200" height="140" />

              {/* Product Title */}
              <rect x="10" y="150" rx="4" ry="4" width="180" height="16" />
              <rect x="10" y="170" rx="4" ry="4" width="140" height="16" />

              {/* Price */}
              <rect x="10" y="195" rx="4" ry="4" width="80" height="20" />

              {/* Add to Cart Button */}
              <rect x="10" y="225" rx="20" ry="20" width="180" height="20" />
            </ContentLoader>
          </div>
        ))}
    </div>
  );
};

export default LoaderProduct;
