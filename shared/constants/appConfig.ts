const prod = {
  url: {
    BASE_URL: "http://localhost:3000",
  },
};

const dev = {
  url: {
    BASE_URL: "http://localhost:3000",
  },
};

export const appConfig = process.env.NODE_ENV === "development" ? dev : prod;
