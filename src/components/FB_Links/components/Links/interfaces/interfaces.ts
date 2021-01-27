export interface I_Link {
    name: string;
    link: string;
    folder: string;
    target: string;
    description?: string;
    color?: string;
    id: string;
    owner: string;
}

export interface I_LinkFolder {
    folder: string;
    links: I_Link[];
}

export type LinkFolders = Record<string, I_LinkFolder>;
