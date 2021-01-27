import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { useFirestore } from 'react-redux-firebase';
import { FrameworkContext } from '../../../utils/FrameworkContext';
import LinkForm, { I_LinkForm } from './LinkForm';
import { I_Link } from './Links/interfaces/interfaces';
import isAuthenticated from '../utils/isAuthenticated';
import { GetLinksTitleAddonWithBack } from '../utils/linkFolderHelper';

const AddLink = (): JSX.Element => {
    const [context, setContext] = useContext(FrameworkContext);
    const stateAuth: any = useSelector((state: RootState) => state.firebase);
    const { displayName, uid } = stateAuth.auth;
    const firestore = useFirestore();

    isAuthenticated(true);

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Add New Link';
        context_.subNavButtons = [];
        context_.rightComponent = <GetLinksTitleAddonWithBack />;
        setContext(context_);
    }, []);

    const onSaveLinkClicked = (link: I_Link) => {
        firestore
            .collection('links')
            .doc(`"${link.name}"`)
            .set({
                // .add({
                name: link.name,
                link: link.link,
                folder: link.folder,
                target: link.target,
                description: link.description,
                color: link.color,
                owner: uid,
            })
            .then(() => {
                return;
            });
    };

    const formProps: I_LinkForm = {
        link: {
            name: '',
            link: '',
            folder: '',
            target: '',
            description: '',
            color: '',
            id: '',
            owner: '',
        },
        displayName: displayName,
        onSaveLinkClicked: onSaveLinkClicked,
        withReset: false,
    };

    return <LinkForm {...formProps} />;
};

export default AddLink;
