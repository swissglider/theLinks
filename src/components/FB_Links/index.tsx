import React from 'react';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../../notToSync/config';
import { useDispatch } from 'react-redux';
import { createFirestoreInstance } from 'redux-firestore';
import SignIn from './components/SignIn';
import Links from './components/Links';
import Logout from './components/Logout';
import AddLink from './components/AddLink';
import EditLink from './components/EditLink';
import DeleteLink from './components/DeleteLink';
import SingleFolder from './components/SingleFolder';
import SearchLinks from './components/SearchLinks';

firebase.initializeApp(config);
firebase.firestore();

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
};

const FB_Links = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { path, url } = useRouteMatch();
    const dispatch = useDispatch();
    const rrfProps = {
        firebase,
        config: rrfConfig,
        dispatch: dispatch,
        createFirestoreInstance, //since we are using Firestore
    };

    return (
        <ReactReduxFirebaseProvider {...rrfProps}>
            <Switch>
                <Route exact path={path} component={SignIn} />
                <Route exact path={`${path}/Logout`} component={Logout} />
                <Route path={`${path}/Links`} component={Links} />
                <Route path={`${path}/AddLink`} component={AddLink} />
                <Route path={`${path}/editLink/:linkId`} component={EditLink} />
                <Route path={`${path}/deleteLink/:linkId`} component={DeleteLink} />
                <Route path={`${path}/singleFolder/:folderID`} component={SingleFolder} />
                <Route path={`${path}/SearchLinks`} component={SearchLinks} />
            </Switch>
        </ReactReduxFirebaseProvider>
    );
};

export default FB_Links;
