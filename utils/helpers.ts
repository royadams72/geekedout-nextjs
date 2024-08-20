export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "GBP" }).format(
    value
  );

export const isNotEmpty = (obj: any = {}): boolean => {
  return Object?.keys(obj)?.length !== 0;
};

export const isEmpty = (obj: any = {}): boolean => {
  return Object?.keys(obj)?.length === 0;
};
