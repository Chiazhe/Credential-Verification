import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

const GrantRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    addressToGrantRole: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const { grantRole } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await grantRole(form.addressToGrantRole);
    setIsLoading(false);
    //   navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form create-credential-form">
        <h2 className="form-heading">Grant Issuer Role</h2>
        <FormField
          labelName="Address *"
          placeholder="Address"
          inputType="text"
          value={form.addressToGrantRole}
          handleChange={(e) => handleFormFieldChange("addressToGrantRole", e)}
        />
        <div className="submit-button-container">
          <CustomButton
            btnType="submit"
            title="Grant Role"
            styles="submit-button"
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default GrantRole;
