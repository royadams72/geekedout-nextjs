export const getToken = async () => {
  const response = await fetch("http://localhost:3000/api/music/token/");
  const data = await response.json();
  return data.data.access_token;
};
