import React from "react";
import "./App.css";
import ClientImage from "./components/ClientImage";
import EncryptedImage from "./components/EncryptedImage";
import ServerImage from "./components/ServerImage";
import { AppProvider } from "./context";

function App() {
  return (
    <div className="app-container dark-theme">
      <AppProvider>
        <ClientImage />
        <EncryptedImage />
        <ServerImage />
      </AppProvider>
    </div>
  );
}

export default App;
