window.app = () => {
  const main = document.getElementById("main");
  const pokeListDiv = document.createElement("div");
  pokeListDiv.className = "poke-list-div";
  pokeListDiv.id = "poke-list-div";
  main.append(pokeListDiv);

  fetchPokeNameListByGeneration(2).then((pokeNameList) => {
    for (const pokeName of pokeNameList) {
      fetchPoke(pokeName).then((poke) => renderPoke(poke));
    }
  });
};

const renderPoke = (poke) => {
  const pokeDiv = document.createElement("div");
  pokeDiv.className = "poke-div";
  pokeDiv.id = poke.name;

  const pokeDivUpper = document.createElement("div");
  pokeDivUpper.className = "poke-div-upper";

  const pokeGeneration = document.createElement("div");
  pokeGeneration.className = "poke-generation";

  const pokeNo = document.createElement("div");
  pokeNo.className = "poke-no";

  const pokeName = document.createElement("div");
  pokeName.className = "poke-name";
  pokeName.innerText = poke.name;

  pokeDivUpper.append(pokeGeneration, pokeNo, pokeName);

  const pokeDivMiddle = document.createElement("div");
  pokeDivMiddle.className = "poke-div-middle";

  const pokeImage = document.createElement("img");
  pokeImage.className = "poke-image";

  pokeDivMiddle.append(pokeImage);

  const pokeDivBottom = document.createElement("div");
  pokeDivBottom.className = "poke-div-bottom";

  const pokeType = document.createElement("div");
  pokeType.className = "poke-type";

  const pokeHeight = document.createElement("div");
  pokeHeight.className = "poke-height";

  const pokeWeight = document.createElement("div");
  pokeWeight.className = "poke-weight";

  pokeDivBottom.append(pokeType, pokeHeight, pokeWeight);

  pokeDiv.append(pokeDivUpper, pokeDivMiddle, pokeDivBottom);

  const pokeListDiv = document.getElementById("poke-list-div");
  pokeListDiv.append(pokeDiv);
};

const fetchPokeList = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((response) => response.json());
};

const fetchPokeNameList = () => {
  return fetchPokeList().then((pokeList) => pokeList.map((elem) => elem.name));
};

const fetchPoke = (idOrName) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}/`)
    .then((response) => response.json())
    .catch((response) => console.log(response));
};

const fetchPokeNameListByGeneration = (id) => {
  return fetch(`https://pokeapi.co/api/v2/generation/${id}/`)
    .then((response) => response.json())
    .then((data) => data.pokemon_species.map((element) => element.name))
    .catch((response) => response.json());
};
