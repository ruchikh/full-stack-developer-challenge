const Article = require("./../models/Article");

module.exports = {
  postArticle: (req, res) => {
    const reqBody = req.body;
    const newArticle = new Article(req.body);
    newArticle.save((err, article) => {
      if (err) {
        res.json({
          msg: Error
        });
      } else {
        res.json({
          article
        });
      }
    });
  },

  getArticles: (req, res) => {
    Article.find((err, allArticles) => {
      if (err) {
        res.json({
          msg: Error
        });
      } else {
        res.json({ allArticles });
      }
    });
  },

  getArticleDetails: (req, res) => {
    const id = req.params.id;
    Article.find({ _id: id }).populate("author").exec((err, article) => {
      if (err) throw err;
      res.json(article);
    });
  },
  
  updateArticle: (req, res) => {
    const reqBody = req.body;
    const id = req.params.id;
    Article.findByIdAndUpdate(
      { _id: id },
      { title: reqBody.title, body: reqBody.body },
      (err, blog) => {
        if (err) {
          res.send(err);
        } else {
          res.json(blog);
        }
      }
    );
  },

  deleteArticle: (req, res) => {
    const id = req.params.id
    Article.findOneAndDelete(id, (err, articles) => {
      if(err) return res.json({
        err: "can not delete article"
      })
        Article.find({}, (err, articles) => {
          if(err) return res.json({
            err: "can not get Article"
          })
            res.json(articles)
        })
    })
  }
};
