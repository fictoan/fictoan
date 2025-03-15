export const skeletonProps = {
    components : {
        Skeleton      : {
            properties : [
                "variant",
                "width",
                "height",
                "shape",
            ],
        },
        SkeletonGroup : {
            properties : [
                "direction",
                "repeat",
                "gap",
                "effect",
            ],
        },
    },
    variables  : {
        "skeleton-bg"        : {
            type         : "reference",
            defaultValue : "slate-light40",
        },
        "skeleton-highlight" : {
            type         : "reference",
            defaultValue : "slate-dark10-opacity40",
        },
    },
};
