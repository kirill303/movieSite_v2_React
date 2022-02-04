import URL from '../URL/url'
export default async function getMovie(url) {
   const h = fetch(url, {
      headers: {
         "Content-type": "application/json",
         "X-API-KEY": URL.API_key,
      }
   }).then(resolve => resolve.status === 404? 0:resolve.json()
   ).then(resolve => resolve);
   return await h;
}