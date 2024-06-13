import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "Loader";
import NavBar from "NavBar";
import ImageUploadForm from "forms/ImageUploadForm";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";
import { tImageModel, tImageUpload } from "@/shared/types";

import PixlyApi from "api/pixlyApi";
import Home from "Home";

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
        const resp = await fetch(`${BASE_URL}/images/`);
        const data: tImageModel[] = await resp.json();

        setImages(data);
        setIsLoading(false);
        console.log("Fetched:", { data });
      }

      if (isLoading) {
        getImages();
      }
    }, []);

  async function uploadImage(formData: tImageUpload) {
    console.log("APP: uploadImage");

    // let image: tImageModel;
    // try {
    //   image = await PixlyApi.uploadImage(formData);
    // } catch (err) {
    //   setErrors(err as [])
    //   return;
    // }
    //TODO: move to PixlyApi and handle sending in formdata and not just json
    const data = new FormData();
    data.append("uploadedFile", formData.uploadedFile!);
    data.append("filename", formData.filename);
    data.append("description", formData.description);
    data.append("comment", formData.comment);
    data.append("orientation", formData.orientation);

    try {
      const response = await fetch("http://localhost:3001/images/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const image: tImageModel = await response.json();
      console.log("APP: uploadImage", { image });
      setImages((currImages) => [...currImages, image]);
    } catch (err) {
      console.error("Failed to upload image", err);
      setErrors(err as []);
    }
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
            element={<ImageUploadForm uploadImage={uploadImage} />}
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
