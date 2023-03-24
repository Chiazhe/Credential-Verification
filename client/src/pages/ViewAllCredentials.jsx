import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import CredentialCard from "../components/CredentialCard";
import Loader from "../components/Loader";

const ViewAllCredentials = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState([]);

  const { address, contract, getCredentialsByHolder } = useStateContext();

  const fetchUserCredentials = async () => {
    setIsLoading(true);
    const data = await getCredentialsByHolder();
    setCredentials(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!address) return;
    if (contract) fetchUserCredentials();
  }, [address, contract]);

  return (
    <div className="container">
      {isLoading && <Loader />}
      {address ? (
        <>
          <h1 className="profile-title">
            All Credentials ({credentials.length})
          </h1>
          <div className="profile-grid">
            {credentials.length !== 0 &&
              credentials.map((credential, i) => {
                return <CredentialCard key={i} credential={credential} />;
              })}
            {credentials.length === 0 && (
              <h3>You doesn't own any credential</h3>
            )}
          </div>
        </>
      ) : (
        <>
          <div>Please connect to your wallet first</div>
        </>
      )}
    </div>
  );
};

export default ViewAllCredentials;
