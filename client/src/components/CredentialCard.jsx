import React from "react";
import { useNavigate } from "react-router-dom";
import { institution, address, credentialhash } from "../assets";
import CustomButton from "./CustomButton";
import { thirdweb } from "../assets";

const CredentialCard = (props) => {
  const { credential } = props;
  const navigate = useNavigate();
  return (
    <div className="credential-card">
      <h2 className="credential-card-title">{credential.title}</h2>
      <div
        className="credential-detail-info-section"
        style={{ marginTop: "10px", marginBottom: 0 }}
      >
        <div className="credential-detail-info-creator-group">
          <img src={thirdweb} />
          <div>
            <p>{credential.issuerName}</p>
            <p>
              <i>{credential.issuer}</i>
            </p>
          </div>
        </div>
      </div>
      <p className="credential-card-description">{credential.description}</p>
      <div className="submit-button-container">
        <CustomButton
          btnType="button"
          title="View Detail →"
          styles="submit-button"
          handleClick={() => navigate("/view/" + credential.credentialHash)}
        />
      </div>
    </div>
  );
};

export default CredentialCard;
