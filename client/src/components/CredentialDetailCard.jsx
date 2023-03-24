import React from "react";
import { logo, approved } from "../assets";

const CredentialDetailCard = (props) => {
  const { credential } = props;
  return (
    <div className="credential-detail-card">
      <img src={logo} className="credential-detail-card-logo" />
      <h2>This certificate certify</h2>
      <p>
        <i>{credential.holderName}</i>
      </p>
      <h3>for completing a</h3>
      <p>
        <i>{credential.title}</i>
      </p>
      <h3>with</h3>
      <p>
        <i>{credential.issuerName}</i>
      </p>
      <div className="credential-detail-card-footer">
        <div>
          <p>Issued on: </p>
          <p>{credential.dateIssued}</p>
        </div>
      </div>
      <img src={approved} className="credential-detail-card-approved-img" />
    </div>
  );
};

export default CredentialDetailCard;
