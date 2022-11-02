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
  const pokeDivOuter = document.createElement("div");
  pokeDivOuter.className = "poke-div-outer";
  pokeDivOuter.id = poke.name;

  const pokeDivInner = document.createElement("div");
  pokeDivInner.className = "poke-div-inner";

  const pokeDivUpper = document.createElement("div");
  pokeDivUpper.className = "poke-div-upper";

  const pokeHeader = document.createElement("div");
  pokeHeader.className = "poke-header";

  const pokeGeneration = document.createElement("div");
  pokeGeneration.className = "poke-generation";
  pokeGeneration.innerText = "###";

  const pokeNo = document.createElement("div");
  pokeNo.className = "poke-no";
  pokeNo.innerText = poke.id;

  pokeHeader.append(pokeGeneration, pokeNo);

  const pokeName = document.createElement("div");
  pokeName.className = "poke-name";
  pokeName.innerText = poke.name;

  pokeDivUpper.append(pokeHeader, pokeName);

  const pokeDivMiddle = document.createElement("div");
  pokeDivMiddle.className = "poke-div-middle";

  const pokeImage = document.createElement("img");
  pokeImage.className = "poke-image";

  fetchPokeImage(poke.id, pokeImage);

  pokeDivMiddle.append(pokeImage);

  const pokeDivBottom = document.createElement("div");
  pokeDivBottom.className = "poke-div-bottom";

  const pokeType = document.createElement("div");
  pokeType.className = "poke-type";

  pokeType.innerText = poke.types.reduce((acc, curr, index) => {
    if (index === 0) {
      return curr.type.name;
    } else {
      return acc + ", " + curr.type.name;
    }
  }, "");

  const pokeHeight = document.createElement("div");
  pokeHeight.className = "poke-height";
  pokeHeight.innerText = Number(poke.height) * 10 + " cm";

  const pokeWeight = document.createElement("div");
  pokeWeight.className = "poke-weight";
  pokeWeight.innerText = Number(poke.weight) / 10 + " kg";

  pokeDivBottom.append(pokeType, pokeHeight, pokeWeight);

  pokeDivInner.append(pokeDivUpper, pokeDivMiddle, pokeDivBottom);
  pokeDivOuter.append(pokeDivInner);

  const pokeListDiv = document.getElementById("poke-list-div");
  pokeListDiv.append(pokeDivOuter);
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

const fetchPokeImage = (id, pokeImage) => {
  return fetch(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  )
    .then((response) => response.blob())
    .then((blobResponse) => {
      const fileURL = URL.createObjectURL(blobResponse);
      pokeImage.src = fileURL;
    });
};
