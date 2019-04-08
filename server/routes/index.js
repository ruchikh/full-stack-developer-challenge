const express = require("express");
const articleController = require("./../controllers/article.controller");
const userController = require("./../controllers/user.controller")

const router = express.Router();

router.post("/api/article" ,articleController.postArticle);

router.get("/api/article", articleController.getArticles);

router.get("/api/article/:id", articleController.getArticleDetails);

router.get('/api/addarticle/:id', userController.readArticles);

router.put("/api/article/:id/edit",  articleController.updateArticle);

router.delete("/api/article/:id/delete",  articleController.deleteArticle);

router.get("/api/article/user/:userId",  articleController.getAllArticleByUserId);



router.post('/api/signup', userController.signUp)

router.post('/api/login', userController.logIn);

router.get('/api/isLoggedIn', userController.isLoggedIn );

router.get('/api/logout', userController.logout );

router.get("*", (req, res) => {
  res.render("index");
});

module.exports = router;
