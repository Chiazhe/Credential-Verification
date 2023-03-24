import React, { useContext, createContext } from "react";

import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    // "0x115dE25c5B9a2E06C59f7690d5b6cd3506E00264"
    "0x510d0eb23a4D661768a980523DC4Bb38e1937a6f"
  );
  const address = useAddress();
  const connect = useMetamask();

  const createCredential = async (form) => {
    console.log("Submitting a new credential");
    try {
      const data = await contract.call(
        "createCredential",
        form.holder, // holder
        form.issuerName, // name of issuer
        form.holderName, // name of holder
        form.title, // title
        form.description, // description
        new Date(form.dateIssued).getTime(), // dateIssued
        new Date(form.dateExpired).getTime() // dateExpired
      );
      console.log("contract call success");
      console.log(data.receipt);
      return { ...data.receipt, status: "Success" };
    } catch (error) {
      console.log("contract call failure");
      console.log(error);
      console.log("Reason: " + error.reason);
      return error.reason;
    }
  };

  const getCredentialsByHolder = async () => {
    try {
      const data = await contract.call("getCredentialsByHolder", address);
      const credentials = data[0],
        credentialHashes = data[1];
      const parsedCredentials = credentials.map((credential, i) => ({
        credentialHash: credentialHashes[i],
        issuer: credential.issuer,
        holder: credential.holder,
        issuerName: credential.issuerName,
        holderName: credential.holderName,
        title: credential.title,
        description: credential.description,
        dateIssued: new Date(
          credential.dateIssued.toNumber()
        ).toLocaleDateString(),
        dateExpired: new Date(
          credential.dateExpired.toNumber()
        ).toLocaleDateString(),
      }));

      console.log(parsedCredentials);

      return parsedCredentials;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getOneCredentialByHolder = async (credentialHash) => {
    try {
      const credential = await contract.call(
        "getOneCredentialByHolder",
        address,
        credentialHash
      );

      const parsedCredentials = {
        credentialHash: credentialHash,
        issuer: credential.issuer,
        holder: credential.holder,
        issuerName: credential.issuerName,
        holderName: credential.holderName,
        title: credential.title,
        description: credential.description,
        dateIssued: new Date(
          credential.dateIssued.toNumber()
        ).toLocaleDateString(),
        dateExpired: new Date(
          credential.dateExpired.toNumber()
        ).toLocaleDateString(),
      };

      return parsedCredentials;
    } catch (error) {
      console.log(error);
      return "No such credential";
    }
  };

  const verifyCredential = async (credentialHash, accessToken) => {
    console.log("Verifying ...");
    const credential = await contract.call(
      "verifyCredential",
      credentialHash,
      accessToken
    );
    console.log("Verification done!");
    console.log(credential);
    const parsedCredentials = {
      credentialHash: credentialHash,
      issuer: credential.issuer,
      holder: credential.holder,
      issuerName: credential.issuerName,
      holderName: credential.holderName,
      title: credential.title,
      description: credential.description,
      dateIssued: new Date(
        credential.dateIssued.toNumber()
      ).toLocaleDateString(),
      dateExpired: new Date(
        credential.dateExpired.toNumber()
      ).toLocaleDateString(),
    };
    console.log(parsedCredentials);

    return parsedCredentials;
  };

  const getAccessToken = async (credentialHash) => {
    console.log("Getting access token ...");
    const accessToken = await contract.call(
      "getAccessToken",
      credentialHash,
      address
    );
    console.log("Successfully retrieve access token ...");
    console.log(accessToken);

    return accessToken;
  };

  const generateAccessToken = async (credentialHash) => {
    console.log("Generating new access token ...");
    try {
      await contract.call("generateAccessToken", credentialHash);
      console.log("New Access Token Successfully Generated");
      return "Success";
    } catch (error) {
      console.log("New Access Token Failed to Generate");
      console.log(error);
    }
  };

  const grantRole = async (address) => {
    const ISSUER_ROLE = await contract.call("ISSUER_ROLE");
    console.log("Granting role ... ");
    await contract.call("grantRole", ISSUER_ROLE, address);
    console.log("Grant success");
  };

  const isAdmin = async (address) => {
    // try {
    //   // const ADMIN_ROLE = await contract.call("DEFAULT_ADMIN_ROLE");
    //   console.log("Calling isAdmin");
    //   const ADMIN_ROLE =
    //     "0x0000000000000000000000000000000000000000000000000000000000000000";
    //   const HAS_ADMIN_ROLE = await contract.call(
    //     "hasRole",
    //     ADMIN_ROLE,
    //     address
    //   );
    //   console.log("Is admin: " + HAS_ADMIN_ROLE);
    //   return HAS_ADMIN_ROLE;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCredential,
        getCredentialsByHolder,
        verifyCredential,
        getAccessToken,
        generateAccessToken,
        getOneCredentialByHolder,
        grantRole,
        isAdmin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
