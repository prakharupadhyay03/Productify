import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express';

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Apply Clerk only to API routes (important!)
app.use("/api", clerkMiddleware());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Productify API - Powered by PostgresSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);




const port = ENV.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is up and running on PORT: ${port}`);
  });
}

export default app;
