import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Button, Typography, Box, Container } from "@material-ui/core";

class NotFound extends Component {
    returnClickHandler = (event) => {
        this.props.history.push("/");
    };

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="sm">
                <Box className={classes.container}>
                    <Typography
                        component="h2"
                        variant="h5"
                        style={{ fontWeight: "bold", marginBottom: "30px" }}
                    >
                        404 - NO SE ENCONTRÓ ESTA PÁGINA
                    </Typography>
                    <Typography component="p" variant="body1">
                        No se encontró esta página, pero quizá esté disponible
                        más adelante.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ marginTop: "16px" }}
                        onClick={this.returnClickHandler}
                    >
                        Regresar al inicio
                    </Button>
                </Box>
            </Container>
        );
    }
}

export default withStyles(useStyles)(NotFound);
