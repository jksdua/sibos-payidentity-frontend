import React from "react";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  Theme,
  makeStyles,
  createStyles
} from "@material-ui/core";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    fabProgress: {
      color: green[500]
    },
    buttonProgress: {
      color: green[500]
    }
  })
);
export default function DomainNamePanelDetails(props: any) {
  const classes = useStyles({});

  const [values, setValues] = React.useState({
    domainName: ""
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });
  let timer: any = React.useRef<number>();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        props.setCheckMark(true);
      }, 1000);
    }
  };
  const handleInputChange = (name: string) => (event: {
    target: { value: any };
  }) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <ExpansionPanelDetails>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item>
          <TextField
            id="domain-name-field"
            label="Domain Name"
            value={values.domainName}
            disabled={success}
            margin="normal"
            variant="outlined"
            onChange={handleInputChange("domainName")}
          />
        </Grid>
        <Grid item>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={handleButtonClick}
            >
              Verify Ownership
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </Grid>
    </ExpansionPanelDetails>
  );
}
