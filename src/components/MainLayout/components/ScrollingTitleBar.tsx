import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
import ScrollHelper from '../../../utils/ScrollHelper';
import SizeHelper from '../../../utils/SizeHelper';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar } from '@material-ui/core';
import { FrameworkContext } from '../../../utils/FrameworkContext';
import { TITLE_ICON_LINK } from '../../../configuration/Application';
import LinksLeftList from './LinksLeftList';

interface StyleProps {
    scrollPos: number;
    scrollPositionStart: number;
    scrollPositionStop: number;
    marginStartValue: number;
    marginStopValue: number;
    refHeight: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (props: StyleProps) => {
            return {
                background: theme.palette.background.default,
                marginTop: ScrollHelper.getCurrentActionValueWithScrollBoundary(
                    props.scrollPos,
                    props.scrollPositionStart,
                    props.scrollPositionStop,
                    props.marginStartValue,
                    props.marginStopValue,
                ),
                zIndex: theme.zIndex.appBar,
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                padding: theme.spacing(1),
                paddingLeft: 10,
                // maxHeight: theme.spacing(5),
                // minHeight: theme.spacing(5),
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'nowrap',
            };
        },
        rootBG: (props: StyleProps) => {
            return {
                background: theme.palette.background.default,
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: theme.zIndex.appBar - 2,
                height: props.refHeight,
                maxHeight: props.refHeight,
                minHeight: props.refHeight,
            };
        },
        title: (props: StyleProps) => {
            return {
                fontSize: ScrollHelper.getCurrentActionValueWithScrollBoundary(
                    props.scrollPos,
                    props.scrollPositionStart,
                    props.scrollPositionStop,
                    SizeHelper.getSizeInPx(theme.typography.h5.fontSize),
                    SizeHelper.getSizeInPx(theme.typography.h6.fontSize),
                ),
                fontWeight: ScrollHelper.getCurrentActionValueWithScrollBoundary(
                    props.scrollPos,
                    props.scrollPositionStart,
                    props.scrollPositionStop,
                    typeof theme.typography.h5.fontWeight === 'number' ? theme.typography.h5.fontWeight : 0,
                    typeof theme.typography.h6.fontWeight === 'number' ? theme.typography.h6.fontWeight : 0,
                ),
            };
        },
    }),
);

export interface ScrollingTitleBarProps {
    scrollPos: number;
    scrollPositionStart: number;
    scrollPositionStop: number;
    marginStartValue: number;
    paramRef: React.RefObject<HTMLDivElement>;
}

const ScrollingTitleBar = (props: ScrollingTitleBarProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [context, setContext] = useContext(FrameworkContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
    const classes = useStyles({
        scrollPos: props.scrollPos,
        scrollPositionStart: props.scrollPositionStart,
        scrollPositionStop: props.scrollPositionStop,
        marginStartValue: props.marginStartValue,
        marginStopValue: 0,
        refHeight: props.paramRef.current ? props.paramRef.current.clientHeight : 0,
    });

    return (
        <>
            <Toolbar ref={props.paramRef} className={classes.root}>
                {context.leftComponent !== undefined && context.leftComponent.icon !== undefined ? (
                    <Avatar onClick={() => setIsMenuOpen(true)} src={context.leftComponent.icon} />
                ) : (
                    <Avatar src={TITLE_ICON_LINK} />
                )}
                <span className={classes.title}>{context.title}</span>
                {context.rightComponent !== undefined ? context.rightComponent : <div />}
            </Toolbar>

            <div className={classes.rootBG} />
            {context.leftElement !== undefined && context.leftElement.menuList !== undefined && (
                <LinksLeftList
                    isOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    menuList={context.leftElement.menuList}
                    icon={
                        context.leftComponent !== undefined && context.leftComponent.icon !== undefined
                            ? context.leftComponent.icon
                            : TITLE_ICON_LINK
                    }
                    name={
                        context.leftComponent !== undefined && context.leftComponent.name !== undefined
                            ? context.leftComponent.name
                            : ''
                    }
                />
            )}
        </>
    );
};

export default ScrollingTitleBar;
