import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

import { useStateContext } from "../context";
import Loader from "../components/Loader";

const CreateCredential = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const { address, createCredential } = useStateContext();
  const [form, setForm] = useState({
    holder: "",
    issuerName: "",
    holderName: "",
    title: "",
    description: "",
    dateIssued: "",
    dateExpired: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await createCredential({
      ...form,
    });
    setResult(result);
    setIsLoading(false);
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      {address ? (
        <>
          {result.status === "Success" ? (
            <div className="success success-container">
              <h1>Transaction success!</h1>
              <p>Transaction Hash: {result.transactionHash}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="form create-credential-form"
            >
              <h2 className="form-heading">Create a new credential</h2>
              <div className="create-credentials-form-group">
                <FormField
                  labelName="Holder Address *"
                  placeholder="Holder address"
                  inputType="text"
                  value={form.holder}
                  handleChange={(e) => handleFormFieldChange("holder", e)}
                />
                <FormField
                  labelName="Holder Name *"
                  placeholder="Holder name"
                  inputType="text"
                  value={form.holderName}
                  handleChange={(e) => handleFormFieldChange("holderName", e)}
                />
              </div>
              <FormField
                labelName="Title *"
                placeholder="Credential title"
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange("title", e)}
              />
              <FormField
                labelName="Issuer Name *"
                placeholder="Issuer name"
                inputType="text"
                value={form.issuerName}
                handleChange={(e) => handleFormFieldChange("issuerName", e)}
              />
              <FormField
                labelName="Description *"
                placeholder="Description"
                isTextArea
                value={form.description}
                handleChange={(e) => handleFormFieldChange("description", e)}
              />
              <div className="create-credentials-form-group">
                <FormField
                  labelName="Date Issued *"
                  placeholder=""
                  inputType="date"
                  value={form.dateIssued}
                  handleChange={(e) => handleFormFieldChange("dateIssued", e)}
                />
                <FormField
                  labelName="Date Expired *"
                  placeholder=""
                  inputType="date"
                  value={form.dateExpired}
                  handleChange={(e) => handleFormFieldChange("dateExpired", e)}
                />
              </div>
              <div className="submit-button-container">
                <CustomButton
                  btnType="submit"
                  title="Issue Credential"
                  styles="submit-button"
                ></CustomButton>
              </div>
              {result.status !== "Success" && result !== "" && (
                <div className="error">
                  <p>Transaction failed!</p>
                  <p>{result}</p>
                </div>
              )}
            </form>
          )}{" "}
        </>
      ) : (
        <>
          <div>Please connect to your wallet first</div>
        </>
      )}
    </div>
  );
};

export default CreateCredential;
