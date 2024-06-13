import { Card, CardBody, CardTitle } from "reactstrap";
import { useContext } from "react";
import "./Home.css"

/** Homepage
 *
 * Props: none
 */

function Home() {
  console.log("* Home");

  return (
    <section className="Home col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle className="Home-title">
            <h1 className="fw-bold">
              Pixly
            </h1>
          </CardTitle>

          <CardTitle className="Home-title">
            <h3 className="fw-bold">
              Edit and upload your images
            </h3>
          </CardTitle>

        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
