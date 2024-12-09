import { redirect } from "next/navigation";

export const checkIfRedirected = (category: any) => {
  if (category.redirect) {
    redirect(category.redirect);
  }
  return null;
};
