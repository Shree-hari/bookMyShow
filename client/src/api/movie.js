import {axiosInstance} from "./index";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        console.error("Error while calling getAllmovies api:", error);
    }
};

// add a movie

export const addMovie = async (movie) => {
    try {
        const response = await axiosInstance.post("/api/movies/add-movie", movie);
        return response.data;
    } catch (error) {
        console.error("Error while calling addMovie api:", error);
    }
}

// update a movie

export const updateMovie = async (movie) => {
    try {
        const response = await axiosInstance.put("/api/movies/update-movie", movie);
        return response.data;
    } catch (error) {
        console.error("Error while calling updateMovie api:", error);
    }
}

// delete a movie

export const deleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.delete("/api/movies/delete-movie", movieId);
        return response.data;
    } catch (error) {
        console.error("Error while calling deleteMovie api:", error); 
    }
}

export const getMovieById = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/movies/movie/${id}`);
      return response.data;
    } catch (err) {
      console.log("Error while calling getMovieById API ", err);
    }
  };