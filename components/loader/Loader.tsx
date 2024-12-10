import styles from "@/styles/components/_loader.module.scss";
const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}> </div>
    </div>
  );
};

export default Loader;
