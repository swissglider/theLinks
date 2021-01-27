/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IconButton, Icon, makeStyles, createStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';
import { I_LeftComponent } from '../../../utils/FrameworkContext';
import { I_Link, I_LinkFolder, LinkFolders } from '../components/Links/interfaces/interfaces';

export const getAllFilderLinks = (links: any): LinkFolders => {
    const linkFolders1: LinkFolders = {};
    for (const [id, link] of Object.entries(links)) {
        const link_ = { ...(link as I_Link), id: id };
        if (!(link_.folder in linkFolders1)) {
            linkFolders1[link_.folder] = { folder: link_.folder, links: [] };
        }
        linkFolders1[link_.folder].links.push(link_);
    }
    return linkFolders1;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStylesLists = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(0.5),
        },
    }),
);

export const GetLinksTitleAddonSimple = (): JSX.Element => {
    const classes = useStylesLists();
    const links_to = getMainComponentsConfigurationByLabel('Links').to;
    return (
        <div>
            <IconButton size="small" component={Link} to={`${links_to}/logout`} className={classes.margin}>
                <Icon>login</Icon>
            </IconButton>
        </div>
    );
};

export const GetLinksTitleAddonWithBack = (): JSX.Element => {
    const classes = useStylesLists();
    const links_to = getMainComponentsConfigurationByLabel('Links').to;
    return (
        <div>
            <IconButton size="small" className={classes.margin} component={Link} to={links_to}>
                <Icon>keyboard_arrow_left</Icon>
            </IconButton>
            <IconButton size="small" component={Link} to={`${links_to}/logout`} className={classes.margin}>
                <Icon>login</Icon>
            </IconButton>
        </div>
    );
};

export const getSingleLinkFolder = (links: any, folderName: string, linkFolders?: LinkFolders): I_LinkFolder => {
    if (linkFolders === undefined) linkFolders = getAllFilderLinks(links);
    return linkFolders[folderName];
};

export const getLeftElementForLinks = (links: any, linkFolders?: LinkFolders): I_LeftComponent => {
    if (linkFolders === undefined) linkFolders = getAllFilderLinks(links);
    const links_to = getMainComponentsConfigurationByLabel('Links').to;
    const catList = Object.values(linkFolders).map((linkFolder: I_LinkFolder) => {
        return { name: linkFolder.folder, to: `${links_to}/singleFolder/${linkFolder.folder}`, icon: 'folder' };
    });
    const leftElement = {
        menuList: [
            [
                { name: 'Logout', icon: 'login', to: `${links_to}/logout` },
                // { name: 'Links', icon: 'link', to: `${links_to}` },
                // { name: 'Add Link', icon: 'add', to: `${links_to}/addLink` },
            ],
            catList.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }),
        ],
    };
    return leftElement;
};
