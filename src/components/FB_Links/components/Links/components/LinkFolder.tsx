import React from 'react';
import { Card, CardContent, CardHeader, createStyles, Divider, List, makeStyles, Theme } from '@material-ui/core';
import { I_LinkFolder } from '../interfaces/interfaces';
import LinkItem from './LinkItem';

const useStylesLinkFolder = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.default,
            margin: theme.spacing(1.5),
            padding: 0,
            minWidth: theme.spacing(43),
            // maxWidth: theme.spacing(50),
            borderRadius: theme.spacing(0.8),

            [theme.breakpoints.down('xs')]: {
                width: '96%',
                minWidth: '96%',
                maxWidth: '96%',
            },
        },
        title: {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText,
            margin: 0,
            padding: theme.spacing(1),
        },
        content: {
            margin: 0,
            padding: theme.spacing(0, 1, 0, 1),
            background: theme.palette.secondary.dark,
        },
        list: {
            margin: 0,
            padding: 0,
            background: theme.palette.background.default,
            borderRadius: theme.spacing(0.8),
        },
    }),
);

const LinkFolder = (props: { linkFolder: I_LinkFolder }): JSX.Element => {
    const classes = useStylesLinkFolder();
    return (
        <Card className={classes.root} elevation={4}>
            <CardHeader title={props.linkFolder.folder} className={classes.title} />
            <CardContent className={classes.content}>
                <List className={classes.list}>
                    {Object.values(props.linkFolder.links).map((link: any, index) => (
                        <div key={`fb_linkfolder_${index}`}>
                            <LinkItem link={link} />
                            <Divider />
                        </div>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default LinkFolder;
