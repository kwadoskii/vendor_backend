import countryRoutes from "./countryRoutes.js";
import userRoutes from "./userRoutes.js";

const registerRoutes = (app) => {
  app.use("/api/countries", countryRoutes);
  app.use("/auth", userRoutes);
};

export default registerRoutes;
