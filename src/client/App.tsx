import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "Loader";
import NavBar from "NavBar";
import ImageUploadForm from "forms/ImageUploadForm";

import { tImageModel, tImageUpload } from "@/shared/types";

import PixlyApi from "api/pixlyApi";
import Home from "Home";
import ImageList from "ImageList";

export default function App() {
  console.log("App");

  const [images, setImages] = useState<tImageModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<null | []>([]); // TODO think about the type here

  /** Fetch all images on mount */
  useEffect(
    function fetchImagesOnMount() {
      console.log("fetchImagesOnMount");

      async function getImages() {
        const images = await PixlyApi.getImages();

        setImages(images);
        setIsLoading(false);
        console.log("Fetched:", { images });
      }

      if (isLoading) {
        getImages();
      }
    }, []);

  async function uploadImage(formData: tImageUpload): Promise<void> {
    console.log("APP: uploadImage", {formData});

    let image: tImageModel;
    try {
      image = await PixlyApi.uploadImage(formData);
    } catch (err) {
      setErrors(err as [])
      return;
    }
    console.log("APP: uploadImage", { image });
    setImages((currImages) => [...currImages, image]);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="App">

      <NavBar></NavBar>
      <main>
        <Routes>

          <Route path="/"
            element={<Home />}
          />

          <Route path="/images"
            element={<ImageList />}
          />

          <Route path="/images/upload"
            element={<ImageUploadForm uploadImage={uploadImage} />}
          />

          <Route
            path="*"
            element={<p>Hmmm. I can't seem to find what you want.</p>} />
        </Routes>
      </main>
    </div>

  );
}
