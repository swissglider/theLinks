import { useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';
import isAuthenticated from '../utils/isAuthenticated';

const DeleteLink = (): null => {
    const { linkId } = useParams<Record<string, string | undefined>>();
    const history = useHistory();
    const firestore = useFirestore();
    const hL = getMainComponentsConfigurationByLabel('Links').to;

    if (!(isAuthenticated() && linkId !== undefined)) {
        history.push(hL);
    }

    useEffect(() => {
        firestore.collection('links').doc(linkId).delete();
        history.push(`${hL}/links`);
    });
    return null;
};

export default DeleteLink;
