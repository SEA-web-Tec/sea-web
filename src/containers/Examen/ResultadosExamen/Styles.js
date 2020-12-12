export const useStyles = (theme) => ({
    title: {
        width: "calc(100% - 500px)"
    },
    root: {  width: '100%' },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    ask: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
        marginTop: "7px"
    },
    conteiner: {
        minWidth: "240px",
        width: "calc(100% - 32px)"
    },
    headExpand: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    answer: { margin: theme.spacing(2) },
    text: {
        width: "calc(100% - 24px)",
        overflow: "hidden"
    },
    contentIcons: { 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },
    iconEdit: { color: "#3D978D" },
    iconIncorrect: { color: "#DF042F" },
    iconCorrect: { color: "#04B528" },
    navigation: { 
        widhtMin: "100px",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"
    }
});