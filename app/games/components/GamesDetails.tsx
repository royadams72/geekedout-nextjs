import React, { useState } from "react";

import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { formatDate } from "@/utils/date-functions";

import { GameDetail } from "@/shared/interfaces/game";
import { formatCurrency } from "@/utils/currency";
import { useConvertCurr } from "@/lib/hooks/useConvertCurr";

const GamesDetails = ({ gameDetail }: { gameDetail: GameDetail }) => {
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
      <h1 className={styles.details_title}>{gameDetail?.name}</h1>
      <h4>
        <span className={styles.details_alt_colour}>Price: </span>
        {displayValue}
      </h4>
      <h4>
        <span className={styles.details_alt_colour}>Published Date: </span>
        {formatDate(gameDetail?.published_date)}
      </h4>
      <h4>
        <span className={styles.details_alt_colour}>Game Type: </span>
        {gameDetail?.type}
      </h4>
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

export default GamesDetails;
