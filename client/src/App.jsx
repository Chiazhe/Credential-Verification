import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateCredential from "./pages/CreateCredential";
import ViewCredentialDetail from "./pages/ViewCredentialDetail";
import ViewAllCredentials from "./pages/ViewAllCredentials";
import VerifyCredential from "./pages/VerifyCredential";
import GrantRole from "./pages/GrantRole";

const App = () => {
  return (
    <div className="">
      <div className="">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issue" element={<CreateCredential />} />
          <Route path="/view" element={<ViewAllCredentials />} />
          <Route
            path="/view/:credentialHash"
            element={<ViewCredentialDetail />}
          />
          <Route path="/verify" element={<VerifyCredential />} />
          <Route path="/grant" element={<GrantRole />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
