import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { FrameworkContext } from '../../../utils/FrameworkContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import LinkForm, { I_LinkForm } from './LinkForm';
import { I_Link } from './Links/interfaces/interfaces';
import isAuthenticated from '../utils/isAuthenticated';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';
import { GetLinksTitleAddonWithBack } from '../utils/linkFolderHelper';

const EditLink = (): JSX.Element => {
    const { linkId } = useParams<Record<string, string | undefined>>();
    const [context, setContext] = useContext(FrameworkContext);
    const history = useHistory();
    const stateAuth: any = useSelector((state: RootState) => state.firebase);
    const { displayName, uid } = stateAuth.auth;
    const firestore = useFirestore();
    const hL = getMainComponentsConfigurationByLabel('Links').to;

    if (!(isAuthenticated() && linkId !== undefined)) {
        history.push(hL);
    }

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Edit Link';
        context_.subNavButtons = [];
        context_.rightComponent = <GetLinksTitleAddonWithBack />;
        setContext(context_);
    }, []);

    const onSaveLinkClicked = (link: I_Link) => {
        const link_ = {
            name: link.name,
            link: link.link,
            folder: link.folder,
            target: link.target,
            description: link.description !== undefined ? link.description : '',
            color: link.color !== undefined ? link.color : '',
            owner: uid,
        };
        firestore.collection('links').doc(linkId).update(link_);
        history.push(`${hL}/links`);
    };

    const link_ = useSelector((state: RootState) => state.firestore.data.links[linkId as string]);

    const formProps: I_LinkForm = {
        link: {
            name: link_.name,
            link: link_.link,
            folder: link_.folder,
            target: link_.target,
            description: link_.description,
            color: link_.color,
            id: link_.id,
            owner: link_.owner,
        },
        displayName: displayName,
        onSaveLinkClicked: onSaveLinkClicked,
        withReset: true,
    };
    return <LinkForm {...formProps} />;
};
export default EditLink;
