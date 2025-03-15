export const modalProps = {
    component  : "Modal",
    properties : [
        "isDismissible",
        "showBackdrop",
        "blurBackdrop",
    ],
    variables  : {
        "modal-backdrop-blur"    : {
            type         : "value-unit",
            defaultValue : 4,
            unit         : "px",
        },
    },
};
