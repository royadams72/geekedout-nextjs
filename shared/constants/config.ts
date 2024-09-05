const prod = {
  url: {
    BASE_URL: "https://my-heroku-app.herokuapp.com/api/v1/",
  },
};

const dev = {
  url: {
    BASE_URL: "http://localhost:3000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
