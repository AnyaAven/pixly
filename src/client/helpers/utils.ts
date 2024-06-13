/** General Utils */

/** Capitalize the first char in a string */
function capitalize(string: string){
  if (string === "") return "";

  return string[0].toUpperCase() + string.slice(1);
}

/** Check if all the vals in an object are not empty strings
 * returns: boolean
*/
function isValsFilled(obj: Record<string, any>){
  return Object.values(obj).every(v => v);
}

/** Add an 's' to word string if count is > 1 */
function pluralize(count: number, word: string){
  if (count > 1) return word + "s";
  else return word;
}

export {
  capitalize,
  isValsFilled,
  pluralize,
}