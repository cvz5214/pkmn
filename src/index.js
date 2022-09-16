// gives the function to the click event for the button
document.querySelector("#send").addEventListener("click", getPokemon);

// functions for string formatting
function lowerCaseName(string) {
    return string.toLowerCase();
}
function firstLetterCapital(string)
{
    return string.charAt(0).toUpperCase()+string.substr(1).toLowerCase();
}

// funtion to add the base stats
function addBaseStats(var1,var2,var3,var4,var5,var6) {
    return (var1+var2+var3+var4+var5+var6)
}

// function to get a specific pokemon
function getPokemon() {
    // name entered in textbox
    const name = document.getElementById("searchBox").value;
    pkmnName = lowerCaseName(name);
    pkmnTitle = firstLetterCapital(name);

    // retrieves the info from the api under the pokemon's name
    fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`)
    .then((resp) => resp.json())
    .then((data) => {
        // gather base stats
        hp = data.stats[0].base_stat;
        atk = data.stats[1].base_stat;
        def = data.stats[2].base_stat;
        spatk = data.stats[3].base_stat;
        spdef = data.stats[4].base_stat;
        speed = data.stats[5].base_stat;
        total = addBaseStats(hp,atk,def,spatk,spdef,speed);

        // gather types
        type1 = firstLetterCapital(data.types[0].type.name);
        try {
            type2 = firstLetterCapital(data.types[1].type.name);
        } catch (error) {
            type2 = 'None';
            console.error(error);
        }

        // puts the contents inside the element with id info
        document.getElementById("info").innerHTML = 
        `
            <img
                src="${data.sprites.other["official-artwork"].front_default}"
                alt="${data.name}">
            <div>
                <h1>${pkmnTitle}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td class="left">Type 1:</td>
                            <td>${type1}</td>
                        </tr>
                        <tr>
                            <td class="left">Type 2:</td>
                            <td>${type2}</td>
                        </tr>
                        <tr>
                            <td class="left">National Dex:</td>
                            <td>${data.id}</td>
                        </tr>
                        <tr>
                            <td class="left">Height:</td>
                            <td>${data.height}</td>
                        </tr>
                        <tr>
                            <td class="left">Weight:</td>
                            <td>${data.weight}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Base Stats</h3>
                <table>
                    <tbody>
                        <tr>
                            <td class="left">HP:</td>
                            <td>${hp}</td>
                        </tr>
                        <tr>
                            <td class="left">Attack:</td>
                            <td>${atk}</td>
                        </tr>
                        <tr>
                            <td class="left">Defense:</td>
                            <td>${def}</td>
                        </tr>
                        <tr>
                            <td class="left">Sp. Atk:</td>
                            <td>${spatk}</td>
                        </tr>
                        <tr>
                            <td class="left">Sp. Def:</td>
                            <td>${spdef}</td>
                        </tr>
                        <tr>
                            <td class="left">Speed:</td>
                            <td>${speed}</td>
                        </tr>
                        <tr>
                            <td class="left">Total:</td>
                            <td>${total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <img
                src="${data.sprites.other.home.front_shiny}"
                alt="${data.name}">
        `
    }).catch((err) => {
        console.log("Pokemon not found", err);
    });
}