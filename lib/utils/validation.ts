export const isNotEmpty = (obj: any = {}): boolean => {
  if (Object?.prototype?.toString?.call(obj) === "[object Array]") {
    return obj?.length !== 0;
  }
  return Object?.keys?.(obj)?.length !== 0;
};

export const isEmpty = (obj: any = {}): boolean => {
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    return obj?.length === 0;
  }
  return Object?.keys(obj)?.length === 0;
};
