function errorHandler(err: any, req: any, res: any, next: any) {
    // Log the error for debugging
    console.error(err);
  
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({ message: "The user is not authorized" });
    }
  
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", details: err.message });
    }
  
    // Generic error handler
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
  
  export {errorHandler};
  