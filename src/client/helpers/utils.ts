/** General Utils */

/** Capitalize the first char in a string */
export function capitalize(string: string): string {
  if (string === "") return "";

  return string[0].toUpperCase() + string.slice(1);
}

/** Check if all the vals in an object are not empty strings
 * returns: boolean
*/
export function isValsFilled(obj: Record<string, any>): boolean {
  return Object.values(obj).every(v => v);
}

/** Add an 's' to word string if count is > 1 */
export function pluralize(count: number, word: string): string {
  if (count > 1) return word + "s";
  else return word;
}


/** Convert base64 string to Blob */
//https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
export function convertBase64ToBlob(base64Image: string): Blob {
  console.log("_convertBase64ToBlob", { base64Image });
  // Split into two parts
  const parts = base64Image.split(';base64,');

  // Hold the content type
  const imageType = parts[0].split(':')[1];

  // Decode Base64 string
  const decodedData = window.atob(parts[1]);

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType });
}


/** Convert blob to file */
export function convertBlobToFile(blob: Blob): File {
 return new File([blob], "name", { type: blob.type });
}
