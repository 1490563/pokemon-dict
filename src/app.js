window.app = () => {
  const main = document.getElementById("main");
  const pokeListDiv = document.createElement("div");
  pokeListDiv.className = "poke-list-div";
  pokeListDiv.id = "poke-list-div";
  main.append(pokeListDiv);

  fetchPokeList();
};

const renderPoke = (poke) => {
  const pokeDiv = document.createElement("div");
  pokeDiv.className = "poke-div";
  pokeDiv.id = poke.name;
  pokeDiv.innerText = poke.name;
  const pokeListDiv = document.getElementById("poke-list-div");
  pokeListDiv.append(pokeDiv);
};

const fetchPokeList = () => {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((response) => response.json())
    .then((data) => data.results.forEach((poke) => renderPoke(poke)))
    .catch((response) => console.log(response));
};
