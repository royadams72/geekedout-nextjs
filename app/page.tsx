"use client";
import { useGetGamesQuery } from "@/api/apiGames";

export default function Home() {
  const { data, isLoading, error } = useGetGamesQuery({});
  console.log(data, isLoading, error);
  return <main>Geeked Out</main>;
}
