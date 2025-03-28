import Image from "next/image";

import styles from "@/styles/components/_category.module.scss";

import Loader from "../loader/Loader";

const CategoryLoader = ({ title }: { title: string }) => {
  const itemsArray = Array.from({ length: 6 }, (v, k) => k + 1);
  return (
    <>
      <div>
        <Loader />
        <div className={styles.category}>
          <h1 className={styles[`category__header_${title.toLowerCase()}`]}>
            {`${title} loading...`}
          </h1>
          <div className={styles.category__items_container}>
            {itemsArray.map((item: number) => (
              <div key={item} className={styles.category__item_firstPage}>
                <div className={styles.category__image_container}>
                  <div className={styles.category__image}>
                    <Image
                      src={"/images/defaultImage.png"}
                      alt={title}
                      fill
                      loading="lazy"
                      sizes="25vw, 25vh"
                      unoptimized={true}
                    />
                  </div>
                </div>
                <p className={styles.category__footer}>
                  <span className={styles.category__title}></span>
                </p>
              </div>
            ))}
          </div>
          ;
        </div>
      </div>
    </>
  );
};

export default CategoryLoader;
