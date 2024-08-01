"use client";
// import { handleAlbums } from "@/app/api/music/albums/";
import React, { useState, useEffect } from "react";

const AlbumDetails = ({ params: { id } }: { params: { id: string } }) => {
  const [albumDetails, setAlbumDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        // const response = await fetch(`/api/music/get-details?id=${id}`);
        const response = await fetch(`/api/music/get-details?id=${id}`);
        console.log(response);
        const result = await response.json();

        if (response.ok) {
          setAlbumDetails(result.data);
        } else {
          setError(result.error);
          console.log(response);
        }
      } catch (err) {
        setError("An error occurred while fetching the album details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Album Details</h1>
      {albumDetails ? (
        <pre>{JSON.stringify(albumDetails, null, 2)}</pre>
      ) : (
        <div>No album details found.</div>
      )}
    </div>
  );
};

export default AlbumDetails;
