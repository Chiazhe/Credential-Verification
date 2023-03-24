import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context";
import { thirdweb } from "../assets";
import CredentialDetailCard from "../components/CredentialDetailCard";
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";

const ViewCredentialDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessTokenResult, setAccessTokenResult] = useState();
  const [credential, setCredential] = useState();
  const [accessToken, setAccessToken] = useState();
  const { credentialHash } = useParams();
  const {
    address,
    contract,
    getAccessToken,
    generateAccessToken,
    getOneCredentialByHolder,
  } = useStateContext();

  const fetchPageCredential = async () => {
    setIsLoading(true);
    const data = await getOneCredentialByHolder(credentialHash);
    setCredential(data);
    setIsLoading(false);
  };

  const handleGetAccessTokenClick = async (credentialHash) => {
    setAccessTokenResult();
    setIsLoading(true);
    const data = await getAccessToken(credentialHash);
    setAccessToken(data);
    setIsLoading(false);
  };

  const handleGenerateAccessToken = async (credentialHash) => {
    setAccessToken();
    setIsLoading(true);
    const data = await generateAccessToken(credentialHash);
    setAccessTokenResult(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchPageCredential();
  }, [address, contract]);

  return (
    <div className="container">
      {isLoading && <Loader />}
      {credential === "No such credential" ? (
        <>
          <p>No such credential</p>
        </>
      ) : (
        <div className="credential-detail">
          <h1 className="credential-detail-title">Credential Detail</h1>
          {credential && (
            <>
              <CredentialDetailCard credential={credential} />
              <div className="credential-detail-info">
                <div className="credential-detail-info-section">
                  <h2>CREDENTIAL HASH</h2>
                  <p>{credential.credentialHash}</p>
                </div>
                <div className="credential-detail-info-section">
                  <h2>CREATOR</h2>
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
                <div className="credential-detail-info-section">
                  <h2>DESCRIPTION </h2>
                  <p className="credential-detail-info-description">
                    {credential.description}
                  </p>
                </div>
                <div className="credential-detail-info-section date-section">
                  <div>
                    <h2>ISSUING DATE</h2>
                    <p>{credential.dateIssued}</p>
                  </div>
                  <div>
                    <h2>EXPIRY DATE</h2>
                    <p>{credential.dateExpired}</p>
                  </div>
                </div>
                <div className="credential-detail-info-section submit-button-container">
                  <CustomButton
                    btnType="button"
                    title="Generate New Access Token"
                    styles="submit-button"
                    handleClick={() =>
                      handleGenerateAccessToken(credential.credentialHash)
                    }
                  />
                  <CustomButton
                    btnType="button"
                    title="Share"
                    styles="submit-button"
                    handleClick={() =>
                      handleGetAccessTokenClick(credential.credentialHash)
                    }
                  />
                </div>
                {accessTokenResult && (
                  <div className="success">
                    <h1>New Access Token Generated!</h1>
                  </div>
                )}
                {accessToken && (
                  <div className="credential-detail-info-access-token">
                    <h1>Retrieve success!</h1>
                    <div className="credential-detail-info-access-token-title">
                      <i>
                        Share your credential by sharing credential hash and
                        access token!
                      </i>
                    </div>
                    <p>
                      Your Credential Hash:{" "}
                      <span className="credential-detail-info-access-token-data">
                        {credentialHash}
                      </span>
                    </p>
                    <p>
                      Your Access Token:{" "}
                      <span className="credential-detail-info-access-token-data">
                        {accessToken}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewCredentialDetail;
