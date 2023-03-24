import React, { useState, useEffect } from "react";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useStateContext } from "../context";
import CredentialDetailCard from "../components/CredentialDetailCard";
import Loader from "../components/Loader";

const VerifyCredential = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credential, setCredential] = useState([]);
  const [form, setForm] = useState({
    credentialHash: "",
    accessToken: "",
  });

  const { address, contract, verifyCredential } = useStateContext();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const credential = await verifyCredential(
      form.credentialHash,
      form.accessToken
    );
    setCredential(credential);
    setIsLoading(false);
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      {address ? (
        <div>
          <form onSubmit={handleSubmit} className="form create-credential-form">
            <h2 className="form-heading">Verify a Credential</h2>
            <FormField
              labelName="Credential Hash *"
              placeholder="Credential hash"
              inputType="text"
              value={form.credentialHash}
              handleChange={(e) => handleFormFieldChange("credentialHash", e)}
            />
            <FormField
              labelName="Access Token *"
              placeholder="Access token"
              inputType="text"
              value={form.accessToken}
              handleChange={(e) => handleFormFieldChange("accessToken", e)}
            />
            <div className="submit-button-container">
              <CustomButton
                btnType="submit"
                title="Verify"
                styles="submit-button"
              />
            </div>
          </form>
          {credential.length !== 0 && (
            <div className="verify-verified-container">
              <h2 className="verify-verified-text">Credential Verified!</h2>
              <CredentialDetailCard credential={credential} />
            </div>
          )}
        </div>
      ) : (
        <>
          <div>Please connect to your wallet first</div>
        </>
      )}
    </div>
  );
};

export default VerifyCredential;
