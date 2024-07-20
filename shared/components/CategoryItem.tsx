import React from "react";

import styles from "@/styles/core/_category.module.scss";
import { Preview } from "../interfaces/preview";

const CategoryItem = ({
  // items,
  // itemsRenderer,
  children,
}: {
  // items: any;
  // itemsRenderer: any;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h1>Category Items</h1>
      {children}
    </>
  );
};

export default CategoryItem;
