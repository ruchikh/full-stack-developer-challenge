const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  title: {type:String, unique:true},
  body: String,
  author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
  upvote: [{type: Schema.Types.ObjectId, ref:"User"}],

}, 
{timestamps: true}
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
