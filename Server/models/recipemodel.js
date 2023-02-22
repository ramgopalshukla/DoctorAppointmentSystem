const {mongoose } = require("mongoose");


const recipeSchema= new mongoose.Schema({
    image: String,
    name: String,
    ingredients:[],
    instructions:String,

})

const Recipe = mongoose.model("Recipes",recipeSchema);

module.exports = Recipe;