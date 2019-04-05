const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
