import { useNavigate } from 'react-router'
import Product from './product'
import { useEffect, useState } from 'react'
import { getAllMovies } from '../api/api'
import FilterSearch from '../components/filter-search'
import Header from '../components/header'
import Promolist from '../components/promotion_list'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/nav-bar'
import React from 'react'; 
import { getPromotionInHompage } from '../api/api'

function PhimSapChieu () {
  const nav = useNavigate()
  const location = useLocation()
  const [promo, setPromo] = useState()
  useEffect(() => {
    if (location.pathname === '/phimsapchieu') {
      getPromotionInHompage()
        .then(data => {
          setPromo(data)
        })
        .catch(err => console.log(err))
    } else if (location.pathname === '/search') {
      getPromotionInHompage()
        .then(data => {
          setPromo(data)
        })
        .catch(err => console.log(err))
    }
  }, [location])
  var orderFilm = function () {
    if(localStorage.getItem('token')){
      nav('/order');
      window.location.reload();
      return;
    }
    $("#authpopup").removeClass("hide");
  }

  const [films, setFilm] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getAllMovies()
        const limit = [];
        for(var i = 0; i <=7 ; i++){
          limit.push(res[i]);
        }
        setFilm(limit);
      } catch (error) {
        console.error('Error while fetching all movie: ', error)
      }
    }
    fetchMovies()
  }, [])

  return (
    <>
      <Navbar />
      <Header />
      <FilterSearch event={() => {}} />

      <section className='mt-50'>
        <div className='center_ul' id='btn_type_film_list'>
          <button className='btn_cus btn-file-time-cate disable_btn_film_futu' id='film_now'  onClick={() => nav('/phimdangchieu')}>
          PHIM ĐANG CHIẾU
          </button>
          <button className='btn_cus btn-file-time-cate ' id='film_futu' onClick={() => nav('/phimsapchieu')}>
          PHIM SẮP CHIẾU
          </button>
        </div>

        <div className='center_ul' id='wrap-product-list'>
          <div className='center_ul' id='product-list'>
            <div className='wrap-nodata hide'></div>
            {films
              ? films.map(d => (
                  <Product
                    key={d.id}
                    clickEvent={() => {}}
                    orderFilm={orderFilm}
                    id={d._id}
                    img={d.poster_url}
                    type={d.gerne}
                    length={d.duration}
                    name={d.title}
                    futu={true}
                  />
                ))
              : ''}
          </div>
          <button className='btn_cus' id='more_films'>
          <p className='text_upper'>Xem thêm</p>
        </button>
        </div>
      </section>
      <Promolist data={promo} />
    </>
  )
}

export default PhimSapChieu
