import minGet from "../API/getId";
import URL from "../URL/url";

function checkedBlockModule() {
   const checked = {
      dataRevChecked: async (id) => {
         const dataRev = await minGet(URL.API__get__rev + id + '&page=1');
         let m = [];
         if (dataRev != 0 && dataRev.reviews && dataRev.reviews.length != 0) {
            for (let index = 0; index < 12; index++) {
               let h42 = dataRev.reviews[index];
               if (dataRev.reviews.length == index) break;
               m.push(
                  <div className="rec">
                     <span className="rev__title">{h42.reviewTitle || ("рецензия " + (+ index + 1))}</span>
                     <p>{h42.reviewDescription}</p>
                     <span className="rev__autor">{h42.reviewAutor || "Нет автора"}</span>
                  </div>
               )
            }
         } else m = "По фильму нет отзывов"
         return m;
      },
      dataActorChecked: async (id) => {
         const dataActor = await minGet(URL.API__get__actor + id)
         let k = [];
         if (dataActor != 0) {
            for (let n = 0; n < 10; n++) {
               if (n == dataActor.length - 1) break;
               let g = dataActor[n].professionText.split('');
               console.log(dataActor);
               g.pop();
               k.push(<div className="actor__block">
                  <div className="actor__image" onClick={async () => {
                     let y = await minGet('https://kinopoiskapiunofficial.tech/api/v1/staff/' + dataActor[n].staffId)
                     window.open(y.webUrl)
                  }}><img src={dataActor[n].posterUrl} alt="" className="actor__imageImg" id={'G' + dataActor[n].staffId} /></div>
                  <div className="actor__name">{dataActor[n].nameRu}</div>
                  <div className="actor__job">{g.join("")}</div>
               </div>);
            }
         }
         return k;
      },
      dataIMGSChecked: async (id) => {
         const dataIMGS = await minGet(URL.API__get__ID__PREV + id + '/frames');
         let Lm = [];
         if (dataIMGS != 0 && dataIMGS.frames.length != 0) {
            for (let n = 0; n < 10; n++) {
               if (n == dataIMGS.frames.length - 1) break;
               Lm.push(<div className="des__movie-images">
                  <img src={dataIMGS.frames[n].image} alt="" />
               </div>);
            }
         } else { Lm = "По фильму нет картинок" }
         return Lm;
      },
      dataFactsChecked: async (id) => {
         const dataFacts = await minGet(URL.API__get__ID + id + '/facts')
         let q = [];
         if (dataFacts != 0 && dataFacts.total != 0) {
            for (let $L = 0; $L < 4; $L++) {
               if ($L == dataFacts.total) break;
               let random42 = Math.floor(Math.random() * dataFacts.total);
               let factText = ((dataFacts.items[random42].spoiler == true) ? <span className='spoiler'>Внимание спойлер</span> : "") + (dataFacts.items[random42].text);
               q.push(
                  <li className="des-facts__li" onClick={async (e) => window.open(minGet())} dangerouslySetInnerHTML={{ __html: factText }}>
                  </li>
               )
            }
         } else q = "По фильму нет фактов"
         return <ul className="des-facts__ul">{q}</ul>;
      },
      dataMediaIfList: (clientMedia, kFunc, k) => {
         return (clientMedia < 760) ?
            <li id={'event' + k} className="des-page__block" onClick={() => kFunc(k)}>
               Описание
            </li>
            : '';
      },
      dataMediaIfTopBlock: (clientMedia) => {
         console.log(clientMedia);
         return (clientMedia < 760) ? <div className="des__description des-top__block">
         </div> : '';
      },
      kl1: (kl) => {
         let h = '';
         if (!!kl && kl.length === 0) {
            return "Жабагадюшник"
         } else {
            kl.forEach((e) => {
               h += `${e.genre}  `
            });
            return h;
         }
      },
      le: (jk) => {
         let h = '';
         if (jk != null && jk.split("").length > 300) {
            let n = jk.split("");
            for (let index = 0; index < 240; index++) {
               h += n[index];
            }
            h += "..."
         } else {
            h = (jk) || "Нет описания";
         }
         return h;
      },
      kl2: (kl) => {
         let h = '';
         if (kl.length === 0 || kl === undefined) {
            return "Жабагадюшник"
         } else {
            if (kl) {
               kl.forEach((el, y) => {
                  h += `${el.country} ${(y !== (kl.length - 1)) ? "," : " "} `
               })
            }
            return h;
         }
      },
      mnts: (kl) => {
         kl = Math.floor(kl);
         if (kl < 60) {
            return `${kl} Минут`
         } else if (kl > 60) {
            let n = 0
            for (; kl > 60; n++) {
               kl -= 60;
            }
            return `${(n === 1) ? n + " Час" : n + " Часа"} и ${kl} Минут`
         } else {
            return `666 минут`
         }
      },
   }
   return checked;
}
export default checkedBlockModule();

