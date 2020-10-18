import React from "react";
import useStyles from "./Tabs.styles";
import TabPanelEdit from "./TabPanel/TabPanelEdit";

import {
  AppBar,
  Tabs,
  Tab,
  /*IconButton,*/
} from "@material-ui/core";

/*
                  <IconButton className={classes.expanderFeedback}>
                    <FeedbackIcon />
                  </IconButton>
*/

//import ListItemEdit from "../../UI/ListItem/ListItemEdit";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //aqui los eventos de Tabs

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Unidad 1" {...a11yProps(0)} />
          <Tab label="Unidad 2" {...a11yProps(1)} />
          <Tab label="Unidad 3" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanelEdit value={value} index={0}>
        {props.children}
      </TabPanelEdit>
      <TabPanelEdit value={value} index={1}>
        {props.children}
      </TabPanelEdit>
    </div>
  );
}
