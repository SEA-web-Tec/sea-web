import React, { Component } from "react";
import TabPanel from "./TabPanel";
import { AppBar, Tabs, Tab } from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class SimpleTabs extends Component {
  state = {
    value: 0,
    entrar: true,
    reactivos: []
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render () {
    let constDatos = null;
    let tabs = null;
      if(this.state.entrar && this.props.reactivos != 0) {
        this.setState({entrar:false,reactivos:this.props.reactivos});
      } else if(this.props.reactivos.length != 0) {
        tabs = this.state.reactivos.map((reac) => {
          return (<Tab key={(reac[0].unidad - 1)} label={"Unidad "+(reac[0].unidad)} {...a11yProps(reac[0].unidad - 1)} />);
        })
        constDatos = this.state.reactivos.map((reac,indice) => {
          return (
            <TabPanel key={(reac[0].unidad - 1)} value={this.state.value} index={(reac[0].unidad - 1)} reactivos={this.state.reactivos[indice]}>
              {this.props.children}
            </TabPanel>
          );
        })
      }
    return (
      <div >
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} variant="scrollable" scrollButtons="auto">
            { tabs }
          </Tabs>
        </AppBar>
        { constDatos }
      </div>
    );
  }
}

export default SimpleTabs;