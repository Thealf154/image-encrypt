import React, { useReducer, createContext, Dispatch } from "react";

type State = {
  imageString: string;
  imageEncryptedString: string;
  receivedEncryptedString: string;
  loadingImage: boolean;
  loadingEncryption: boolean;
  loadingReceivedImage: boolean;
  error: string;
};

const initialState = {
  imageString: "",
  imageEncryptedString: "",
  receivedEncryptedString: "",
  loadingImage: false,
  loadingEncryption: false,
  loadingReceivedImage: false,
  error: "",
};

type Action =
  | { type: "ADD_IMAGE"; imageString: string }
  | { type: "ENCRYPT"; imageEcryptedString: string }
  | { type: "UPLOAD_IMAGE" }
  | { type: "RECEIVED_IMAGE"; receivedEncryptedString: string }
  | { type: "LOADING_ADDED_IMAGE" }
  | { type: "LOADING_ENCRYPT" }
  | { type: "LOADING_RECEIVED_IMAGE" }
  | { type: "ERROR"; error: string }
  | { type: "DELETE" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_IMAGE":
      const { imageString } = action;
      return { ...state, imageString: imageString, loadingImage: false };
    case "ENCRYPT":
      const { imageEcryptedString } = action;
      return {
        ...state,
        imageEncryptedString: imageEcryptedString,
        loadingEncryption: false,
      };
    case "RECEIVED_IMAGE":
      const { receivedEncryptedString } = action;
      return {
        ...state,
        receivedEncryptedString: receivedEncryptedString,
        loadingEncryption: false,
      };
    case "LOADING_ADDED_IMAGE":
      return { ...state, loadingImage: true };
    case "LOADING_ENCRYPT":
      return { ...state, loadingEncryption: true };
    case "LOADING_RECEIVED_IMAGE":
      return { ...state, loadingReceivedImage: true };
    case "ERROR":
      const { error } = action;
      return {
        ...state,
        imageString: "",
        loadingImage: false,
        error: error,
      };
    case "DELETE":
      return {
        ...state,
        imageString: "",
        imageEncryptedString: "",
        receivedEncryptedString: "",
      };
    default:
      throw new Error();
  }
};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
