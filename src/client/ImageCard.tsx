import {
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Button,
  CardText,
  CardSubtitle,
  CardGroup
} from "reactstrap";
/**
 * image Card
 *
 * Props:
 * image
 *
 * State: none
 *
 * Effects: none
 */

import { tImageModel } from "@/shared/types";

const AWS_BUCKET_BASE_URL = import.meta.env.VITE_REACT_APP_AWS_BASE_URL

function ImageCard({ image }: { image: tImageModel; }): JSX.Element {
  console.log("imageCard", { image });
  const {
    id,
    filename,
    height,
    width,
    description = null,
    comment = null,
  } = image;

  return (
    <div className="imageCard">
      <CardGroup>
        <Card>
          <CardImg
            alt="Card image cap"
            src={`${AWS_BUCKET_BASE_URL}/${id}`}
            top
            width="80%"
          />
          <CardBody>
            <CardTitle tag="h5">
            {filename}
            </CardTitle>
            {/* <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              {height} x {width}
            </CardSubtitle> */}

            {description &&
              <CardText>
                Description: {description}
              </CardText>
            }
            {comment &&
              <CardText>
                Comment: {comment}
              </CardText>
            }
            {/* <Button>
              Button
            </Button> */}
          </CardBody>
        </Card>
      </CardGroup>
    </div>

  );
}

export default ImageCard;
