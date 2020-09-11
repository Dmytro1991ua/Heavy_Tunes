export const addZero = (num) => { // adding 0 to a number which less than 10
   return (parseInt(num, 10) < 10 ? "0" : "") + num;
}