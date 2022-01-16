export default async function getMovie(url) {
   const h = fetch(url, {
      headers: {
         "Content-type": "application/json",
         "X-API-KEY": 'e63e194e-0c87-473e-ad3d-900519512636',
      }
   }).then(resolve => resolve.status === 404? 0:resolve.json()
   ).then(resolve => resolve);
   return await h;
}