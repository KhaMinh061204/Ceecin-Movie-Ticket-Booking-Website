/* eslint-disable no-unused-vars */
import { getAllMovies } from "../api/api";
import FilmListFuture from "../components/film-list-future";
import FilmListNow from "../components/film-list-now";
import FimlPosterSlide from "../components/film_poster_slide";
import { useEffect, useState } from "react";
import React from 'react'; 

function ContentFilmList(){

    const [films, setFilm] = useState([]);

    useEffect(()=>{
        const fetchMovies=async()=>{
        try{
            const res=await getAllMovies();
            setFilm(res);
        }
        catch (error) {
            console.error("Error while fetching all movie: ",error )
        }
         }
        fetchMovies();
    },[]);
    return(
        <>
            <FimlPosterSlide/>
            <FilmListNow data={films}/>
            <FilmListFuture data={films}/>
        </>
       
    );

}

export default ContentFilmList;