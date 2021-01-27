import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Divider, List, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { RootState } from '../../../redux/Store';
import isAuthenticated from '../utils/isAuthenticated';
import LinkItem from './Links/components/LinkItem';
import SearchForm from './SearchForm';
import { I_Link } from './Links/interfaces/interfaces';
import { getLeftElementForLinks, GetLinksTitleAddonWithBack } from '../utils/linkFolderHelper';
import { FrameworkContext } from '../../../utils/FrameworkContext';

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
        list: {
            background: theme.palette.background.default,
            margin: theme.spacing(1.5),
            padding: 0,
            // width: '96%',
            // mixWidth: theme.spacing(35),
            // maxWidth: theme.spacing(48),
            borderRadius: theme.spacing(0.8),
            minWidth: theme.spacing(43),
            // maxWidth: theme.spacing(50),

            [theme.breakpoints.down('sm')]: {
                width: '96%',
                minWidth: '96%',
                maxWidth: '96%',
            },
        },
        margin: {
            margin: theme.spacing(0.5),
        },
    }),
);

const SearchLinks = (): JSX.Element => {
    const classes = useStylesLists();
    const [searchString, setSearchString] = useState<string>('');
    const [foundLinks, setFoundLinks] = useState<any[]>();
    const [context, setContext] = useContext(FrameworkContext);
    isAuthenticated(true);

    useFirestoreConnect({
        collection: `links`,
        storeAs: 'links',
    });

    const links = useSelector((state: RootState) => state.firestore.data.links);

    useEffect(() => {
        if (links !== undefined && links) {
            const foundLinks_ = Object.entries(links)
                .map(([id, link]) => ({
                    ...(link as I_Link),
                    id: id,
                }))
                .filter((link: any) => link.name.toLowerCase().includes(searchString.toLowerCase()));
            setFoundLinks(foundLinks_);
        }
    }, [searchString]);

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Search Links';
        context_.subNavButtons = [];
        context_.rightComponent = <GetLinksTitleAddonWithBack />;

        if (links === undefined) return;

        context_.leftElement = getLeftElementForLinks(links);
        setContext(context_);
    }, [links]);

    return (
        <div className={classes.root}>
            <SearchForm setSearchString={setSearchString} />
            <List className={classes.list}>
                {foundLinks &&
                    foundLinks !== undefined &&
                    foundLinks.map((link: any, index) => (
                        <div key={`searchLink_${index}`}>
                            <LinkItem link={link} />
                            <Divider />
                        </div>
                    ))}
            </List>
        </div>
    );
};

export default SearchLinks;
