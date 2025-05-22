
import { useState, useEffect } from "react";

const getPokemonsList = async (limit = 20, offset = 0) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();

  return data;
};

function Day9() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [pokemonsWithTypes, setPokemonsWithTypes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 20; // load 20 pokemons

  const fetchPokemonsWithTypes = async (pokemonsResults) => {
    const data = await Promise.all(
      pokemonsResults.map(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const pokemonData = await res.json();
        const type = pokemonData.types.map(t => t.type.name)[0];

        return {
          ...pokemon,
          type,
          id: pokemon.url.split("/").filter(Boolean).pop()
        };
      })
    );
    return data;
  };

  useEffect(() => {
    async function fetchData() {
      const pokemonsList = await getPokemonsList();
      setPokemonsList(pokemonsList);

      const pokemonsWithTypes = await fetchPokemonsWithTypes(pokemonsList.results);

      setPokemonsWithTypes(pokemonsWithTypes);
      setLoading(false);
    }
      fetchData();
    }, []);

  const loadMore = async () => {
    if (loading) return;

    setLoading(true);
    const newOffset = offset + limit;
    setOffset(newOffset);

    const data = await getPokemonsList(limit, newOffset);
    setPokemonsList(prev => ({
      ...data,
      results: [...prev.results, ...data.results]
    }));

    const newData = await fetchPokemonsWithTypes(data.results);
    setPokemonsWithTypes(prev => [...prev, ...newData]);
    setLoading(false);
  };

  return (
    <>
      <h2 className="text-2xl">Day 9: Build a paginated Pokemons list with a "Load more" button - starting from failing unit tests!</h2>
      <a href="https://reactpractice.dev/exercise/build-a-paginated-pokemons-list-with-a-load-more-button-starting-from-failing-unit-tests/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      {loading && <div>載入中...</div>}
      {!loading && (
        <div className="flex flex-wrap gap-4 mb-10">
        {pokemonsWithTypes.map((pokemon) => (
          <div key={pokemon.name} className="flex flex-auto flex-col items-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-xl">{pokemon.name}</h2>
              <div>{pokemon.type}</div>
            </div>
          </div>
          ))}
        </div>
      )}

      <div className="text-center">Displaying {pokemonsList?.results?.length} of {pokemonsList?.count} results</div>
      <button className="block mt-3 mx-auto" type="button" onClick={() => loadMore()}>Load more</button>
    </>
  );
};

export default Day9;
