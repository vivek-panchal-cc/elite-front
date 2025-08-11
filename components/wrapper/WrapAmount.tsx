import React from "react";
import { CURRENCY_SYMBOL } from "@/lib/constants/all";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface WrapAmountProps
  extends Omit<NumericFormatProps, "value" | "displayType"> {
  value: number | string;
  toFixed?: number;
  affix?: "prefix" | "suffix";
}

const WrapAmount: React.FC<WrapAmountProps> = ({
  value,
  toFixed = 2,
  affix = "prefix",
  ...props
}) => {
  return (
    <NumericFormat
      value={value}
      thousandsGroupStyle="lakh"
      displayType="text"
      decimalScale={toFixed}
      fixedDecimalScale
      thousandSeparator
      allowNegative
      {...(affix === "prefix" ? { prefix: `${CURRENCY_SYMBOL}` } : {})}
      {...(affix === "suffix" ? { suffix: ` ${CURRENCY_SYMBOL}` } : {})}
      {...props}
    />
  );
};

export default WrapAmount;
