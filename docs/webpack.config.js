const path = require('path');



module.exports = {

   

    entry: {

        getFilteredRecipes: '../../js/getFilteredRecipes.js',

        getRandomRecipes: '../../js/getRandomRecipes.js',

        getSavedRecipes: '../../js/getSavedRecipes.js'

    },

    output: {

        path: path.resolve(__dirname, 'docs'),

        filename: '[name].js'

    },

    mode: 'development'

}