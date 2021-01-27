import { makeStyles, Theme, createStyles, IconButton, InputBase, Paper, Icon } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            margin: theme.spacing(1),
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

const SearchForm = (props: { setSearchString: any }): JSX.Element => {
    const classes = useStyles();
    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="search">
                <Icon>search</Icon>
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Search Link Names"
                inputProps={{ 'aria-label': 'search link names' }}
                onChange={(e) => props.setSearchString(e.target.value)}
            />
        </Paper>
    );
};

export default SearchForm;
