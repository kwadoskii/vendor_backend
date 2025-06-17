import countryRoutes from "./countryRoutes.js";

const registerRoutes = (app) => {
  app.use("/api/countries", countryRoutes);
};

export default registerRoutes;
