const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";
import { tHTTPMethods, tImageModel, tImageUpload } from "@/shared/types";


type tPixlyApiRequest = {
  endpoint: string | number,
  data?: Record<string, any> | FormData,
  method?: tHTTPMethods,
  contentType?: "json" | "formData" | undefined;
};

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

  /**  Fetch request
   * Handles sending json in the body, data by query string, or formdata in the
   * body.
   */
  static async request({
    endpoint,
    data = {},
    method = "GET",
    contentType,
  }: tPixlyApiRequest)
    : Promise<any> {

    const url = new URL(`${BASE_URL}/${endpoint}`);

    // Add heads if we are sending over json
    const headers = contentType === "json"
      ? {
        'content-type': 'application/json',
      }
      : undefined

    // Add data to query string if a get request
    url.search = (method === "GET" && !(data instanceof FormData))
      ? new URLSearchParams(data).toString()
      : "";

    // GET -> set to undefined since the body property cannot exist on a GET method
    // POST contentType "json" -> stringify
    // POST contentType "formdata" -> data passed directly to body, no mods
    let body;
    if(method === "GET") body = undefined
    else if(method === "POST" && contentType === "json") body = JSON.stringify(data)
    else body = data

    const resp = await fetch(url, { method, body, headers })

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
    const res = await this.request({endpoint: `images/`});
    console.log("Pixly api: getImages", { images: res });
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
    const res = await this.request({endpoint: `images/`, data: { nameLike: term } });
    return res.images;
  }

  /** Get image details on an image by id.
  */

  static async getImage(id: number) {
    const res = await this.request({ endpoint: `images/${id}`});
    return res.company;
  }

  /**
   * Upload image to backend as multipart
   */
  static async uploadImage(
    { uploadedFile,
      filename,
      description = "",
      comment = "",
      orientation = "landscape",
    }: tImageUpload
  ) {
    console.log("PixlyApi: uploadImage params",
    { uploadedFile, filename, description, comment, orientation });

    const formData = new FormData();
    formData.append("uploadedFile", uploadedFile!);
    formData.append("filename", filename);
    formData.append("description", description);
    formData.append("comment", comment);
    formData.append("orientation", orientation);

    console.log("PixlyApi uploadImage:", { formData });

    const res = await this.request({
      endpoint: `images/upload`,
      data: formData,
      method: "POST",
    }
    );

    return res.image as tImageModel;
  }

}

export default PixlyApi;
