import FB_Links from '../components/FB_Links';

export interface I_MainComponentsConfiguration {
    label: string;
    value: string;
    icon: string;
    to: string;
    component: any;
    onMainBottomNavigation: boolean;
    linkActive: boolean;
    linkExact: boolean;
}
export const MainComponentsConfiguration: I_MainComponentsConfiguration[] = [
    {
        label: 'Home',
        value: '',
        icon: 'restore',
        to: '/',
        component: FB_Links,
        onMainBottomNavigation: false,
        linkActive: true,
        linkExact: true,
    },
    {
        label: 'Links',
        value: 'links',
        icon: 'link',
        to: '/Links',
        component: FB_Links,
        onMainBottomNavigation: true,
        linkActive: true,
        linkExact: false,
    },
    {
        label: 'Add Links',
        value: 'add_links',
        icon: 'add',
        to: '/Links/AddLink',
        component: FB_Links,
        onMainBottomNavigation: true,
        linkActive: true,
        linkExact: false,
    },
    {
        label: 'Search Links',
        value: 'search_links',
        icon: 'search',
        to: '/Links/SearchLinks',
        component: FB_Links,
        onMainBottomNavigation: true,
        linkActive: true,
        linkExact: false,
    },
];

/**
 * Returns the link with label. If not available it returns the one with 'Home' Link
 * @param label
 */
export const getMainComponentsConfigurationByLabel = (label: string): I_MainComponentsConfiguration => {
    const link = MainComponentsConfiguration.find((button) => button.label === label);
    return link !== undefined ? link : MainComponentsConfiguration[0];
};
