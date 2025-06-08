import { Grid } from "@mui/material";
import React from "react";
import VerticalTabs from "../components/Tabs";
import Header from "../shared/Header";
import "./UserAccount.css";

const UserAccount = () => {
  return (
    <>
      {" "}
      <Header />
      <Grid container className="container">
        <Grid item xs={12} className="title">
          <h1>My Account</h1>
        </Grid>

        <Grid container className="box-container">
          <VerticalTabs />
        </Grid>
      </Grid>
    </>
  );
};

export default UserAccount;
