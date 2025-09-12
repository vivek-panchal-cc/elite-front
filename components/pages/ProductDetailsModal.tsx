import React from "react";
import { Button } from "@/components/ui/ButtonUI";
import { cartLabels, commonLabels } from "@/lib/labels";
import Image from "next/image";
import WrapAmount from "../wrapper/WrapAmount";
import { Product } from "@/types/product";
import { noProduct, outOfStock } from "../images";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

interface ProductDetailsModalProps {
  setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  details: Product;
}

const ProductDetailsModal = ({
  setModalClose,
  details,
}: ProductDetailsModalProps) => {
  if (!details) return null;
  return (
    <div className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="p-4 md:p-5 border-b bg-[var(--color-blue)]">
        <h2 className="text-xl font-bold text-left text-[var(--color-white)]">
          {cartLabels.productDetails}
        </h2>
      </div>

      {/* Product Info */}
      <div className="flex-1 custom-scrollbar overflow-y-auto p-6 space-y-6">
        <div className="flex flex-col items-center gap-4">
          {/* Product Image */}
          <Image
            src={
              details.gcerp_product_status
                ? details.prod_image
                  ? `${imageBaseUrl}/medium/${details.prod_image}`
                  : noProduct
                : outOfStock
            }
            alt={details.prod_name || details.prod_long_name}
            width={200}
            height={200}
            className="object-contain rounded p-4"
          />

          {/* Name + SKU */}
          <div className="text-center">
            <h3 className="font-semibold text-lg">
              {details.prod_long_name || details.prod_name}
            </h3>
            <p className="text-sm text-[var(--color-gray)]">
              {" "}
              {details.prod_sku}
            </p>
          </div>

          {/* Prices */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-base font-bold text-[var(--color-blue)]">
              <WrapAmount value={details.prod_original_price} />
            </span>
            {/* <span className="text-sm text-[var(--color-gray)]">
              Purchase Price: <WrapAmount value={details.prod_purchase_price} />
            </span> */}
          </div>

          {/* Stock */}
          {/* <div className="text-sm text-gray-600">
            Stock Available: {details.prod_stock_qty}
          </div> */}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-[var(--color-white)] sticky bottom-0">
        <Button
          type="button"
          className="w-full rounded-[50px]"
          onClick={() => setModalClose(false)}
        >
          {commonLabels.okay}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
