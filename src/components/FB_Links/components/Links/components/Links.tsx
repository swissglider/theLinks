import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { RootState } from '../../../../../redux/Store';
import { LinkFolders } from '../interfaces/interfaces';
import LinkFolder from './LinkFolder';
import { FrameworkContext } from '../../../../../utils/FrameworkContext';
import isAuthenticated from '../../../utils/isAuthenticated';
import { getAllFilderLinks, getLeftElementForLinks, GetLinksTitleAddonSimple } from '../../../utils/linkFolderHelper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStylesLists = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
        },
        margin: {
            margin: theme.spacing(0.5),
        },
    }),
);

const Links = (): JSX.Element => {
    const classes = useStylesLists();
    const [context, setContext] = useContext(FrameworkContext);
    const [linkFolders, setLinkFolders] = useState<LinkFolders>();

    isAuthenticated(true);

    useFirestoreConnect({
        collection: `links`,
        storeAs: 'links',
    });

    const links = useSelector((state: RootState) => state.firestore.data.links);

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Swissglider Links';
        context_.subNavButtons = [];
        context_.rightComponent = <GetLinksTitleAddonSimple />;

        if (links === undefined) return;
        const linkFolders1 = getAllFilderLinks(links);
        setLinkFolders(linkFolders1);

        context_.leftElement = getLeftElementForLinks(links, linkFolders1);
        setContext(context_);
    }, [links]);

    return (
        <>
            {linkFolders !== undefined && (
                <div className={classes.root}>
                    {/* {Object.values(linkFolders).map((linkFolder: I_LinkFolder, index) => (
                        <LinkFolder key={`fb_links_${index}`} linkFolder={linkFolder} />
                    ))} */}
                    {Object.entries(linkFolders)
                        .sort(([key1], [key2]) => {
                            if (key1 < key2) {
                                return -1;
                            }
                            if (key1 > key2) {
                                return 1;
                            }
                            return 0;
                        })
                        .map(([, linkFolder], index) => (
                            <LinkFolder key={`fb_links_${index}`} linkFolder={linkFolder} />
                        ))}
                </div>
            )}
        </>
    );
};

export default Links;
