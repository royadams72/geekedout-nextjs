import React from "react";

const CategoryItem = ({
  items,
}: // children,
{
  items: any;
  // children: React.ReactNode;
}) => {
  return (
    <>
      {/* {children}{" "} */}
      {items?.map((item: any) => (
        <li key={item.id}>{item.title} `from`</li>
      ))}{" "}
    </>
  );
};

export default CategoryItem;
