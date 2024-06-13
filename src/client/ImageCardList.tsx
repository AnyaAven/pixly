import { tImageModel } from "@/shared/types";
import ImageCard from "./ImageCard";

/**
 * Image Card List
 *
 * Props:
 images
  {
    images: [image,...]
  }
 *
 * State: none
 *
 * Effects: none
 *
 * ImageList -> { ImageCardList }  -> [ImageCard,...]
 */

function ImageCardList({ images = [] }: { images: tImageModel[]; }) {
  console.log("ImageCardList", { images });

  return (
    <div className="ImageCardList">
      {images.map(
        image => (
          <ImageCard key={image.id} image={image} />
        )
      )}
    </div>
  );
};

export default ImageCardList;