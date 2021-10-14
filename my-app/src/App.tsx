import React from "react";
// import logo from "./logo.svg";
import logo2 from "./crypto_wallet_circle.png";
import "./App.css";
import ShowData from "./ShowData";
// import App from "./App";

import { createStyles, makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

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

import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

// const useStyles = makeStyles((theme: ThemeProvider) =>
//     createStyles({
//         container: {
//             display: "flex",
//             flexWrap: "wrap",
//             width: 400,
//             margin: `${theme.spacing(0)} auto`,
//         },
//         loginBtn: {
//             marginTop: theme.spacing(2),
//             flexGrow: 1,
//         },
//         header: {
//             textAlign: "center",
//             background: "#212121",
//             color: "#fff",
//         },
//         card: {
//             marginTop: theme.spacing(10),
//         },
//     })
// );

//state type

type State = {
    username: string;
    password: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
    displayStatus: string;
    openInputForm: string;
    openDataTable: string;
    searchInput: string;
    dataTable: any;
};

const initialState: State = {
    username: "",
    password: "",
    isButtonDisabled: true,
    helperText: "",
    isError: false,
    displayStatus: "block",
    openInputForm: "none",
    openDataTable: "none",
    searchInput: "",
    dataTable: [],
};

type Action =
    | { type: "setUsername"; payload: string }
    | { type: "setPassword"; payload: string }
    | { type: "setSearchInput"; payload: string }
    | { type: "setIsButtonDisabled"; payload: boolean }
    | { type: "loginSuccess"; payload: string }
    | { type: "loginFailed"; payload: string }
    | { type: "setIsError"; payload: boolean }
    | { type: "setDisplayStatus"; payload: string }
    | { type: "setOpenInputForm"; payload: string }
    | { type: "setOpenDataTable"; payload: string }
    | { type: "setSearchInput"; payload: string }
    | { type: "setDataTable"; payload: any };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "setUsername":
            return {
                ...state,
                username: action.payload,
            };
        case "setPassword":
            return {
                ...state,
                password: action.payload,
            };
        case "setIsButtonDisabled":
            return {
                ...state,
                isButtonDisabled: action.payload,
            };
        case "loginSuccess":
            return {
                ...state,
                helperText: action.payload,
                isError: false,
            };
        case "loginFailed":
            return {
                ...state,
                helperText: action.payload,
                isError: true,
            };
        case "setIsError":
            return {
                ...state,
                isError: action.payload,
            };
        case "setDisplayStatus":
            return {
                ...state,
                displayStatus: action.payload,
                isError: false,
            };
        case "setOpenInputForm":
            return {
                ...state,
                openInputForm: action.payload,
            };
        case "setOpenDataTable":
            return {
                ...state,
                openDataTable: action.payload,
            };
        case "setSearchInput":
            return {
                ...state,
                searchInput: action.payload,
            };
        case "setDataTable":
            return {
                ...state,
                dataTable: action.payload,
            };
    }
};

const App = () => {
    return (
        <div>
            <Login />
        </div>
    );
};

