import { useFetch } from "../hooks/useFetch";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ExpandMovie from "./movie/ExpandMovie";
import Movie from "./movie/Movie";

export default function Movies({ keyword }) {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [expandedMovie, setExpandedMovie] = useState();

  const onSuccess = useCallback((res) => {
    setAllMovies((prev) => [...prev, ...res.results]);
  }, []);

  useEffect(() => {
    setAllMovies([]);
  }, [keyword]);

  const url = keyword
    ? `https://api.themoviedb.org/3/search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US&query=${keyword}&page=${page}`
    : `https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=${page}`;

  const {
    data: moviesNowPlaying,
    error: moviesNowPlayingError,
    loading: moviesNowPlayingLoading,
  } = useFetch(url, onSuccess);

  const {
    data: allGenres,
    error: genresError,
    loading: genresLoading,
  } = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`
  );

  const getMovieGenres = useCallback(
    (movie) => {
      const currentGenres = allGenres.genres.filter((genre) =>
        movie.genre_ids.includes(genre.id)
      );
      return currentGenres.map((genre) => genre.name).join(", ");
    },
    [allGenres]
  );

  const fetchMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  if (moviesNowPlayingError || genresError) {
    return <div>Something went Wrong</div>;
  }

  if (
    !moviesNowPlaying ||
    moviesNowPlayingLoading ||
    genresLoading ||
    !allGenres
  ) {
    return <div>Loading</div>;
  }

  return (
    <>
      <ShowMovieList>
        {Boolean(expandedMovie) && (
          <ExpandMovie
            onClose={() => {
              setExpandedMovie(undefined);
            }}
            expandedMovie={expandedMovie}
          />
        )}
        {allMovies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            onClick={() => {
              setExpandedMovie(movie);
            }}
            categories={getMovieGenres(movie)}
          />
        ))}
      </ShowMovieList>
      <button onClick={fetchMore}>Fetch</button>
    </>
  );
}

const ShowMovieList = styled.div`
  flex-wrap: wrap;
  display: flex;
  max-width: 100%;
`;
