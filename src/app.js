window.app = () => {
  const main = document.getElementById("main");

  const pokeListDiv = document.createElement("div");
  pokeListDiv.className = "poke-list-div";
  pokeListDiv.id = "poke-list-div";
  main.append(pokeListDiv);

  const sideBar = document.getElementById("side-bar");

  const generationSelect = createGenerationSelect(sideBar);
  generationSelect.addEventListener("change", (event) =>
    onGeneratonSelectChange(event)
  );
};

const createGenerationSelect = (main) => {
  const generationSelect = document.createElement("div");
  generationSelect.className = "generation-select";
  main.append(generationSelect);
  fetchGenerationNameList().then((generationNameList) => {
    generationNameList.forEach((generationName) => {
      const geneNameOfP = document.createElement("p");
      geneNameOfP.className = "gene-name-of-p";
      geneNameOfP.innerText = generationName.toUpperCase();
      geneNameOfP.value = generationName;
      geneNameOfP.addEventListener("click", (event) =>
        onGeneratonSelectChange(event)
      );
      generationSelect.append(geneNameOfP);
    });
  });
  return generationSelect;
};

const fetchGenerationNameList = () => {
  return fetch("https://pokeapi.co/api/v2/generation/")
    .then((response) => response.json())
    .then((data) => data.results.map((elem) => elem.name));
};

const renderPokeListByGeneration = (generationNumber) => {
  const pokeListDiv = document.getElementById("poke-list-div");
  while (pokeListDiv.firstChild) {
    pokeListDiv.firstChild.remove();
  }

  fetchSpeciesListByGeneration(generationNumber).then((speciesNameList) => {
    speciesNameList.forEach((speciesName) => {
      fetchPokeNameListBySpecies(speciesName).then((pokeNameList) => {
        pokeNameList.forEach((pokeName) => {
          fetchPoke(pokeName).then((poke) =>
            renderPoke(poke, generationNumber)
          );
        });
      });
    });
  });
};

const onGeneratonSelectChange = (event) => {
  const value = event.srcElement.value;
  renderPokeListByGeneration(value);
};

const renderPoke = (poke, generationName) => {
  const pokeDivOuter = document.createElement("div");
  pokeDivOuter.className = "poke-div-outer";
  pokeDivOuter.id = poke.name;

  const pokeDivInner = document.createElement("div");
  pokeDivInner.className = `poke-div-inner-${poke.types[0].type.name}`;

  const pokeDivUpper = document.createElement("div");
  pokeDivUpper.className = "poke-div-upper";

  const pokeHeader = document.createElement("div");
  pokeHeader.className = "poke-header";

  const pokeGeneration = document.createElement("div");
  pokeGeneration.className = "poke-generation";
  pokeGeneration.innerText = generationName.toUpperCase();

  const pokeNo = document.createElement("div");
  pokeNo.className = "poke-no";
  pokeNo.innerText = "No. " + poke.id;

  pokeHeader.append(pokeGeneration, pokeNo);

  const pokeName = document.createElement("div");
  pokeName.className = "poke-name";
  pokeName.innerText = poke.name;

  pokeDivUpper.append(pokeHeader, pokeName);

  const pokeDivMiddle = document.createElement("div");
  pokeDivMiddle.className = "poke-div-middle";

  const pokeImageFlame = document.createElement("div");
  pokeImageFlame.className = "poke-image-flame";

  const pokeImage = document.createElement("img");
  pokeImage.className = "poke-image";

  fetchPokeImage(poke.id, pokeImage);

  pokeImageFlame.append(pokeImage);
  pokeDivMiddle.append(pokeImageFlame);

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
  pokeHeight.innerText = "Height : " + Number(poke.height) / 10 + " m";

  const pokeWeight = document.createElement("div");
  pokeWeight.className = "poke-weight";
  pokeWeight.innerText = "Weight : " + Number(poke.weight) / 10 + " kg";

  const pokeBottom = document.createElement("div");
  pokeBottom.className = "poke-bottom";

  pokeBottom.append(pokeHeight, pokeWeight);

  const pokeTextBox = document.createElement("div");
  pokeTextBox.className = "poke-text-box";

  const pokeText = document.createElement("div");
  pokeText.className = "poke-text";

  fetchPokeText(poke.id, pokeText);

  pokeTextBox.append(pokeText);

  pokeDivBottom.append(pokeType, pokeBottom, pokeTextBox);

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

const fetchSpeciesListByGeneration = (id) => {
  return fetch(`https://pokeapi.co/api/v2/generation/${id}/`)
    .then((response) => response.json())
    .then((data) => data.pokemon_species.map((element) => element.name))
    .catch((response) => response.json());
};

const fetchPokeNameListBySpecies = (speciesName) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}/`)
    .then((response) => response.json())
    .then((data) => {
      const result = [];
      data.varieties.forEach((variety) => {
        result.push(variety.pokemon.name);
      });
      return result;
    });
};

const fetchPokeImage = (id, pokeImage) => {
  return fetch(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.blob();
    })
    .then((blobResponse) => {
      const fileURL = URL.createObjectURL(blobResponse);
      pokeImage.src = fileURL;
    })
    .catch((response) => {
      pokeImage.src = "../images/no_image.png";
    });
};

const fetchPokeText = (id, pokeText) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const pokeTextFlavors = data.flavor_text_entries;
      let pokeTextsrc = pokeTextFlavors.filter(
        (ele) => ele.language.name === "en" && ele.version.name === "sword"
      );
      if (pokeTextsrc.length === 0) {
        pokeTextsrc = pokeTextFlavors.filter(
          (ele) => ele.language.name === "en" && ele.version.name === "y"
        );
      }
      if (pokeTextsrc.length === 0) {
        pokeTextsrc = pokeTextFlavors.filter(
          (ele) => ele.language.name === "en" && ele.version.name === "sun"
        );
      }
      if (pokeTextsrc.length === 0) {
        pokeTextsrc = pokeTextFlavors.filter(
          (ele) =>
            ele.language.name === "en" && ele.version.name === "legends-arceus"
        );
      }
      pokeText.innerText = pokeTextsrc[0].flavor_text.replace(/\r?\n/g, "");
    })
    .catch(() => {
      pokeText.innerText =
        "Sorry...Nothing Introduction. \n This is super rare Pokemon. \n Please tell me this Pokemon's characteristics.";
    });
};
