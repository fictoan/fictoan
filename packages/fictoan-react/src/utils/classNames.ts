export const createClassName = (classNames: (string | number | boolean | null | undefined)[]): string => {
    return classNames.filter((item) => !!item).join(" ");
};
