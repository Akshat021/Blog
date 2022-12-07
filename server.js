import express from "express";
import router from "./routes/articles.js";
import mongoose from "mongoose";
import Articles from "./models/articles.js";
import methodOverride from "method-override";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Articles.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", router);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening at Port ${process.env.PORT}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};
connect();
