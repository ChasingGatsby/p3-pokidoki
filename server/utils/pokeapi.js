// export const getPokemon = async (pokemon) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
//   const response = await fetch(url);
//   return await response.json();
// };

// export const getBerry = async (berry) => {
//   const url = `https://pokeapi.co/api/v2/berry/${berry}`;
//   const response = await fetch(url);
//   return await response.json();
// };

async function genOne() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genTwo() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=151"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genThree() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genFour() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=135&offset=386"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genFive() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=156&offset=493"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genSix() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=71&offset=649"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genSeven() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=88&offset=721"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genEight() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=96&offset=809"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function genNine() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=120&offset=905"
  );
  const data = await response.json();
  return data.results.map((pokemon) => pokemon.name);
}

async function allPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025");
  const data = await response.json();
  console.log(
    data.results.map(
      (pokemon) => pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    )
  );
}

allPokemon();
