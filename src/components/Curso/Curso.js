import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { useStyles } from "./Styles";
import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    Divider,
    Avatar,
    Collapse,
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Menu,
    MenuItem,
} from "@material-ui/core";
import {
    Alarm as AlarmIcon,
    MoreVert as MoreVertIcon,
    FormatListBulletedOutlined as FormatListBulleted,
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import {
    CalificacionesOutlined as CalificacionesIcon,
    InstrumentacionOutlined as InstrumentacionIcon,
    TemarioOutlined as TemarioIcon,
} from "../../assets/icons/Index";
import { blue, red, green, amber } from "@material-ui/core/colors";
import BigTooltip from "../UI/BigTooltip/BigTooltip";

const Curso = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const horarioToggleHandler = () => {
        setExpanded(!expanded);
    };

    const optionsOpenHandler = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const optionsCloseHandler = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <div className={classes.cardHeader}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={props.portada}
                        title={props.materia}
                    />
                    <IconButton
                        className={classes.optionsButton}
                        onClick={optionsOpenHandler}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={optionsCloseHandler}
                    >
                        <MenuItem onClick={optionsCloseHandler}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={optionsCloseHandler}>
                            My account
                        </MenuItem>
                        <MenuItem onClick={optionsCloseHandler}>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
                <CardContent className={classes.cardContent}>
                    <Avatar
                        className={classes.avatar}
                        alt={props.maestro}
                        src={props.fotoPerfil}
                    />
                    <Typography
                        component="h2"
                        variant="h5"
                        gutterBottom
                        noWrap
                        style={{ fontWeight: "500" }}
                    >
                        {props.materia}
                    </Typography>
                    <Typography gutterBottom>{props.carrera}</Typography>
                    <Typography color="textSecondary">
                        {props.maestro}
                    </Typography>
                </CardContent>
                <Divider />
                <Box className={classes.box}>
                    <IconButton
                        disabled
                        style={{ color: "rgba(0, 0, 0, 0.87)" }}
                    >
                        <AlarmIcon />
                    </IconButton>
                    <Typography>Horario</Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={horarioToggleHandler}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.horario}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Día</TableCell>
                                    <TableCell align="center">Hora</TableCell>
                                    <TableCell align="center">Salón</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.horario.map((horario, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {horario.dia}
                                        </TableCell>
                                        <TableCell align="center">
                                            {horario.hora}
                                        </TableCell>
                                        <TableCell align="center">
                                            {horario.salon}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Collapse>
                <Divider />
                <CardActions className={classes.cardActions} disableSpacing>
                    <BigTooltip title="Calificaciones">
                        <IconButton style={{ color: blue[600] }}>
                            <CalificacionesIcon />
                        </IconButton>
                    </BigTooltip>
                    <BigTooltip title="Lista">
                        <IconButton style={{ color: red[600] }}>
                            <FormatListBulleted />
                        </IconButton>
                    </BigTooltip>
                    <BigTooltip title="Temario">
                        <IconButton style={{ color: green[600] }}>
                            <TemarioIcon />
                        </IconButton>
                    </BigTooltip>
                    <BigTooltip title="Instrumentación Didáctica">
                        <IconButton
                            style={{ color: amber[600] }}
                            component={RouterLink}
                            to="/instrumentacion"
                        >
                            <InstrumentacionIcon />
                        </IconButton>
                    </BigTooltip>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Curso;
