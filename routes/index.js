import serviceTypeRoutes from "./serviceTypeRoutes.js";
import countryRoutes from "./countryRoutes.js";
import stateRoutes from "./stateRoutes.js";
import userRoutes from "./userRoutes.js";
import vendorRoutes from "./vendorRoutes.js";
import serviceRoutes from "./serviceRoutes.js";

const registerRoutes = (app) => {
  app.use("/api/countries", countryRoutes);
  app.use("/api/states", stateRoutes);
  app.use("/api/servicetype", serviceTypeRoutes);
  app.use("/api/vendors", vendorRoutes);
  app.use("/api/services", serviceRoutes);
  app.use("/auth", userRoutes);
};

export default registerRoutes;
