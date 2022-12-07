import express from "express";
const router = express.Router();
import Article from "../models/articles.js";

router.get("/new", (req, res) => {
  res.render("articles/new", { article: {} });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.put("/:id", async (req, res) => {
  let article = await Article.findById(req.params.id);
  article.title = req.body.title;
  article.markdown = req.body.markdown;
  article.description = req.body.description;
  article.save();
  res.render("articles/show", { article: article });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article === null) res.redirect("/");
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res) => {
  const { title, description, markdown } = req.body;
  try {
    const article = await Article.create({ title, description, markdown });
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    console.log(error);
    res.render("articles/new", { article: { title, description, markdown } });
  }
});

// we have to install method-override bcz forms only uses get and post request
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

export default router;
