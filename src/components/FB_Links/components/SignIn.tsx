import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../redux/Store';
import { Button, createStyles, Icon, makeStyles, Theme } from '@material-ui/core';
import { FrameworkContext } from '../../../utils/FrameworkContext';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            flexGrow: 1,
            width: theme.spacing(30),
            minWidth: theme.spacing(30),
            maxWidth: theme.spacing(30),
        },
        root: {
            marginTop: theme.spacing(3),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
    }),
);

const SignIn = (): JSX.Element => {
    const classes = useStyles();
    const firebase = useFirebase();
    const history = useHistory();
    const [context, setContext] = useContext(FrameworkContext);
    const [authUser, setAuthUser] = useState<any>(undefined);
    const stateAuth: any = useSelector((state: RootState) => state.firebase);
    const hL = getMainComponentsConfigurationByLabel('Links').to;

    const loggedIn = () => {
        const { displayName, photoURL } = stateAuth.auth;
        const context_ = { ...context };
        context_.leftComponent = { name: displayName, icon: photoURL };
        setContext(context_);
        history.push(`${hL}/links`);
    };

    const getTitleAddon = (): JSX.Element => <>you have to sign in</>;

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged(
            (authUser) => {
                if (authUser !== undefined && authUser !== null) {
                    setAuthUser(authUser);
                }
            },
            () => {
                setAuthUser(undefined);
            },
        );
        return () => {
            listener();
        };
    }, []);

    useEffect(() => {
        if (authUser !== undefined) {
            loggedIn();
        }
    });

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Sign In';
        context_.subNavButtons = [];
        context_.rightComponent = getTitleAddon();
        setContext(context_);
    }, []);

    const signInWithGoogle = () => {
        firebase
            .login({
                provider: 'google',
                type: 'popup',
            })
            .then(() => {
                loggedIn();
            })
            .catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);

                const errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage);
                history.push(hL);
            });
    };
    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                    event.preventDefault();
                    signInWithGoogle();
                }}
                className={classes.iconButton}
                startIcon={<Icon>login</Icon>}
            >
                Sign in with Google
            </Button>
        </div>
    );
};

export default SignIn;
