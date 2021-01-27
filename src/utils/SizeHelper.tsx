const rem2px = (value: string): number => {
    return Math.round(parseFloat(value) * 16);
};

const getSizeInPx = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.endsWith('rem')) return rem2px(value);
    return 0;
};

export default {
    rem2px: rem2px,
    getSizeInPx: getSizeInPx,
};
