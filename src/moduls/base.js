import React, { useEffect, useState } from 'react';
import getMovie from './API/getMovie';
import reactDom from 'react-dom';
import MovieBlock from './show/MovieBlock';
import modulid from './show/modulid';
import URL from './URL/url';
import css from '../css/style.css';

let page = 1;
let defUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2022&month=NOVEMBER&page=';
const mouthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Main = () => {
   let [thisUrl, setUrl] = useState('https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2021&month=NOVEMBER&page=1');
   const [mouthMenuState, setMouthMenu] = useState(false);
   const [mouth, setMouth] = useState('NOVEMBER');
   
   function setUrlGlobal(url, page) {
      setUrl(url + page);
   }
   function pageL(p) {
      setUrl(defUrl + p)
   }
   function formSubmit(e) {
      e.preventDefault();
      if (page !== 1) page = 1;

      let h = document.querySelector('#input1');

      defUrl = URL.API_get_KeyWord + String(h.value) + '&page=';
      setUrlGlobal(URL.API_get_KeyWord + String(h.value) + '&page=', page);

      return false
   }

   async function renderMovies(url) {
      console.log(url);
      let movies = await getMovie(url);
      let moviesCont = [];
      if (movies.hasOwnProperty("releases")) movies.films = movies.releases;
      console.log(movies);
      movies.films.forEach((element, i) => {
         moviesCont[i] = <MovieBlock el={element} key = {i} func={renderModul} />
      });
      reactDom.render(moviesCont, document.getElementById('movieBlockCont'));
   }

   async function renderModul(id) {
      //ОТРИСОВКА ФИЛЬМОВ
      let des = await modulid(id, [close, defUrl + page]);
      reactDom.render(des, document.getElementById('movieBlockCont'))
   }

   function close(url) {
      renderMovies(thisUrl);
   }

   function renderUserMovies(e) {
      e.preventDefault()
      setMouthMenu(prev => !prev)
      page = 1;
      let h = document.querySelector('#input2');
      if (h.value < 2014 || h.value > 2021) h.value = 2015;
      defUrl = URL.API__get__USER__FILM + `year=${h.value}&month=${mouth}&page=`;
      setUrl(URL.API__get__USER__FILM + `year=${h.value}&month=${mouth}&page=` + page)
   }

   useEffect(async () => {
      renderMovies(thisUrl);
   }, [thisUrl]);

   useEffect(() => {
      let w = 0;
      let g = document.getElementById('mouths__cont2');
      if (mouthMenuState) {
         w = 190;
      } else {
         w = 0;
      }
      g.style.width = (w + 20) + 'px'
      g.style.height = (w + 50) + 'px'
      if (mouthMenuState) {
         setTimeout(() => {
            let h = [];
            for (let index = 0; index < mouthsArr.length; index++) {
               let g = mouthsArr[index];
               h.push(<div className={'mouth'} onClick={() => { setMouth(g); setMouthMenu(prev => !prev) }}>{mouthsArr[index].split('')[0]}</div>);
            }
            reactDom.render(h, document.getElementById('mouths'));
         }, 1000);
         
      }else{
      }
   }, [mouthMenuState])
   return (
      <>
         <header className="page__header header">
            <div className="header__container _container">
               <nav className="nav">
                  <div className="logo" onClick={() => {
                     setUrl('https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2021&month=NOVEMBER&page=1');
                     page = 1;
                     defUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2021&month=NOVEMBER&page='
                  }}>
                     CinemaCerv
                  </div>
                  <div className="mouths__cont">
                     Найти фильмы по месяцу и году <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                     <div className="mount__cont2" id="mouths__cont2">
                        <div className="mouths" onClick={() => { setMouthMenu(prev => !prev) }} id='mouths' />
                        <form action="#" className="form__mounth" onSubmit={ renderUserMovies}><input type="text" placeholder="Сюда год"
                           className="search__mounth" id="input2" />
                        </form>
                     </div>
                  </div>
                  <form action="#" className="form1" onSubmit={formSubmit} id='form1'>
                     <input type="text" placeholder="Найти ваш любимый фильм" className="search" id="input1" />
                  </form>
               </nav>
            </div>
         </header>
         <main className="main">
            <div className="main__container _container">
               <div className="movie__block-cont" id="movieBlockCont">
               </div>
               <div className="btns__mov">
                  <button className="button__mov" id="btn-prev__mov"><i className="fa fa-chevron-left"
                     aria-hidden="true" onClick={() => (page !== 1) ? pageL(--page) : ''}></i></button>
                  <button className="button__mov" id="btn-next__mov"><i className="fa fa-chevron-right"
                     aria-hidden="true" onClick={() => pageL(++page)}></i></button>
               </div>
            </div>
         </main>
         <footer className="footer">
            <div className="footer__container _container">
               <div className="footer__text">Сайт был создан <a href="https://t.me/CookBookAnarchyst">Индусом</a> в подвале</div>
            </div>
         </footer>
      </>
   )
}


export default Main;