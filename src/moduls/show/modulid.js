import reactDom from 'react-dom';
import check from "./checkedModule";
import URL from "../URL/url";
import minGet from '../API/getMovie';

async function modulid(e, [close, closeURL]) {
   let data = await minGet(URL.API__get__ID + e.target.id);
   const dataProk = await minGet(URL.API__get__ID + e.target.id + '/box_office');
   let kList = 0;
   let rendering = [];
   async function setPage(ef) {
      const allPage = document.querySelectorAll(".des-top__block");
      const allPageLi = document.querySelectorAll(".des-page__block");
      switch (ef) {
         case (0):
            if (!rendering[0]) {
               rendering[0] = <ul className="des__ul">
                  <li>Год выхода: {data.year}</li>
                  <li>Страны: {check.kl2(data.countries)}</li>
                  <li>Рейтинг: ({(data.ratingKinopoisk || 'N') + ' KINOPOISK), (' + (data.ratingImdb || 'N') + 'IMDB'})
                  </li>
                  <li> Слоган: {(data.slogan) || 'Нет слогана'}</li>
                  <li>Прокат по миру: {(typeof (dataProk.items[0]) == "object") ? String(dataProk.items[0].amount).split('').join(" ") + "$" : 'Нет данных'}</li>
                  <li>Длина фильма: {check.mnts(data.filmLength)}</li>
               </ul>

            }
            break;
         case (1):
            if (!rendering[1]) {
               rendering[1] = await check.actorRender(e.target.id);
            }
            break;
         case (2):
            if (!rendering[2]) {
               rendering[2] = await check.factsRender(e.target.id);
            }
            break;
         case (3):
            if (!rendering[3]) {
               rendering[3] = await check.reviewRender(e.target.id);
            }
            break;
         case (4):
            if (!rendering[4]) {
               rendering[4] = await check.imageRender(e.target.id)
            }
            break;
         case (5):
            if (!rendering[5]) {
               rendering[5] = check.le(data.description)
            }
            break;
      }
      reactDom.render(rendering[ef], allPage[ef]);
      for (let index = 0; index < allPage.length; index++) {
         let elem = allPage[index];
         if (index !== (ef)) {
            allPageLi[index].style.textDecoration = "none";
            elem.style.width = "0%";
            setTimeout(() => {
               elem.style.display = 'none';
            }, 500);
         } else {
            allPageLi[index].style.textDecoration = "underline";
            elem.style.width = "100%";
            elem.style.display = "flex";
         }
      }

   }
   return (
      <div className="des">
         {(window.screen.width > 760) ?
            <div className="des__left">
               <img className="des__image" src={data.posterUrl} />
            </div>
            : ''}
         <div className="des__right">
            <div className="des__titles">
               <div className="des__title">
                  {(data.nameRu) || (data.nameEn) || "Клалафуда Клалафу"}
               </div>
               <div className="des__genres">
                  {check.kl1(data.genres)}
               </div>
               <div className="des__text">
                  {(window.screen.width > 760) ? check.le(data.description) : ''}
               </div>
               <ul className="des__pages">
                  <li id={'event' + kList++} className="des-page__block" onClick={() => setPage(0)}>Характеристики</li>
                  <li id={'event' + kList++} className="des-page__block" onClick={() => setPage(1)}>Актеры</li>
                  <li id={'event' + kList++} className="des-page__block" onClick={() => setPage(2)}>Факты</li>
                  <li id={'event' + kList++} className="des-page__block" onClick={() => setPage(3)}>Отзывы</li>
                  <li id={'event' + kList++} className="des-page__block" onClick={() => setPage(4)}>Кадры</li>
                  {check.dataMediaIfList(window.screen.width, setPage, 5)}
               </ul>
               <div className="des__top">
                  <div className="des-top__block" id={"page" + (kList++ - 6)}>
                     <ul className="des__ul">
                        <li>Год выхода: {data.year}</li>
                        <li>Страны: {check.kl2(data.countries)}</li>
                        <li>Рейтинг: ({(data.ratingKinopoisk || 'N') + ' KINOPOISK), (' + (data.ratingImdb || 'N') + 'IMDB'})
                        </li>
                        <li> Слоган: {(data.slogan) || 'Нет слогана'}</li>
                        <li>Прокат по миру: {(typeof (dataProk.items[0]) == "object") ? String(dataProk.items[0].amount).split('').join(" ") + "$" : 'Нет данных'}</li>
                        <li>Длина фильма: {check.mnts(data.filmLength)}</li>
                     </ul>
                  </div>
                  <div className="des__actors des-top__block" id={"page" + (kList++ - 6)}>
                  </div>
                  <div className="des__facts des-top__block" id={"page" + (kList++ - 6)}>
                  </div>
                  <div className="des__rev des-top__block" id={"page" + (kList++ - 6)}>
                  </div>
                  <div className="des__imgs des-top__block" id={"page" + (kList++ - 6)}>
                  </div>
                  {check.dataMediaIfTopBlock(window.screen.width)}
               </div>
            </div>
            <a href={(data.webUrl) || " https://www.kinopoisk.ru/"} ><div className="search__kinopoisk">Искать на <br /> кинопоиске</div></a>
            {console.log(navigator.connection.downlink)}
         </div>

         <div className="des__cross" onClick={() => {
            console.log(closeURL);
            close(closeURL)
            }}><i className="fa fa-times" id="h4" aria-hidden="true"></i></div>
      </div>
   )
}
export default modulid;