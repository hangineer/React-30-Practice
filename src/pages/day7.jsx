import { useState } from "react";
import axiosInstance from "@/api";

const MovieList = ({ movies }) => {
  return(
    <div className="flex flex-wrap gap-4 p-4">
    {movies.map(movie => (
      <div key={movie.id}>
        <div className="w-[150px]">
          <h3 className="text-center w-full truncate">{movie.original_title}</h3>
          <img className="w-full" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Day7() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async () => {
    await axiosInstance.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        query: search,
        api_key: import.meta.env.VITE_THE_MOVIE_DB_API_KEY
      }
    })
      .then(res => setMovies(res.data.results))
      .catch(() => {
        setMovies([]);
      });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <>
      <h2 className="text-2xl">Day 7: Create a movie search page</h2>
      <a href="https://reactpractice.dev/exercise/create-a-movie-search-page/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>

      <form onSubmit={handleSubmit}>
        <input className="border-1 rounded p-1 m-3" type="text" value={search} placeholder="search" onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {movies.length === 0 ? (
        <div className="text-center">查無結果</div>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  );
};

export default Day7;
