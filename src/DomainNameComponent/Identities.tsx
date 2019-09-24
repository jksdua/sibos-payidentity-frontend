import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import { green } from "@material-ui/core/colors";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";
import DomainNamePanelDetails from "./DomainName";
import EmailPanelDetails from "./EmailPanelDetails";
import MobileNumberPanelDetails from "./MobileNumberPanelDetails";
import { Grid } from "@material-ui/core";

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

export default function Identities(this: any) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [domain, setDomain] = React.useState(false);
  const [phone, setPhone] = React.useState(false);

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
      }, 2000);
    }
  };

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container spacing={2} justify={"space-between"}>
            <Grid item>
              <Typography className={classes.heading}>Domain Name</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                Receive payments addressed directly to a domain name
              </Typography>
            </Grid>
            <Grid item>{domain && <CheckIcon />}</Grid>
          </Grid>
        </ExpansionPanelSummary>
        <DomainNamePanelDetails setCheckMark={setDomain} />
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Grid container spacing={2} justify={"space-between"}>
            <Grid item>
              <Typography className={classes.heading}>Email Address</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                Receive payments to your email address
              </Typography>
            </Grid>
            <Grid item>{email && <CheckIcon />}</Grid>
          </Grid>
        </ExpansionPanelSummary>
        <EmailPanelDetails setCheckMark={setEmail} />
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Grid container spacing={2} justify={"space-between"}>
            <Grid item>
              <Typography className={classes.heading}>Phone Number</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                Receive payments to a phone number
              </Typography>
            </Grid>
            <Grid item>{phone && <CheckIcon />}</Grid>
          </Grid>
        </ExpansionPanelSummary>
        <MobileNumberPanelDetails setCheckMark={setPhone} />
      </ExpansionPanel>
    </div>
  );
}
