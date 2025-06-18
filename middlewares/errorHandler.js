const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Error";
  let errors = err.message;

  //Validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
    errors = Object.values(err.errors).map((e) => e.message.replaceAll("`", ""));
  }

  //Duplicate error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate error";

    const duplicatedField = Object.keys(err.keyPattern)[0];
    errors = `The ${duplicatedField} "${err.keyValue[duplicatedField]}" is already in use.`;
  }

  // Defaults to 500
  res.status(statusCode).json({ message, errors });
};

export default errorHandler;
