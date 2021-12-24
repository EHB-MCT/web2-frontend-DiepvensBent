let list = [];
window.onload = function () {
    let api = `https://api.spoonacular.com/recipes/random?number=10&apiKey=a005d2dd1ef74ca9894971f26ee60a9d`; //random recipes
    //966c67d47e7545acbb794c9dda82b8d6
    //070422ef646345f9ab1e0cef1a346403
    //a1be97f5ba5e497bb13d1b5afffa6793
    //all working codes 150 "points" each

    async function getData(url) {
        let response = await fetch(url);
        return await response.json();
    }

    getData(api).then(res => {
        list = res.recipes;
        console.log(list);
        let html = '';

        for (let i of list) {

            html += `<div class="recipeBox">
            <div class="dividerDiv">
                <div class="heightInheritorDiv">
                    <img src="${i.image}">
                </div>
                <div class="recipeDiv">
                    <h1>${i.title}</h1>
                    <p>${i.aggregateLikes} Likes - ${i.readyInMinutes} Min</p>
                    <div class="recipeDivDiets">`
            for (let d of i.diets) {
                html += `<p>${d}</p>`
            }
            html += `</div>
                    <a href="#" id="${i.id}" class="scnd">More Info</a> 
                </div>
            </div>
        <a href="#" id="${i.id}" class="btn">Save Recipe</a>
        </div>`

        }

        document.getElementById("recipes").innerHTML = html;
        document.querySelectorAll('.scnd').forEach(b => {
            b.addEventListener('click', event => {

                var item = list.find(a => a.id == b.id)

                let overlayHTML = ''
                overlayHTML += `
                <div class="overlayContent">
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

                overlayHTML += `<h2>Instructions</h2>
                <p>${item.instructions}</p>
                </div>
                `

                document.getElementById('content').innerHTML = overlayHTML;

                var overlay = document.getElementById("overlayID");
                overlay.style.display = "block";
                var span = document.getElementsByClassName("close")[0];
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