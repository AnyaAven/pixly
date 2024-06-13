import "./ImageUploadForm.css";
import { useState } from "react";
import React from "react";

import { isValsFilled, pluralize } from "../helpers/utils";
import Alert from "../Alert";

//Cards
import { Card, CardBody, CardTitle } from "reactstrap";
//Forms
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

import { tImageUpload } from "@/shared/types";

type tImageUploadFormProps = {
  uploadImage: (formData: tImageUpload) => void;
};

/**
 * ImageUploadForm
 * Used to upload new image to state in App
 *
 * Props:
 * - uploadImage: Callback fn from App
 *
 * State:
 * - formData:{
    uploadedFile: null,
    filename: "",
    description: "",
    comment: "",
    orientation: "landscape"
  }
 * - submission: {isSubmitted, amount}
 *
 */

export function ImageUploadForm({ uploadImage }: tImageUploadFormProps) {
  console.log("* ImageUploadForm");

  const initialFormData = {
    uploadedFile: null as File | null,
    filename: "",
    description: "",
    comment: "",
    orientation: "landscape" as "landscape" | "portrait",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submission, setSubmission] = useState({
    isSubmitted: false,
    amount: 0,
  });

  const isFilled = isValsFilled(formData);

  /** Update form inputs. */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    const { name, value } = evt.target;

    if (name === "uploadedFile") {
      const file = (evt.target as HTMLInputElement).files?.[0] || null;
      setFormData((formData) => ({
        ...formData,
        uploadedFile: file,
      }));
      return;
    }

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    if (!formData.uploadedFile) {
      console.error("File is required");
      return
    }
    console.log("handleSubmit", {formData})
    uploadImage(formData);

    // Reset form
    setFormData(initialFormData);

    // Add submission amount + 1
    setSubmission((currData) => ({
      ...currData,
      isSubmitted: true,
      amount: currData.amount + 1,
    }));
  }

  return (
    <section className="ImageUploadForm col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="fw-bold text-center">
            Upload an image!
          </CardTitle>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              {/* FILENAME */}
              <Label for="ImageUploadForm-filename">Filename:</Label>
              <Input
                id="ImageUploadForm-filename"
                name="filename"
                value={formData.filename}
                onChange={handleChange}
                placeholder="new-image"
              />

              {/* DESCRIPTION */}
              <Label for="ImageUploadForm-description">Description:</Label>
              <Input
                id="ImageUploadForm-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                type="textarea"
              />

              {/* COMMENT */}
              <Label for="ImageUploadForm-comment">Comment:</Label>
              <Input
                id="ImageUploadForm-comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                type="textarea"
              />

              {/* ORIENTATION */}
              <Label for="ImageUploadForm-orientation">Select an orientation:</Label>
              <Input
                id="ImageUploadForm-orientation"
                name="orientation"
                value={formData.orientation}
                onChange={handleChange}
                type="select"
              >
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
              </Input>

              {/* FILE */}
              <Label for="ImageUploadForm-file">File:</Label>
              <Input
                id="ImageUploadForm-file"
                name="uploadedFile"
                onChange={handleChange}
                type="file"
                encType="multipart/form-data"
              />
            </FormGroup>

            {submission.isSubmitted && (
              <Alert type="success">
                Uploaded {submission.amount} {pluralize(submission.amount, "image")}!
              </Alert>
            )}
            <Button disabled={!isFilled}>Upload!</Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default ImageUploadForm;
