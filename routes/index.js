import countryRoutes from "./countryRoutes.js";
import stateRoutes from "./stateRoutes.js";
import userRoutes from "./userRoutes.js";

const registerRoutes = (app) => {
  app.use("/api/countries", countryRoutes);
  app.use("/api/states", stateRoutes);
  app.use("/auth", userRoutes);
};

export default registerRoutes;
