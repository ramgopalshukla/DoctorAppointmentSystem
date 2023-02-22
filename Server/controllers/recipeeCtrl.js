const Recipe= require('../models/recipemodel');



const getRecipe = async (user, query) => {
if (query.q) {
    let Recipes = await Recipe.find({ recipeename: { $regex: query.q } });
    console.log(posts);
    return Recipes;
  }

  let Recipes = await Recipe.find();

  return Recipes;
};



module.exports={getRecipe}
