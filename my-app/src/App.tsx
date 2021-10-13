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
};

const initialState: State = {
    username: "",
    password: "",
    isButtonDisabled: true,
    helperText: "",
    isError: false,
    displayStatus: "block",
};

type Action =
    | { type: "setUsername"; payload: string }
    | { type: "setPassword"; payload: string }
    | { type: "setIsButtonDisabled"; payload: boolean }
    | { type: "loginSuccess"; payload: string }
    | { type: "loginFailed"; payload: string }
    | { type: "setIsError"; payload: boolean }
    | { type: "setDisplayStatus"; payload: string };

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
    }
};

const App = () => {
    // const [username, setUserName] = useState();
    const [password, setPassword] = useState();
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
    }, [state.username, state.password]);

    const handleLogin = () => {
        if (state.username === "hung" && state.password === "123456") {
            dispatch({
                type: "loginSuccess",
                payload: "Login Successfully",
            });
            dispatch({
                type: "setDisplayStatus",
                payload: "none",
            });
        } else {
            dispatch({
                type: "loginFailed",
                payload: "Incorrect username or password",
            });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
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

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo2} className="App-logo" alt="logo" />
                <h3>Welcome Back!</h3>
                <p>The decentralized web awaits</p>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        "& > :not(style)": {
                            marginTop: "2rem",
                        },
                    }}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            "& > :not(style)": {
                                marginTop: "2rem",
                                background: "#282c34",
                            },
                        }}>
                        <Item>
                            <form>
                                <Box
                                    component="form"
                                    sx={{
                                        "& > :not(style)": {
                                            m: 0,
                                            width: "35ch",
                                        },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    display={state.displayStatus}>
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
                                    display={state.displayStatus}
                                    sx={{
                                        "& > :not(style)": {
                                            m: 3,
                                            width: "36ch",
                                        },
                                    }}>
                                    <Button
                                        variant="contained"
                                        // type="submit"
                                        // className={classes.loginBtn}
                                        onClick={handleLogin}
                                        // disabled={state.isButtonDisabled}
                                    >
                                        UNLOCK
                                    </Button>
                                </Stack>
                            </form>
                        </Item>
                    </Grid>
                </Grid>
            </header>
        </div>
    );
};

export default App;
