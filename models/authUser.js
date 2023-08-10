const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const authUserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});
 
 
// Create a model based on that schema
const AuthUser = mongoose.model("User", authUserSchema);
 
 
// export the model
module.exports = AuthUser;