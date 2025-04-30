'use client';
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const ImagePicke = useRef();

  function handelPickClick() {
    ImagePicke.current.click()
  }

  function handelImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && 
          <Image
            src={pickedImage}
            alt="picked image"
            fill
          />}
        </div>
      </div>
      <input
        className={classes.input}
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        ref={ImagePicke}
        onChange={handelImageChange}
      />
      <button className={classes.button} type="button" onClick={handelPickClick}>
        Pick an image
      </button>
    </div>
  );
}
