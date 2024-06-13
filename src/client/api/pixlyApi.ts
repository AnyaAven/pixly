const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";
import { tHTTPMethods, tImageModel, tImageUpload } from "@/shared/types";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PixlyApi {
  // if we want to add auth later, add this to headers object
  //authorization: `Bearer ${PixlyApi.token}`,
  static async request(
    endpoint: string | number,
    data: Record<string, any> = {},
    method: tHTTPMethods = "GET") {

    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /****************************************************************** IMAGES */

  /**
   * Get images
   * returns: [image,...]
   */
  static async getImages(): Promise<tImageModel[]> {
    const res = await this.request(`images/`);
    console.log("Pixly api: getImages", {images: res})
    return res.images;
  }

  /** Get images by search term
   *
   * term: "apple"
   *
   * returns all images with name partially matching the term (case-insensitive)
  */

  static async getImagesBySearch(term: string) {
    //FIXME full text search
    const res = await this.request(`images/`, { nameLike: term }, "GET");
    return res.images;
  }

  /** Get image details on an image by id.
  */

  static async getImage(id: number) {
    const res = await this.request(`images/${id}`);
    return res.company;
  }

  /**
   * returns: token
   */
  static async uploadImage(
    { uploadedFile,
      filename,
      description = "",
      comment = "",
      orientation = "landscape",
    }: tImageUpload
  ) {
    console.log("PixlyApi:", { uploadedFile, filename, description, comment, orientation })

    const res = await this.request(
      `images/upload`,
      { uploadedFile, filename, description, comment, orientation },
      "POST"
    );

    return res.image as tImageModel;
  }

}

export default PixlyApi;
