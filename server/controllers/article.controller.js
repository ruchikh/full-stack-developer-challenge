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
    console.log(id, "delete article")
    Article.findOneAndRemove(id, (err, articles) => {
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
  },

  getAllArticleByUserId: (req, res) => {
    const id = req.params.userId;
    console.log(id, "userIdauthor")
    Article.find({author: id}, (err, article) => {
      if(err) res.json({
        err: "can not get article"
      })
        res.json(article)                                                                   
    })
  },

  upvotePost: (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;
    console.log(userId,postId,"new chwck")
    Article.findByIdAndUpdate(postId, {$addToSet: {upvote: userId}}, (err, article) => {
      if(err) res.json({
        err: "can not add likes"
      })
      Article.find({_id:postId}).populate("author").exec((err, article) => {
      if (err) {
        res.json({
          msg: Error
        });
      } else {
        res.json( article );
      }
    });
    })
  }
};                                                    
