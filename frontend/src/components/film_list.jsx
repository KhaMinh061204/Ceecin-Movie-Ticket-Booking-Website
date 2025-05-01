import { useNavigate } from 'react-router'
import Product from './product'
import $ from "jquery"
import React from 'react'; 

function Filmlist (prop) {
  const nav = useNavigate()

  var orderFilm = function () {
    if(localStorage.getItem('token')){
      nav('/order');
      window.location.reload();
      return;
    }
    $("#authpopup").removeClass("hide");
  }

  var navigateToFilmList = function () {
    nav('/filmlist') // Đường dẫn tới FilmList page
  }

  return (
    <section className='mt-50'>
      <div className='center_ul' id='btn_type_film_list'>
        <button className='btn_cus btn-file-time-cate' id='film_now' onClick={() => { nav('/phimdangchieu'); }}>
          PHIM ĐANG CHIẾU
        </button>
        <button className='btn_cus btn-file-time-cate disable_btn_film_now' id='film_futu' onClick={() => { nav('/phimsapchieu'); }}>
          PHIM SẮP CHIẾU
        </button>
      </div>

      <div className='center_ul' id='wrap-product-list'>
        <div className='center_ul' id='product-list'>
          <div className='wrap-nodata hide'></div>
          {prop.data
            ? prop.data.map(d => (
                <Product
                  key={d._id}
                  clickEvent={() => {}}
                  orderFilm={orderFilm}
                  id={d._id}
                  img={d.poster_url}
                  type={d.genre}
                  length={d.duration}
                  name={d.title}
                />
              ))
            : ''}
        </div>
        <button className='btn_cus' id='more_films' onClick={navigateToFilmList}>
          <p className='text_upper'>Xem thêm</p>
        </button>
      </div>
    </section>
  )
}

export default Filmlist