import { Tooltip, withStyles } from "@material-ui/core";

const BigTooltip = withStyles((theme) => ({
    tooltip: {
        maxWidth: "130px",
        fontSize: theme.typography.pxToRem(12),
        textAlign: "center",
    },
}))(Tooltip);

export default BigTooltip;
