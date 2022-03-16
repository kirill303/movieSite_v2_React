import minGet from '../API/getMovie';
import URL from "../URL/url";

function checkedBlockModule() {
   const checked = {
      reviewRender: async (id) => {

         const dataRev = await minGet(URL.API__get__rev + id + '&page=1');

         if (
            !dataRev !== 0
            && !dataRev.reviews
            && !dataRev.reviews.length !== 0
         ) {
            return "По фильму нет отзывов";
         }

         const m = [];

         for (let index = 0; index < 12 || index < dataRev.reviews.length; index++) {

            const rewiew = dataRev.reviews[index];

            m.push(
               <div className="rec">
                  <span className="rev__title">{rewiew.reviewTitle || ("рецензия " + (+ index + 1))}</span>
                  <p>{rewiew.reviewDescription}</p>
                  <span className="rev__autor">{rewiew.reviewAutor || "Нет автора"}</span>
               </div>
            )
         }

         return m;
      },
      actorRender: async (id) => {
         const dataActor = await minGet(URL.API__get__actor + id);

         const k = [];

         for (let n = 0; n < 10 || n >= dataActor.length - 1; n++) {

            let proffesion = dataActor[n].professionText;

            //Убираем последнюю букву т.к api присылает в формате {АктерЫ/режиссерЫ}
            proffesion = proffesion.slice(0, (proffesion.length - 1));

            console.log(dataActor);
            k.push(<div className="actor__block">
               <div className="actor__image"
                  onClick={async () => {
                     const actorInKinopisk = await minGet(URL.API__get__actorURl + dataActor[n].staffId);
                     window.open(actorInKinopisk.webUrl);
                  }}><img src={dataActor[n].posterUrl} alt="" className="actor__imageImg" id={'G' + dataActor[n].staffId} /></div>
               <div className="actor__name">{dataActor[n].nameRu}</div>
               <div className="actor__job">{proffesion}</div>
            </div>);

         }
         return k;
      },
      imageRender: async (id) => {

         const dataIMGS = await minGet(URL.API__get__ID__PREV + id + '/frames');
         console.log(dataIMGS, dataIMGS.frames.length);
         if (!dataIMGS || !dataIMGS.frames.length) {
            return '"По фильму нет кадров"'
         }
         const m = [];

         for (let n = 0; n < 10 || n >= dataIMGS.frames.length - 1; n++) {
            if (!dataIMGS.frames[n]) break;
            m.push(<div className="des__movie-images">
               <img src={dataIMGS.frames[n].image} alt="" />
            </div>);
         }

         return m;
      },
      factsRender: async (id) => {

         const dataFacts = await minGet(URL.API__get__ID + id + '/facts');
         const q = [];

         if (!dataFacts && !dataFacts.total) return "По фильму нет фактов"
         for (let n = 0; n < 4 || n === dataFacts.total; n++) {
            let random42 = Math.floor(Math.random() * dataFacts.total);

            let factText =
               ((dataFacts.items[random42].spoiler === true)
                  ? <span className='spoiler'>Внимание спойлер</span> : "")
               + (dataFacts.items[random42].text);

            q.push(
               <li className="des-facts__li" onClick={async (e) => window.open(minGet())} dangerouslySetInnerHTML={{ __html: factText }}>
               </li>
            )
         }
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
         let v = kl.map(e => e.genre).join(', ');
         return v.length ? v : 'Жабагадюшник';
      },
      le: (jk) => {
         console.log(jk);
         if (!jk) return 'Нет описания';
         if (jk.length > 240) {
            jk = jk.slice(0, 240);
            jk += '...'
         }
         return jk;
      },
      kl2: (kl) => {
         if (!kl.length || !kl) {
            return "Жабагадюшник"
         }
         return kl.map(e => e.country).join(', ')

      },
      mnts: (kl) => {
         kl = Math.floor(kl);
         if (kl < 60) {
            return `${kl} Минут`
         } else if (kl >= 60) {
            let n = 0
            for (; kl > 60; n++) {
               kl -= 60;
            }
            return ` ${n + " Час" + ((n === 1) ? '':"а")} и ${kl} Минут`
         } else {
            return `666 минут`
         }
      },
   }
   return checked;
}
export default checkedBlockModule();

