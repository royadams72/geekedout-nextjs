import Link from "next/link";

import { useConvertCurr } from "@/lib/hooks/useConvertCurr";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

import styles from "@/styles/components/_detail.module.scss";

import { GameDetail } from "@/types/interfaces/game";

const Game = ({ gameDetail }: { gameDetail: GameDetail }) => {
  const amountStr = gameDetail?.worth.replace("$", "");
  const currency = isNaN(Number(amountStr)) ? null : Number(amountStr);

  const { convertedAmount, loading } = useConvertCurr(currency as number);

  const displayValue = loading
    ? "Converting currency..."
    : convertedAmount !== null
    ? formatCurrency(convertedAmount)
    : "N/A";

  return (
    <>
      <h2>
        <span className={styles.details_alt_colour}>Price: </span>
        {displayValue}
      </h2>
      <h2>
        <span className={styles.details_alt_colour}>Published Date: </span>
        {formatDate(gameDetail?.published_date)}
      </h2>
      <h2>
        <span className={styles.details_alt_colour}>Game Type: </span>
        {gameDetail?.type}
      </h2>
      {gameDetail?.platforms && (
        <p className={styles.details_copy}>
          <span className={styles.details_alt_colour}>Platforms: </span>
          {gameDetail?.platforms}
        </p>
      )}

      {gameDetail?.description && (
        <p className={styles.details_copy}>
          <span className={styles.details_alt_colour}>Description: </span>
          {gameDetail?.description}
        </p>
      )}
      <div className={styles.details_copy_last}>
        <p className={styles.details_copy}>
          <span className={styles.details_alt_colour}>Instructions: </span>
          {gameDetail?.instructions}
        </p>
      </div>
      {gameDetail?.gamerpower_url && (
        <Link href={gameDetail?.gamerpower_url} target="_blank" className="btn">
          View on Game Power
        </Link>
      )}
    </>
  );
};

export default Game;
