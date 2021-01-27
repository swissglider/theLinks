import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { createStyles, Theme } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { FrameworkContext, I_SubNavButton } from '../../../utils/FrameworkContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonGroupContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            margin: theme.spacing(0, 3, 0),
            justifyContent: 'space-around',
        },
        button: {
            margin: theme.spacing(0, 0.5, 1),
            flexGrow: 1,
            justifyContent: 'space-between',
            borderRadius: theme.spacing(1.7),
            height: theme.spacing(5.5),
            minWidth: theme.spacing(15),
            maxWidth: theme.spacing(50),
        },
        divider: {
            marginTop: theme.spacing(1.5),
            paddingTop: theme.spacing(0.8),
        },
    }),
);

const SubNavigationButtons = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [context, setContext] = useContext(FrameworkContext);
    const classes = useStyles();

    return (
        <>
            <div className={classes.buttonGroupContainer}>
                {context.subNavButtons.map((button: I_SubNavButton, index: number) => (
                    <Button
                        key={index}
                        variant="contained"
                        color={button.color !== undefined ? button.color : 'primary'}
                        className={button.className !== undefined ? button.className : classes.button}
                        startIcon={<Icon>{button.icon}</Icon>}
                        component={Link}
                        to={button.to}
                    >
                        {button.title}
                    </Button>
                ))}
            </div>
            <Divider className={classes.divider} variant="fullWidth" />
        </>
    );
};

export default SubNavigationButtons;
