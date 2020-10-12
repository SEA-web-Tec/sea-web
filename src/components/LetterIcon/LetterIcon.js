import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const LetterIcon = (props) => {
  const useStyles = makeStyles((theme) => ({
    img: {
      width: "35px",
      height: "35px",
      marginLeft: "-6px",
      "& circle": {
        fill: props.fill
      },
      "& text": {
        fontWeight: "400"
      }
    }
  }));

  const classes = useStyles();

  let letter;
  if (props.letter !== undefined) letter = props.letter;
  else {
    letter = props.fullName.charAt(0).toUpperCase();
  }
  const iconPath = "./svg/" + letter;

  const [component, setComponent] = useState(undefined);

  const addComponent = async (path) => {
    import(`${path}`)
      .then((component) => {
        setComponent(component.default);
      })
      .catch((error) => {
        console.error(`"${path}" not yet supported`);
      });
  };

  useEffect(() => {
    const loadData = async () => {
      await addComponent(iconPath);
    };

    loadData();
  }, []);

  if (component === undefined) return <div>{letter}</div>;

  const Icon = component;
  return <Icon className={classes.img} key={letter} />;
};

export default LetterIcon;
