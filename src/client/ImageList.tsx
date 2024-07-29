import SearchForm from "./forms/SearchForm";
import ImageCardList from "./ImageCardList";
import PixlyApi from "api/pixlyApi";
import Alert from "Alert";
import "./ImageList.css"

import { useEffect, useState } from "react";
import Loader from "Loader";
import { tImageModel } from "@/shared/types";

/**
 * Images List
 *
 * Props: none
 *
 * State:
 * imagesData ->
 *  {images: [image,...], isLoading: bool, errors: []}
 *  default: {images: null, isLoading: true, errors: []}
 *
 * Effects: fetch and set images on first initiation
 *
 * App -> { ImageList }
 */

function ImageList() {
  console.log("ImageList");
  const initialImagesData =  {
    images: [] as tImageModel[],
    isLoading: true,
    searchTerm: "",
    errors: [] as any[]
  }

  const [imagesData, setimagesData] = useState(initialImagesData);

  /** Sets and fetches the filtered images */
  async function handleSearch(term: string): Promise<void> {
    console.log("handleSearch", { term });

    try {
      const data = term !== ""
        ? await PixlyApi.getImagesBySearch(term)
        : await PixlyApi.getImages();

      const errors = data.length === 0
        ? ["Sorry, no results were found!"]
        : [];

      setimagesData({
        images: data,
        isLoading: false,
        searchTerm: term,
        errors,
      });
    } catch (err) {
      setimagesData({
        images: [],
        isLoading: false,
        searchTerm: "",
        errors: err as any[],
      });
    }
  }


  /** fetches and sets all images data on initial render */
  useEffect(function fetchallImages() {
    console.log("USE EFFECT: fetchAllImages");

    async function fetchImagesData() {
      try {
        const data = await PixlyApi.getImages();
        setimagesData({
          images: data,
          isLoading: false,
          searchTerm: "",
          errors: [],
        });
      } catch (err) {
        setimagesData({
          images: [],
          isLoading: false,
          searchTerm: "",
          errors: err as any[],
        });
      }
    }

    fetchImagesData();
  }, []);


  if (imagesData.isLoading) return <Loader />

  return (
    <div className="ImageList">
      <SearchForm handleSearch={handleSearch} />
      {imagesData.searchTerm === ""
        ? <h1>All images</h1>
        : <h1>Search results for "{imagesData.searchTerm}"</h1>
      }

      {
        imagesData.errors.length > 0 &&
        <div>
          {imagesData.errors.map(
            err => <Alert key={err} type="danger">{err}</Alert>)}
          </div>
      }

      <ImageCardList images={imagesData.images} />
    </div>
  );
}

export default ImageList;
