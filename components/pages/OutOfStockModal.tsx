import React, { useState } from "react";
import { Button } from "@/components/ui/ButtonUI";
import { cartLabels, commonLabels } from "@/lib/labels";
import Image from "next/image";
import { productOne } from "../images";
import WrapAmount from "../wrapper/WrapAmount";

interface OutOfStockModalProps {
  setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: any[];
}

const OutOfStockModal = ({ setModalClose, data }: OutOfStockModalProps) => {
  return (
    <div className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg flex flex-col h-[80vh]">
      {/* Header */}
      <div className="p-4 md:p-5 border-b">
        <h2 className="text-xl font-bold text-left text-[var(--color-blue)]">
          {cartLabels.outOfStock}
        </h2>
      </div>

      {/* Product List */}
      <div className="flex-1 custom-scrollbar overflow-y-auto p-6 space-y-4">
        {data.map((product, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border rounded-lg p-3"
          >
            {/* Product Info */}
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm">{product.prod_name}</span>
              <span className="text-xs text-[var(--color-gray)]">
                Basket: {product.basket_quantity} | Stock:{" "}
                {product.prod_stock_quantity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Footer */}
      {/* <div className="p-4 border-t bg-[var(--color-white)] sticky bottom-0">
        <Button
          type="submit"
          className="w-full rounded-[50px]"
          onClick={() => setModalClose(false)}
        >
          {commonLabels.okay}
        </Button>
      </div> */}
    </div>
  );
};

export default OutOfStockModal;
