import React from "react";
// import logo from "./logo.svg";
import logo2 from "./crypto_wallet_circle.png";
import "./App.css";

import { createStyles, makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {
    Fragment,
    useState,
    useEffect,
    useContext,
    useRef,
    useLayoutEffect,
    useReducer,
} from "react";
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ShowData = (props: any) => {
    return (
        <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            sx={{
                "& > :not(style)": {
                    color: "#fff",
                },
                "& > :before": {
                    borderBottom: "1px solid #FFF !important",
                },
            }}
        />
    );
};

export default ShowData;
