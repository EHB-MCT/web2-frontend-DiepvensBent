const path = require('path');



module.exports = {

   

    entry: {

        getFilteredRecipes: './docs/getFilteredRecipes.js',

        getRandomRecipes: './docs/getRandomRecipes.js',

        getSavedRecipes: './docs/getSavedRecipes.js'

    },

    output: {

        path: path.resolve(__dirname, 'docs'),

        filename: '[name].js'

    },

    mode: 'development'

}