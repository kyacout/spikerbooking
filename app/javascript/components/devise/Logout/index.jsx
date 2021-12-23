import React, { useContext, useEffect } from "react";
import { deleteReq } from "../../../helpers/HTTPRequest";
import { Context } from "../../App";

export const Logout = () => {
  const { token } = useContext(Context);

  const handleLogout = () => {
    deleteReq("users/sign_out/", token)
      .then(() => window.location.replace("/"))
      .catch(e => console.error(e));
  };

  useEffect(() => {
    console.log("test");
    handleLogout();
  }, []);

  return (
    <div>
    </div>
  );
};
