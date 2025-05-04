/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import Filmlist from '../components/film_list'
import { useLocation, useNavigate } from 'react-router-dom'
import FilterSearch from '../components/filter-search'
import Header from '../components/header'
import Promolist from '../components/promotion_list'
import {
  getMoviesInHomepage,
  getPromotionInHompage,
  getSearchMovie
} from '../api/api'
import React from 'react'; 

function contentProductPage () {
  const nav = useNavigate();
  const [movies, setMovies] = useState()
  const location = useLocation()
  const [promo, setPromo] = useState()
  useEffect(() => {
    if (location.pathname === '/') {
      // Nếu ở trang chủ, gọi API lấy phim trang chủ
      getMoviesInHomepage()
        .then(data => {
          setMovies(data)
        })
        .catch(err => console.log(err))

      getPromotionInHompage()
        .then(data => {
          setPromo(data)
        })
        .catch(err => console.log(err))
    } else if (location.pathname === '/search') {
      // Nếu ở trang tìm kiếm, gọi API tìm kiếm phim
      const searchTitle = new URLSearchParams(location.search).get('title')

      if (searchTitle) {
        getSearchMovie(searchTitle)
          .then(data => {
            setMovies(data.results) // Giả sử API trả về một mảng phim
          })
          .catch(err => console.log(err))
      }
      getPromotionInHompage()
        .then(data => {
          setPromo(data)
        })
        .catch(err => console.log(err))
    }
  }, [location])

  const navPromote  = ()=>{
    nav("/promotion")
  }

  return (
    <>
      <Header />
      <FilterSearch event={() => {}} />
      <Filmlist data={movies} />
      <Promolist data={promo} promotenav={navPromote} />
    </>
  )
}

export default contentProductPage
