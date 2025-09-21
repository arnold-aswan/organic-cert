import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";

import expressJSDocSwagger from "express-jsdoc-swagger";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST", "DELETE", "PUT"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/storage", express.static(path.join(__dirname, "../storage")));

// DB CONNECTION
mongoose
	.connect(process.env.MONGODB_URI as string)
	.then(() => console.log("Connected to Mongo DB"))
	.catch((err) => console.error("Failed to connect to Mongo DB", err));

const options = {
	info: {
		version: "1.0.0",
		title: "Agro-Organic API",
		description: "API docs with express-jsdoc-swagger + TypeScript",
	},
	baseDir: __dirname,
	filesPattern: [
		"./routes/*.ts", // for local dev
		"./routes/*.js", // for when ts-node compiles directly
		"../dist/routes/*.js", // for production build
	],
	swaggerUIPath: "/api-docs",
	exposeSwaggerUI: true,
	exposeApiDocs: true,
	apiDocsPath: "/api-docs.json",
	servers: [
		{
			url: "http://localhost:5000",
			description: "Local development server",
		},
		{
			url: "https://organic-cert.onrender.com",
			description: "Production server",
		},
	],
};

expressJSDocSwagger(app)(options);

app.get("/health", async (req: Request, res: Response) => {
	res.status(200).json({ message: "Green light!" });
});

// http://localhost:5000/api-v1
app.use("/api-v1", routes);

// ERROR MIDDLEWARE
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack, "Error occurred");
	res.status(500).json({ message: "Internal Server Error" });
	next();
});

// NOT FOUND MIDDLEWARE
app.use((req: Request, res: Response) => {
	res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
