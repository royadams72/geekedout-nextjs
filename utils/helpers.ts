import { redirect } from "next/navigation";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "GBP" }).format(
    value
  );

export const isNotEmpty = (obj: any = {}): boolean | null | undefined => {
  if (Object?.prototype?.toString?.call(obj) === "[object Array]") {
    return obj?.length !== 0;
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
  if (category.redirect) {
    redirect(category.redirect);
  }
  return null;
};

export const formatDate = (isoString: string, withTime: boolean = false) => {
  // Parse the ISO string to a Date object
  const date = new Date(isoString);

  // Extract individual components with leading zeros
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date as day/month/year
  const formattedDate = `${day}/${month}/${year}`;

  // Optional: Format the time if needed
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  if (withTime) {
    return `${formattedDate} ${formattedTime}`;
  }
  return `${formattedDate}`;
};
