import React from 'react';

export interface I_SubNavButton {
    title: string;
    icon: string;
    className?: string;
    color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
    to: string;
}

export interface I_ToolBarAction {
    title: string;
    component: JSX.Element;
}

export interface I_LeftMenuListItem {
    name: string;
    icon?: string;
    to: string;
    // divider?: boolean;
    // menuList?: I_LeftMenuListItem[];
}

export interface I_LeftComponent {
    name?: string;
    icon?: string;
    menuList?: I_LeftMenuListItem[][];
}

export interface I_Framework {
    title: string;
    subNavButtons: I_SubNavButton[];
    leftElement?: I_LeftComponent;
    rightComponent?: any; // shows a component
}

export interface I_FrameworkContextValue {
    frameworkContext?: I_Framework;
    setFrameworkContext?: any;
}

export const FrameworkContext = React.createContext<any[]>([{}, {}]);
