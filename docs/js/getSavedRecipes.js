let list = [];

let savedList = [];

window.onload = function () {
    let dburl = `https://web2-courseproject-backend.herokuapp.com/getRecipes`;
    //https://web2-courseproject-backend.herokuapp.com/getRecipes

    async function getData(dburl) {
        let response = await fetch(dburl, {
            method:'GET',
            mode: 'cors'});
        return await response.json();
    }
    
    getData(dburl).then(list => {
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
                    <a href="#" id="${i.rid}" class="scnd">More Info</a> 
                </div>
            </div>
            <a href="#" id="${i.rid}" class="btn" onclick="deleteRecipe(${i.rid})">Delete Recipe</a>
        </div>
    </div>`

        }

        let main = document.getElementById("recipes");
        main.style.display = "block";

        
        document.getElementById("recipes").innerHTML = html;

        document.querySelectorAll('.scnd').forEach(b => {
            b.addEventListener('click', event => {
                console.log(b);
                console.log(list);
                let item = list.find(a => a.rid == b.id)
                let overlayHTML = ''
                overlayHTML += `
                <div>
                    <span class="close">&times;</span>
                    <h1>${item.title}</h1>
                    <img src="${item.image}">
                    <p>${item.aggregateLikes} Likes - ${item.readyInMinutes} Min</p>
                    <p>`

                for (let c of item.diets) {
                    overlayHTML += `- ${c} `
                }

                overlayHTML += `</p>
                <p>${item.summary}</p>
                    <h2>Ingredient List</h2>`
                
                for (let f of item.extendedIngredients) {
                    overlayHTML += `<p>${f}</p>`
                }

                overlayHTML += `<h2>Instructions</h2>`
                
                
                for(let g of item.analyzedInstructions){
                    overlayHTML +=`<p>${g}</p>`
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
    });
}

function deleteRecipe(rid){
    let url = `https://web2-courseproject-backend.herokuapp.com/DeleteRecipe?id=${rid}`;
    
    async function deleteData(url) {
        let response = await fetch(url, {
            method:'DELETE',
            mode: 'cors'});
        return await response;
    }
    deleteData(url).then(res =>{
        location.reload()});

}

