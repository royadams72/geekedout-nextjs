export const isEmpty = (obj: any = {}): boolean => {
  if (Object?.keys?.(obj)?.length > 0) {
    let noValue = 0;
    for (const value of Object.values(obj)) {
      if (!value) {
        noValue++;
      }
    }
    if (Object?.keys?.(obj)?.length === noValue) {
      return true;
    }
  }
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    return obj?.length === 0;
  }
  return Object?.keys(obj)?.length === 0;
};

export const isNotEmpty = (obj: any = {}): boolean => !isEmpty(obj);
