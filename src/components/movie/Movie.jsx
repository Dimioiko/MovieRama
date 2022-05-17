import React from "react";
import styled from "styled-components";

export default function Movie({ movie, categories, onClick }) {
  return (
    <ShowCard onClick={onClick}>
      <Img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt=''
      />
      <div>
        <div>Rating: {movie.vote_average}</div>
        <ul>
          <li>Categories: {categories}</li>
          <li>Title: {movie.title}</li>
          <li>Release Date: {movie.release_date}</li>
        </ul>
        <div>{movie.overview}</div>
      </div>
    </ShowCard>
  );
}

const ShowCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  width: 300px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 8px;
`;
