export async function GET() {
  const res = await fetch(
    "https://5fgecpaslh.execute-api.eu-west-2.amazonaws.com/stagev1/games",
    {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'API-Key': process.env.DATA_API_KEY,
      // },
    }
  );
  const data = await res.json();
  // console.log(data);

  return Response.json({ data });
}
