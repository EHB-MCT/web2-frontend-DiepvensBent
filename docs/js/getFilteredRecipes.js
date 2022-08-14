let list = [];
let nr = 0;
//filters= whole30, vegetarian, vegan, gluten free, dairy free, lacto ovo vegetarian, pescaterian, paleo: paleolithic, primal, ketogenic

function checkButtons() {
    let checkedButton
    let radioButtons = document.getElementsByName("diet");
        for(let i = 0, length = radioButtons.length; i < length;i++){
            if (radioButtons[i].checked) {
                checkedButton = radioButtons[i].value;
            }    
        }
    console.log(checkedButton);
    filterRecipes(checkedButton);
}


function filterRecipes(checkedButton) {
    
    let api = `https://api.spoonacular.com/recipes/complexSearch?diet=${checkedButton}&sort=random&number=10&apiKey=a1be97f5ba5e497bb13d1b5afffa6793&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`;
    //966c67d47e7545acbb794c9dda82b8d6
    //070422ef646345f9ab1e0cef1a346403
    //a1be97f5ba5e497bb13d1b5afffa6793
    //all working codes, 150 "points" each, every search is 1.x points so every code is worth a bit less than 150 searches
    async function getData(url) {
        let response = await fetch(url);
        return await response.json();
    }

    getData(api).then(res => {
        list = res.results;
        console.log(list);
        let html = '';


        for (let i of list) {
            
            html += `<div class="recipeBox">
            <div class="dividerDiv">
                <img src="${i.image}">
                <hr>
                <div class="recipeDiv">
                    <h1>${i.title}</h1>
                    <p>${i.aggregateLikes} Likes - ${i.readyInMinutes} Min</p>
                    <p>`
                    for (let d of i.diets) {
                        html += ` - ${d}`
                    }
                    html += `</p>
                    <a href="#" id="${i.id}" class="scnd">More Info</a> 
                </div>
            </div>
            <a href="#" id="${nr}" class="btn" onclick="saveRecipe(${nr})">Save Recipe</a>
        </div>
    </div>`
        nr++;
        }

        let main = document.getElementById("recipes");
        main.style.display = "block";


        document.getElementById("recipes").innerHTML = html;

        document.querySelectorAll('.scnd').forEach(b => {
            b.addEventListener('click', event => {

                let item = list.find(a => a.id == b.id)

                let overlayHTML = ''
                overlayHTML += `
                <div>
                    <span class="close">&times;</span>
                    <h1>${item.title}</h1>
                    <img src="${item.image}">
                    <p>${item.aggregateLikes} Likes - ${item.readyInMinutes} Min</p>
                    <p>`

                for (let c of item.diets) {
                    overlayHTML += `${c}`
                }

                overlayHTML += `</p>
                <p>${item.summary}</p>
                    <h2>Ingredient List</h2>`
                
                for (let f of item.extendedIngredients) {
                    overlayHTML += `<p>${f.original}</p>`
                }

                overlayHTML += `<h2>Instructions</h2>`
                
                console.log(item.analyzedInstructions[0].steps);
                for(let g of item.analyzedInstructions[0].steps){
                    overlayHTML +=`<p>${g.number}: ${g.step}</p>`
                }
                overlayHTML +=`</div>`



                document.getElementById('content').innerHTML = overlayHTML;

                let overlay = document.getElementById("overlayID");
                overlay.style.display = "block";
                let span = document.getElementsByClassName("close")[0];
                span.onclick = function () {
                    overlay.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == overlay) {
                        overlay.style.display = "none";
                    }
                }
            })
        })



        
        nr = 0;
    });

}


function saveRecipe(nr) {
    console.log(list[nr]);
    let recipe = list[nr]
    let recipeBody = {
                        "rid": recipe.id,
                        "image": recipe.image,
                        "title": recipe.title,
                        "aggregateLikes": recipe.aggregateLikes,
                        "readyInMinutes": recipe.readyInMinutes,
                        "diets": recipe.diets,
                        "summary": "recipe.summary",// did with and without "" summary is quite big and takes in quite some space in console thats why ""
                        "extendedIngedients": recipe.extendedIngredients,
                        "analyzedInstructions": recipe.analyzedInstructions
                    }

    
    

    console.log(recipeBody);
    let dburl = `https://web2-courseproject-backend.herokuapp.com/saveRecipe`;
    async function getData(dburl) {

            let response = await fetch(dburl, {
                method:'POST',
                mode: 'cors',
                body: JSON.stringify(recipeBody)
            });
            return await response;
        }
        
        getData(dburl)
        .then((data)=> {
            console.log('connected:', data);
        });
        
    }


