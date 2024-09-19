import { redirect } from "next/navigation";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "GBP" }).format(
    value
  );

export const isNotEmpty = (obj: any = {}): boolean | null | undefined => {
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    return obj?.length !== 0 || null || undefined;
  }
  return Object?.keys?.(obj)?.length !== 0;
};

export const isEmpty = (obj: any = {}): boolean | null | undefined => {
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    return obj?.length === 0;
  }
  return Object?.keys(obj)?.length === 0 || null || undefined;
};

export const checkIfRedirected = (category: any) => {
  console.log(category);

  if (category.redirect) {
    redirect(category.redirect);
    return null;
  }
};
