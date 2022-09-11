import { useEffect, useContext, createRef } from "react";
import { IoDocumentLockOutline, IoCopyOutline } from "react-icons/io5";
import CryptoJS from "crypto-js";
import { AppContext } from "../context";
import { copyToClipboard } from "../Copy";

const EncryptedImage = () => {
  const { state, dispatch } = useContext(AppContext);
  const textareaRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    const makeEncryptedString = () => {
      if (state.imageString) {
        dispatch({ type: "LOADING_ENCRYPT" });
        const encryptedString = CryptoJS.AES.encrypt(
          state.imageString,
          "password",
          CryptoJS.enc.Utf8
        ).toString();
        dispatch({
          type: "ENCRYPT",
          imageEcryptedString: encryptedString,
        });
      }
    };
    makeEncryptedString();
    return () => {};
  }, [state.imageString, dispatch]);

  const copyEncryptedString = () => {
    if (textareaRef.current?.value) {
      copyToClipboard(textareaRef.current.value);
    }
  };

  return (
    <div className="component-flex-item">
      <div className="label-container flex-item">
        <h2>Encriptación</h2>
        <IoDocumentLockOutline className="label-icon" />
      </div>
      {state.imageEncryptedString ? (
        <>
          <div className="content-container flex-item">
            <textarea
              ref={textareaRef}
              className="encrypted-image-string"
              readOnly
              value={state.imageEncryptedString}
            ></textarea>
          </div>
          <div className="action-buttons-container flex-item">
            <button
              className="single-action-button"
              onClick={() => copyEncryptedString()}
            >
              <IoCopyOutline className="action-button-icon" />
              Copiar a portapales
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="content-container flex-item"></div>
          <div className="action-buttons-container flex-item"></div>
        </>
      )}
    </div>
  );
};

export default EncryptedImage;
