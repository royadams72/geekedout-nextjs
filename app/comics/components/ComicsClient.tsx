"use client"; // Indicate that this is a client-side component
import { StoreProvider } from "@/app/StoreProvider";
import Category2 from "@/shared/components/category/Category2";

const ComicsDisplayClient = ({ data }: { data: any }) => {
  // Wrap your UI with StoreProvider to use Redux store
  return (
    <StoreProvider preloadedState={{ comics: data }}>
      <Category2 data={data} />
    </StoreProvider>
  );
};

export default ComicsDisplayClient;
