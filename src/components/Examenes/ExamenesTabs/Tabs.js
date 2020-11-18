import React from "react";
import useStyles from "./styles";
import TabPanel from "./TabPanel";
import { AppBar, Tabs, Tab } from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SimpleTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log('value:'+newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {props.data.map((i) => {
            return (<Tab label={"Unidad "+i.unidad} {...a11yProps(i.unidad-1)} />);
          })}
        </Tabs>
      </AppBar>
      {props.data.map((i) => {
        return (
          <TabPanel value={value} index={(i.unidad-1)} data={props.data}>
            {props.children}
          </TabPanel>
        );
      })}
    </div>
  );
}

export default SimpleTabs;