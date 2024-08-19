"use server";

import { clearStoreForDetailsPage } from "@/lib/store/serverSideStore";

export const update = async () => {
  await clearStoreForDetailsPage();
};
