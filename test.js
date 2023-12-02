const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  message: String,
  references: {
    author: String,
    date: Date,
  },
});

PostSchema.plugin(mongooseFieldEncryption, { 
  fields: ["message", "references"], 
  secret: "some secret key",
  saltGenerator: function (secret) {
    return "1234567890123456"; 

  },
});

const Post = mongoose.model("Post", PostSchema);

const post = new Post({ title: "some text", message: "hello all" });


  console.log(post.title); // some text (only the message field was set to be encrypted via options)
  console.log(post.message); // a9ad74603a91a2e97a803a367ab4e04d:93c64bf4c279d282deeaf738fabebe89
  console.log(post.__enc_message); // true
