
import ReactLoading from "react-loading";
// npm i react-loading

//https://www.npmjs.com/package/react-loading

/** Loading bar
 *
 * Props:
 * color: takes hex color (default black)
*/
export default function Loader({ color = "#000" }) {
  console.log("Loader");
  /**
   Different types of loaders
    - blank
    - balls
    - bars
    - bubbles
    - cubes
    - cylon
    - spin
    - spinningBubbles
    - spokes
  */

  return (
      <div className="Loader">
        <ReactLoading type="spinningBubbles" color="#000"/>
      </div>
  );
}