const Login = () => {
    // const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [searchInput, setSearchInput] = useState();
    const [dataTable, setDataTable] = useState();
    // const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: "setIsButtonDisabled",
                payload: false,
            });
        } else {
            dispatch({
                type: "setIsButtonDisabled",
                payload: true,
            });
        }
        if (state.searchInput.trim() !== "") {
            dispatch({
                type: "setDataTable",
                payload: state.dataTable,
            });
        }
    }, [state.username, state.password, state.dataTable]);

    const history = useHistory();
    const handleLogin = () => {
        if (state.username === "h" && state.password === "1") {
            dispatch({
                type: "loginSuccess",
                payload: "Login Successfully",
            });
            dispatch({
                type: "setDisplayStatus",
                payload: "none",
            });
            dispatch({
                type: "setOpenInputForm",
                payload: "block",
            });
        } else {
            dispatch({
                type: "loginFailed",
                payload: "Incorrect username or password",
            });
        }
    };

    const handleShowData = () => {
        if (state.searchInput !== "") {
            fetchData();
            dispatch({
                type: "setOpenDataTable",
                payload: "block",
            });
        }
    };

    const fetchData = async () => {
        const result = await fetch(
            "https://api.etherscan.io/api?module=account&action=txlist&address=" +
                state.searchInput +
                "&startblock=0&endblock=99999999&sort=asc&apikey=JSXICG3EMIIEXRMN7TVH7CHV5A637CWSQV"
        );
        const data = await result.json();
        setDataTable(data.result);
        dispatch({
            type: "setDataTable",
            payload: data.result,
        });
        console.table(data.result);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleSearchPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleShowData();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        dispatch({
            type: "setUsername",
            payload: event.target.value,
        });
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        dispatch({
            type: "setPassword",
            payload: event.target.value,
        });
    };

    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        dispatch({
            type: "setSearchInput",
            payload: event.target.value,
        });
    };

    // const rows = state.dataTable;
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo2} className="App-logo" alt="logo" />
                <Grid
                    container
                    spacing={2}
                    sx={{
                        "& > :not(style)": {
                            marginTop: "2rem",
                        },
                    }}>
                    <Grid
                        display={state.displayStatus}
                        item
                        xs={12}
                        sx={{
                            "& > :not(style)": {
                                marginTop: "2rem",
                                background: "#282c34",
                            },
                        }}>
                        <Item className="info-header">
                            <Typography display="block" component="h3">
                                Welcome Back!
                            </Typography>
                            <Typography display="block" component="p">
                                The decentralized web awaits
                            </Typography>
                        </Item>
                        <Item>
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": {
                                        m: 0,
                                        width: "35ch",
                                    },
                                }}
                                noValidate
                                autoComplete="off">
                                <TextField
                                    error={state.isError}
                                    fullWidth
                                    id="username"
                                    type="email"
                                    label="Username"
                                    placeholder="Username"
                                    margin="normal"
                                    variant="standard"
                                    onChange={handleUsernameChange}
                                    onKeyPress={handleKeyPress}
                                    sx={{
                                        "& > :not(style)": {
                                            color: "#fff",
                                        },
                                        "& > :before": {
                                            borderBottom:
                                                "1px solid #FFF !important",
                                        },
                                    }}
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Password"
                                    variant="standard"
                                    sx={{
                                        "& > :not(style)": {
                                            color: "#fff",
                                        },
                                        "& > :before": {
                                            borderBottom:
                                                "1px solid #FFF !important",
                                        },
                                    }}
                                    error={state.isError}
                                    fullWidth
                                    placeholder="Password"
                                    margin="normal"
                                    helperText={state.helperText}
                                    onChange={handlePasswordChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </Box>
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{
                                    "& > :not(style)": {
                                        m: 3,
                                        width: "36ch",
                                    },
                                }}>
                                <Button
                                    variant="contained"
                                    onClick={handleLogin}>
                                    UNLOCK
                                </Button>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid
                        display={state.openInputForm}
                        item
                        xs={12}
                        sx={{
                            "& > :not(style)": {
                                marginTop: "2rem",
                                background: "#282c34",
                            },
                        }}>
                        <Item>
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": {
                                        m: 0,
                                        width: "35ch",
                                    },
                                }}
                                noValidate
                                autoComplete="off">
                                <TextField
                                    // id="standard-basic"
                                    label="Enter wallet address"
                                    variant="standard"
                                    sx={{
                                        "& > :not(style)": {
                                            color: "#fff",
                                        },
                                        "& > :before": {
                                            borderBottom:
                                                "1px solid #FFF !important",
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Enter wallet address"
                                    margin="normal"
                                    onChange={handleSearchChange}
                                    onKeyPress={handleSearchPress}
                                />
                            </Box>
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{
                                    "& > :not(style)": {
                                        m: 3,
                                        width: "36ch",
                                    },
                                }}>
                                <Button
                                    variant="contained"
                                    onClick={handleShowData}>
                                    Show Data
                                </Button>
                            </Stack>
                            {/* <Typography
                                display={state.openInputForm}
                                component="p">
                                {state.dataTable}
                            </Typography> */}
                        </Item>
                    </Grid>
                    <Grid
                        display={state.openDataTable}
                        item
                        xs={12}
                        sx={{
                            "& > :not(style)": {
                                marginTop: "2rem",
                                background: "#282c34",
                            },
                        }}>
                        <Item>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ maxWidth: 400 }}
                                    aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>blockNumber</TableCell>
                                            <TableCell align="right">
                                                timeStamp
                                            </TableCell>
                                            <TableCell align="right">
                                                hash
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {state.dataTable.map((row: any) => (
                                            <TableRow
                                                key={row.blockNumber}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        { border: 0 },
                                                }}>
                                                <TableCell
                                                    component="th"
                                                    scope="row">
                                                    {row.blockNumber}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.timeStamp}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.hash.substr()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Item>
                    </Grid>
                </Grid>
            </header>
        </div>
    );
};

export default App;
