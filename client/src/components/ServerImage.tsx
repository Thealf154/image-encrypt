import React, { useContext, useEffect } from "react";
import { IoCloudyOutline, IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import { AppContext } from "../context";
import io from "socket.io-client";

const ServerImage = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.imageEncryptedString) {
      const socket = io("ws://localhost:3001");
      socket.emit("send_image", state.imageEncryptedString);
      socket.on("decryption", (repsonse: string) => {
        dispatch({ type: "RECEIVED_IMAGE", receivedEncryptedString: repsonse });
      });
    }
    return () => {};
  }, [state.imageEncryptedString, dispatch]);

  return (
    <div className="component-flex-item">
      <div className="label-container flex-item">
        <h2>Servidor</h2>
        <IoCloudyOutline className="label-icon" />
      </div>
      {!state.receivedEncryptedString ? (
        <>
          <div className="content-container flex-item"></div>
          <div className="action-buttons-container flex-item"></div>
        </>
      ) : (
        <>
          <div className="content-container flex-item">
            <img
              src={state.receivedEncryptedString}
              className="client-image flex-item"
              alt="received-decrypt-pic"
            />
          </div>
          <div className="action-buttons-container flex-item">
            {state.receivedEncryptedString === state.imageString ? (
              <div className="single-action-button">
                <IoCheckmarkSharp className="action-button-icon" />
                Son iguales
              </div>
            ) : (
              <div className="single-action-button">
                <IoCloseSharp className="action-button-icon" />
                No son iguales</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ServerImage;
