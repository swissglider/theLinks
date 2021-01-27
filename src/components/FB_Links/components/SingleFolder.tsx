import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../redux/Store';
import { FrameworkContext } from '../../../utils/FrameworkContext';
import {
    getAllFilderLinks,
    getLeftElementForLinks,
    GetLinksTitleAddonSimple,
    getSingleLinkFolder,
} from '../utils/linkFolderHelper';
import { I_LinkFolder } from './Links/interfaces/interfaces';
import LinkFolder from './Links/components/LinkFolder';

const SingleFolder = (): JSX.Element => {
    const { folderID } = useParams<Record<string, string | undefined>>();
    const [context, setContext] = useContext(FrameworkContext);
    const [linkFolder, setLinkFolder] = useState<I_LinkFolder>();
    const links = useSelector((state: RootState) => state.firestore.data.links);

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Folder : ' + folderID;
        context_.subNavButtons = [];
        context_.rightComponent = <GetLinksTitleAddonSimple />;

        if (links === undefined || folderID === undefined) return;
        const linkFolders1 = getAllFilderLinks(links);
        const singleFolder = getSingleLinkFolder(links, folderID, linkFolders1);
        setLinkFolder(singleFolder);

        context_.leftElement = getLeftElementForLinks(links, linkFolders1);
        setContext(context_);
    }, [links, folderID]);

    return <>{linkFolder !== undefined && <LinkFolder linkFolder={linkFolder} />}</>;
};

export default SingleFolder;
