import React, { useContext } from "react";
import {
  IoCloudUploadOutline,
  IoDesktopOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { AppContext } from "../context";

const ClientImage = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const img = event.target.files[0];
    console.log(img);
    const filetype = img.name.split('.').pop();
    const fr = new FileReader();
    dispatch({ type: "LOADING_ADDED_IMAGE" });
    fr.readAsDataURL(img);
    fr.onload = () => {
      if (fr.result) {
        const result = fr.result.toString() + `.${filetype}`;
        dispatch({ type: "ADD_IMAGE", imageString: result });
      }
    };
  };

  return (
    <div className="component-flex-item">
      <div className="label-container flex-item">
        <h2>Cliente</h2>
        <IoDesktopOutline className="label-icon" />
      </div>
      {!state.imageString ? (
        <form
          onChange={handleSubmit}
          method="post"
          id="client-image-form"
          className="content-container flex-item"
        >
          <IoCloudUploadOutline className="upload-icon" />
          <label
            htmlFor="client-image-input"
            className="single-action-button"
            aria-roledescription="upload-image-button"
          >
            Sube una imagen
          </label>
          <input
            type="file"
            name="client-image-input"
            id="client-image-input"
            accept="image/*"
            hidden
          />
        </form>
      ) : (
        <>
          <div className="content-container flex-item">
            <img
              src={state.imageString.split(".").at(0)}
              className="client-image flex-item"
              alt="uploaded-pic"
            />
          </div>
          <div className="action-buttons-container flex-item">
            <button
              className="single-action-button"
              onClick={() => dispatch({ type: "DELETE" })}
            >
              <IoTrashOutline className="action-button-icon" />
              Eliminar foto
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientImage;
