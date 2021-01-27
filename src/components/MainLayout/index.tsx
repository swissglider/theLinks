import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainComponentsConfiguration } from '../../configuration/MainComponents';
import { FrameworkContext, I_Framework } from '../../utils/FrameworkContext';
import MainBottomNavigation from './components/MainBottomNavigation';
import MainContent from './components/MainContent';
import MainIconBar from './components/MainIconBar';
import ScrollingTitleBar from './components/ScrollingTitleBar';

interface StyleProps {
    bottomNavHeight: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStylesApp = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: 50,
            paddingRight: 50,
        },
        child: (props: StyleProps) => {
            const height_ = `calc(100vh - ${props.bottomNavHeight}px)`;
            return {
                overflowY: 'auto',
                overflowX: 'hidden',
                'min-height': height_,
                'max-height': height_,
            };
        },
    }),
);

export interface MainLayoutProps {
    test?: string;
}
const InitAction = (): JSX.Element => <></>;

const initialState: I_Framework = {
    title: 'The HOME',
    subNavButtons: [{ title: 'Home', to: '/', icon: 'home' }],
    rightComponent: <InitAction />,
};

const MainLayout = (): JSX.Element => {
    const childRef = useRef<HTMLDivElement>(null);
    const bottonNavRef = useRef<HTMLDivElement>(null);
    const scrollingTitleRef = useRef<HTMLDivElement>(null);
    const [scrollPos, setScrollPos] = useState<number>(0);
    const [bottomNavHeight, setBottomNavHeight] = useState<number>(0);
    const [scrollingTitleHeight, setScrollingTitleHeight] = useState<number>(0);
    const [frameworkContext, setFrameworkContext] = useState<I_Framework>(initialState);

    const classes = useStylesApp({ bottomNavHeight: bottomNavHeight });

    useEffect(() => {
        // console.log(bottonNavRef);
        if (bottonNavRef.current !== null) setBottomNavHeight(bottonNavRef.current.clientHeight);
    }, [scrollPos]);

    useEffect(() => {
        if (scrollingTitleRef.current !== null) setScrollingTitleHeight(scrollingTitleRef.current.clientHeight);
    }, [scrollPos]);

    const onScroll = () => {
        if (
            childRef !== null &&
            childRef !== undefined &&
            childRef.current !== null &&
            childRef.current !== undefined
        ) {
            // const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
            const scrollPos = childRef.current.scrollTop;
            // console.log(`onScroll, window.scrollY: ${scrollY} childRef.scrollTop: ${scrollPos}`);
            setScrollPos(scrollPos);
        }
    };
    return (
        <BrowserRouter>
            <div className="App">
                <FrameworkContext.Provider value={[frameworkContext, setFrameworkContext]}>
                    <MainIconBar
                        top={scrollingTitleHeight}
                        scrollPos={scrollPos}
                        scrollPositionStart={25}
                        scrollStepRange={30}
                    />
                    <ScrollingTitleBar
                        paramRef={scrollingTitleRef}
                        scrollPos={scrollPos}
                        scrollPositionStart={0}
                        scrollPositionStop={30}
                        marginStartValue={20}
                    />
                    <div className={classes.child} ref={childRef} onScroll={onScroll} id="ScrollContainer">
                        <MainContent scrollPos={scrollPos} marginStartValue={scrollingTitleHeight} />
                    </div>
                    {MainComponentsConfiguration.find((c) => c.onMainBottomNavigation) !== undefined && (
                        <MainBottomNavigation paramRef={bottonNavRef} />
                    )}
                </FrameworkContext.Provider>
            </div>
        </BrowserRouter>
    );
};

export default MainLayout;
