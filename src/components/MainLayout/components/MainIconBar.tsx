import React, { useContext, useEffect, useRef, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ScrollHelper from '../../../utils/ScrollHelper';
import { Icon, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FrameworkContext, I_SubNavButton } from '../../../utils/FrameworkContext';

interface StyleProps {
    top: number;
    scrollPos: number;
    componentHeight: number;
    scrollPositionStart: number;
    scrollStepRange: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (props: StyleProps) => {
            const scrollPosition = props.scrollPos;
            const scrollPositionStart = props.scrollPositionStart;
            const scrollStepRange = props.scrollStepRange;

            const actionStartValueMarginTop = 0 - props.componentHeight;
            const actionStopValueMarginTop = 0;

            const actionStartValueOpacity = 0;
            const actionStopValueOpacity = 1;

            return {
                width: '100%',
                position: 'fixed',
                top: props.top,
                left: 0,
                zIndex: theme.zIndex.appBar - 1,
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                marginTop: ScrollHelper.getCurrentActionValueWithValueBoundaryAndScrollSetpRange(
                    scrollPosition,
                    scrollPositionStart,
                    actionStartValueMarginTop,
                    actionStopValueMarginTop,
                    scrollStepRange,
                ),
                '& > *': {
                    // margin: theme.spacing(1),
                },
                opacity: ScrollHelper.getCurrentActionValueWithValueBoundaryAndScrollSetpRange(
                    scrollPosition,
                    scrollPositionStart,
                    actionStartValueOpacity,
                    actionStopValueOpacity,
                    scrollStepRange,
                ),
            };
        },
        iconButton: {
            // marginTop: theme.spacing(-0.1),
            color: theme.palette.background.default,
            // width: theme.spacing(1),
            // maxWidth: theme.spacing(1),
            // minWidth: theme.spacing(1),
            flexGrow: 1,
        },
        buttonGroup: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // justifyContent: 'space-around',
        },
    }),
);

export interface ScrollingTitleBarProps {
    scrollPos: number;
    top: number;
    scrollPositionStart: number;
    scrollStepRange: number;
}

const MainIconBar = (props: ScrollingTitleBarProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [context, setContext] = useContext(FrameworkContext);
    const mainIconBarRef = useRef<HTMLDivElement>(null);
    const [mainIconBarHeight, setMainIconBarHeight] = useState<number>(0);

    const classes = useStyles({
        top: props.top,
        scrollPos: props.scrollPos,
        componentHeight: mainIconBarHeight,
        scrollPositionStart: props.scrollPositionStart,
        scrollStepRange: props.scrollStepRange,
    });

    useEffect(() => {
        if (mainIconBarRef.current !== null) setMainIconBarHeight(mainIconBarRef.current.clientHeight);
    }, [mainIconBarRef]);

    return (
        <div ref={mainIconBarRef} className={classes.root}>
            <div className={classes.buttonGroup}>
                {context.subNavButtons.map((button: I_SubNavButton, index: number) => (
                    <Tooltip key={index} title={button.title} className={classes.buttonGroup}>
                        <Icon className={classes.iconButton} to={button.to} component={Link}>
                            {button.icon}
                        </Icon>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default MainIconBar;
