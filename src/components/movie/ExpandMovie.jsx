import { useFetch } from "../../hooks/useFetch";
import styled from "styled-components";

export default function ExpandMovie({ onClose, expandedMovie }) {
  const {
    data: movieVideos,
    error: movieVideosError,
    loading: movieVideosLoading,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${expandedMovie?.id}/videos?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`
  );
  const {
    data: movieReviews,
    error: movieReviewsError,
    loading: movieReviewsLoading,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${expandedMovie?.id}/reviews?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`
  );
  const {
    data: similarMovies,
    error: similarMoviesError,
    loading: similarMoviesLoading,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${expandedMovie?.id}/similar?api_key=bc50218d91157b1ba4f142ef7baaa6a0&language=en-US`
  );

  const newSimilarMovies = similarMovies?.results?.slice(0, 3);
  const newReviews = movieReviews?.results?.slice(0, 2);

  if (
    !movieVideos ||
    !movieReviews ||
    !similarMovies ||
    movieVideosLoading ||
    movieReviewsLoading ||
    similarMoviesLoading
  ) {
    return (
      <SideBar>
        <CloseButton onClick={onClose}>X</CloseButton>
        Loading
      </SideBar>
    );
  }

  return (
    <SideBar>
      <CloseButton onClick={onClose}>X</CloseButton>
      {movieVideosError ? (
        <div>No trailer Found</div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${movieVideos?.results[0]?.key}`}
          width='500px'
          height='250px'
          title={movieVideos?.results[0]?.name}
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        />
      )}
      <SimilarMovies>
        Similar Movies:
        {similarMoviesError ? (
          <div>No SimilarMovies</div>
        ) : (
          newSimilarMovies?.map((similarMovie) => (
            <Img
              src={`https://image.tmdb.org/t/p/original/${similarMovie?.poster_path}`}
              alt=''
            />
          ))
        )}
      </SimilarMovies>
      <Review>
        Review:
        {movieReviewsError ? (
          <div>No Reviews</div>
        ) : (
          <ReviewScroll>
            {newReviews.map((review) => (
              <div>
                Author: {review.author}
                <br></br>
                <p>{review.content}</p>
              </div>
            ))}
          </ReviewScroll>
        )}
      </Review>
    </SideBar>
  );
}

const SideBar = styled.div`
  top: 43px;
  background-color: black;
  position: fixed;
  width: 500px;
  height: 100vh;
`;

const ReviewScroll = styled.div`
  width: 100%;
  height: 250px;
  overflow-y: scroll;
  overflow: auto;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
`;

const SimilarMovies = styled.div`
  display: flex;
`;

const Img = styled.img`
  margin: 8px;
  padding: 8;
  width: 125px;
  border-radius: 8px;
`;

const Review = styled.div`
  margin-left: 8px;
  padding-left: 4px;
  padding-right: 4px;
`;

const CloseButton = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  color: white;
  cursor: pointer;
  width: 100%;
  height: 50px;
  font-size: 15px;
  padding: 8px;
`;
