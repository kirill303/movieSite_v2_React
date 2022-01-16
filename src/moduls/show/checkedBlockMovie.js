function check() {
   const checked = {
      rating: (r) => {
         r = +r;
         if (r > 6.9) {
            return "rev-green"
         } else if (r < 6.9 && r > 4) {
            return "rev-yellow"
         } else if (r < 4 && r > 0.1) {
            return "rev-red"
         } else {
            return "rev-Nan"
         }
      },
   }
   return checked;
}
export default check;