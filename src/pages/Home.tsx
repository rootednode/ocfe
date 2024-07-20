import React, { useEffect, useState } from "react";
import Surveys from "../components/Surveys";
import Admin from "../components/Admin";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("admin");
    setIsAdmin(adminStatus === "1");
  }, []);

  return (
    <div className="sjs-client-app__content--surveys-list">
      <h1 style={{ textAlign: "center" }}>{isAdmin ? "Admin Dashboard" : "Surveys"}</h1>

      {isAdmin ? (
        <div>
        	<Admin />
        </div>
      ) : (
        <Surveys />
      )}

    </div>
  );
};

export default Home;
