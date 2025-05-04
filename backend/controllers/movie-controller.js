import { json } from "express";
import Movie from "../models/movie-model.js";
import redisClient from "../redisClient.js";

export const getAllMovies = async (req, res, next) => {
    let movies;
  
    try {
      const cachedMovie=await redisClient.get("movie:list:all");
      if (cachedMovie){
        const userData=JSON.parse(cachedMovie);
        return res.status(200).json(userData);
      }
      movies = await Movie.find();
      await redisClient.setEx("movie:list:all",3600,JSON.stringify(movies));
    } catch (err) {
      return console.log(err);
    }
  
    if (!movies) {
      return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(200).json({ movies });
  };
  
  export const getMoviesInHomepage = async (req, res, next) => { 
    let movies;
  
    try {
      // Sử dụng phương thức limit(6) để lấy chỉ 6 bộ phim đầu tiên
      const cachedMovie= await redisClient.get("movies:list:homepage")
      if(cachedMovie){
        const moviesList = JSON.parse(cachedMovie);
        return res.status(200).json(moviesList);
      }
      movies = await Movie.find().limit(8);
      await redisClient.setEx("movies:list:homepage", 3600, JSON.stringify(movies));
    } catch (err) {
      return console.log(err);
    }
  
    if (!movies || movies.length === 0) {
      return res.status(500).json({ message: "Request Failed" });
    }
  
    // Trả về dữ liệu với 6 bộ phim đầu tiên
    return res.status(200).json({ movies });
  };

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
};


export const getSearchMovie = async (req, res, next) => { 
  const { title } = req.query; // Lấy chỉ `title` từ query

  if (!title) {
    return res.status(400).json({ message: "Cần có tiêu đề phim để tìm kiếm" });
  }

  // Xây dựng đối tượng truy vấn chỉ dựa vào `title`
  let query = { title: { $regex: title, $options: "i" } }; // Tìm kiếm không phân biệt chữ hoa/chữ thường

  let results;
  try {
    results = await Movie.find(query); // Tìm kiếm phim theo `title`
  } catch (err) {
    return res.status(500).json({ message: "Lỗi khi tìm kiếm phim" });
  }

  if (!results || results.length === 0) {
    return res.status(404).json({ message: "Không tìm thấy phim phù hợp" });
  }

  return res.status(200).json({ results });
};


export const addMovie = async (req, res, next) => { 
  const { 
    title, 
    description, 
    duration, 
    genre, 
    rating, 
    limit_age, 
    poster_url, 
    release_date, 
    cast, 
    crew,
    vid_url
  } = req.body;

  if (
    !title || title.trim() === "" ||
    !description || description.trim() === ""|| 
    !duration || duration.trim() === "" ||
    !genre || genre.trim() === ""|| 
    !rating || rating.trim() === "" ||
    !limit_age || limit_age.trim() === ""||
    !poster_url || poster_url.trim() === "" ||
    !vid_url || vid_url.trim() === "" ||
    !release_date || new Date(release_date).toString() === "Invalid Date" ||
    !cast || cast.trim() === "" ||
    !crew || crew.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      duration,
      genre,
      rating,
      limit_age,
      poster_url,
      release_date: new Date(release_date), 
      cast,
      crew,
      vid_url
    });

    await movie.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to add movie", error: err.message });
  }

  return res.status(201).json({ message: "Movie added successfully", movie });
};

export const editMovie = async (req, res, next) => { 
  // Lấy id từ params
  const movieId = req.params.id;

  // Lấy dữ liệu chỉnh sửa từ body
  const { 
    title, 
    description, 
    duration, 
    genre, 
    rating, 
    limit_age, 
    poster_url, 
    release_date, 
    cast, 
    crew 
  } = req.body;

  // Tạo một object lưu trữ các trường cần cập nhật
  const updateFields = {};

  // Chỉ thêm những trường có giá trị hợp lệ vào `updateFields`
  if (title && title.trim() !== "") updateFields.title = title;
  if (description && description.trim() !== "") updateFields.description = description;
  if (duration && duration.trim() !== "") updateFields.duration = duration;
  if (genre && genre.trim() !== "") updateFields.genre = genre;
  if (rating && rating.trim() !== "") updateFields.rating = rating;
  if (limit_age && !isNaN(limit_age)) updateFields.limit_age = limit_age;
  if (poster_url && poster_url.trim() !== "") updateFields.poster_url = poster_url;
  if (release_date && new Date(release_date).toString() !== "Invalid Date") {
    updateFields.release_date = new Date(release_date);
  }
  if (cast && cast.trim() !== "") updateFields.cast = cast;
  if (crew && crew.trim() !== "") updateFields.crew = crew;

  // Nếu không có trường nào hợp lệ để cập nhật, trả về lỗi
  if (Object.keys(updateFields).length === 0) {
    return res.status(422).json({ message: "No valid fields to update" });
  }

  let updatedMovie;
  try {
    updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      updateFields,
      { new: true } // Trả về tài liệu đã cập nhật
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update movie", error: err.message });
  }

  if (!updatedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
};

export const deleteMovie = async (req, res, next) => {
 
  const movieId = req.params.id;

  let deletedMovie;
  try {
    
    deletedMovie = await Movie.findByIdAndDelete(movieId);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete movie", error: err.message });
  }

  if (!deletedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully", movie: deletedMovie });
};

// get Movie details
export const getMovieDetails = async (req, res) => {
  try {
      const movieId = req.params.id;
      console.log('Movie ID:', movieId);

      // Validate movie ID
      if (!movieId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ error: 'Invalid movie ID format.' });
      }

      // Find the movie by ID
      const movie = await Movie.findById(movieId);

      // If movie not found, respond with 404
      if (!movie) {
          return res.status(404).json({ error: 'Movie not found.' });
      }

      // Return movie details
      res.status(200).json({
          title: movie.title,
          description: movie.description,
          cast: movie.cast, 
          crew: movie.crew, 
          release_date: movie.release_date,
          genre: movie.genre,
          duration: movie.duration,
          rating: movie.rating,
          poster_url: movie.poster_url,
          limit_age: movie.limit_age,
          vid_url: movie.vid_url
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};