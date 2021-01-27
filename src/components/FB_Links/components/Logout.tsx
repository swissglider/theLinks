import React, { useContext, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';
import { FrameworkContext } from '../../../utils/FrameworkContext';

const Logout = (): JSX.Element => {
    const [context, setContext] = useContext(FrameworkContext);
    const firebase = useFirebase();
    const history = useHistory();
    useEffect(() => {
        firebase.logout();
        const context_ = { ...context };
        context_.subNavButtons = [];
        context_.leftComponent = { name: '', icon: '' };
        setContext(context_);
        history.push(getMainComponentsConfigurationByLabel('Links').to);
    }, []);
    return <p>Error while Logout</p>;
};

export default Logout;
