import React from "react";
import CustomButton from "../components/CustomButton";
import { useStateContext } from "../context";

const Home = () => {
  const { connect, address } = useStateContext();
  return (
    <div className="container">
      <div className="homepage">
        <h2>Welcome to Verifi</h2>
        {address ? (
          <p className="homepage-address">{address}</p>
        ) : (
          <CustomButton
            btnType="button"
            title={address ? address : "Connect to Metamask"}
            styles="submit-button"
            handleClick={() => {
              if (!address) connect();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
