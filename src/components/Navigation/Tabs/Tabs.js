import React, { useState } from "react";
import useStyles from "./Tabs.styles";
import TabPanel from "./TabPanel/TabPanel";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

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
      <TabPanel value={value} index={0}>
        {props.children}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.children}
      </TabPanel>
    </div>
  );
}
