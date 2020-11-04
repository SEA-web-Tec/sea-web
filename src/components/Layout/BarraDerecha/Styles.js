import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
    return {
        backdrop: {
            zIndex: theme.zIndex.drawer - 1,
            color: theme.palette.background.default,
        },
    };
});
