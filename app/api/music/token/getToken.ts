export const getToken = async (): Promise<string> => {
  const response = await fetch("http://localhost:3000/api/music/token/");
  const data = await response.json();
  console.log("token returned ========", data.data);

  return data.data.access_token;
};
