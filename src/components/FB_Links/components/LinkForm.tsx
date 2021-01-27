import { Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { CompactPicker } from 'react-color';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { I_Link } from './Links/interfaces/interfaces';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(35),
            },
        },
    }),
);

export interface I_LinkForm {
    link: I_Link;
    displayName: string;
    onSaveLinkClicked: (link: I_Link) => void;
    withReset: boolean;
}

const LinkForm = (props: I_LinkForm): JSX.Element => {
    const classes = useStyles();
    const [stateName, setStateName] = useState<string>(props.link.name);
    const [stateLink, setStateLink] = useState<string>(props.link.link);
    const [stateFolderName, setStateFolderName] = useState<string>(props.link.folder);
    const [stateTarget, setStateTarget] = useState<string>(props.link.target);
    const [stateDesc, setStateDesc] = useState<string>(props.link.description ? props.link.description : '');
    const [stateColor, setStateColor] = useState<string>(props.link.color ? props.link.color : '');
    const [stateWithColor, setStateWithColor] = useState<boolean>(props.link.color ? true : false);

    const targets = ['_blank', '_self', '_parent', '_top'];
    const links = useSelector((state: RootState) => state.firestore.data.links);
    if (links === undefined) return <></>;
    const linkFolders: string[] = [...new Set(Object.values(links).map((link: any) => link.folder))];

    const resetValues = (): void => {
        setStateName(props.link.name);
        setStateLink(props.link.link);
        setStateFolderName(props.link.folder);
        setStateTarget(props.link.target);
        setStateDesc(props.link.description ? props.link.description : '');
        setStateColor(props.link.color ? props.link.color : '');
        setStateWithColor(props.link.color ? true : false);
    };

    const onSaveLinkClicked = () => {
        const link = { ...props.link };
        link.name = stateName;
        link.link = stateLink;
        link.folder = stateFolderName;
        link.target = stateTarget;
        if (stateDesc !== undefined && stateDesc !== '') link.description = stateDesc;
        if (stateColor !== undefined && stateColor !== '') link.color = stateColor;
        if (!stateWithColor) link.color = '';
        props.onSaveLinkClicked(link);
        resetValues();
    };

    const canSave = Boolean(stateName) && Boolean(stateLink) && Boolean(stateFolderName) && Boolean(stateTarget);

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField
                id="name"
                label="Name"
                required
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
            />
            <TextField
                id="link"
                label="Link"
                required
                value={stateLink}
                onChange={(e) => setStateLink(e.target.value)}
            />
            <Autocomplete
                id="folderName"
                options={linkFolders}
                value={stateFolderName}
                getOptionLabel={(folder) => folder}
                freeSolo
                onInputChange={(e, v) => setStateFolderName(v)}
                renderInput={(params) => <TextField {...params} label="FolderName" required value={stateFolderName} />}
            />
            <Autocomplete
                id="target"
                options={targets}
                value={stateTarget}
                getOptionLabel={(target) => target}
                freeSolo
                onInputChange={(e, v) => setStateTarget(v)}
                renderInput={(params) => <TextField {...params} label="Target" required value={stateTarget} />}
            />
            <TextField
                id="description"
                label="Description"
                value={stateDesc}
                onChange={(e) => setStateDesc(e.target.value)}
            />
            <TextField id="owner" label={props.displayName} disabled />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={stateWithColor}
                        onChange={(e) => setStateWithColor(e.target.checked)}
                        name="withColor"
                    />
                }
                label="with Color"
            />
            <CompactPicker color={stateColor} onChangeComplete={(c) => setStateColor(c.hex)} />
            <Button variant="outlined" onClick={() => onSaveLinkClicked()} disabled={!canSave}>
                Save
            </Button>
            {props.withReset && (
                <Button variant="outlined" onClick={() => resetValues()}>
                    Reset
                </Button>
            )}
        </form>
    );
};

export default LinkForm;
