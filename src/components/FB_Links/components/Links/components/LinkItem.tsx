import React from 'react';
import {
    createStyles,
    Icon,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../../../configuration/MainComponents';

const useStylesLinkFolder = makeStyles((theme: Theme) =>
    createStyles({
        root: (props: any) => {
            return {
                background:
                    props.color !== undefined && props.color !== '' ? props.color : theme.palette.background.default,
                // margin: 0,
                // padding: 0,
                // background: theme.palette.background.default,
                borderRadius: theme.spacing(0.8),
            };
        },
        iconButton: {
            margin: 0,
            padding: theme.spacing(0.3),
        },
    }),
);

const LinkItem = (props: { link: any }): JSX.Element => {
    const classes = useStylesLinkFolder(props.link);
    const hL = getMainComponentsConfigurationByLabel('Links').to;
    return (
        <ListItem button component="a" href={props.link.link} className={classes.root}>
            <ListItemText
                primary={props.link.name}
                secondary={props.link.description !== undefined ? props.link.description : ''}
            />
            <ListItemSecondaryAction>
                <IconButton className={classes.iconButton} component={Link} to={`${hL}/editLink/${props.link.id}`}>
                    <Icon>edit</Icon>
                </IconButton>
                <IconButton className={classes.iconButton} component={Link} to={`${hL}/deleteLink/${props.link.id}`}>
                    <Icon>delete</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default LinkItem;
