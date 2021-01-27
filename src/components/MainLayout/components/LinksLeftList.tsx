import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { I_LeftMenuListItem } from '../../../utils/FrameworkContext';
import { Avatar, Icon, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '80vw',
        },
        fullList: {
            width: 'auto',
        },
        root: {
            padding: theme.spacing(1.5),
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
    }),
);

const Anchor = 'left';

const ListElement = (props: { item: I_LeftMenuListItem }): JSX.Element => (
    <ListItem button component={Link} to={props.item.to}>
        {props.item.icon !== undefined && (
            <ListItemIcon>
                <Icon>{props.item.icon}</Icon>
            </ListItemIcon>
        )}
        <ListItemText primary={props.item.name} />
    </ListItem>
);

const LinksLeftList = (props: {
    isOpen: boolean;
    setIsMenuOpen: any;
    menuList: I_LeftMenuListItem[][];
    icon: string;
    name: string;
}): JSX.Element => {
    const classes = useStyles();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        props.setIsMenuOpen(open);
    };

    const list = () => (
        <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <Toolbar className={classes.root}>
                <Avatar src={props.icon} />
                <Typography variant="h4">The Links</Typography>
            </Toolbar>
            {props.menuList.map((menuCategory: I_LeftMenuListItem[], index: number) => (
                <div key={`LinksLeftList1_${index}`}>
                    <Divider />
                    {menuCategory.map((menuItem: I_LeftMenuListItem, index1: number) => (
                        <ListElement key={`LinksLeftList2_${index1}`} item={menuItem} />
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <SwipeableDrawer anchor={Anchor} open={props.isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            {list()}
        </SwipeableDrawer>
    );
};

export default LinksLeftList;
