import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckIcon from "@material-ui/icons/Check";
import { Grid } from "@material-ui/core";
import IbanPanelDetails from "./IbanPanelDetails";
import PayPalPanelDetails from "./PayPalPanelDetails";
import EthereumPanelDetails from "./EthereumPanelDetails";
import BitcoinPanelDetails from "./BitcoinPanelDetails";

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
    }
  })
);

export default function PaymentMethodPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [iban, setIban] = React.useState(false);
  const [payPal, setPayPal] = React.useState(false);
  const [ethereum, setEthereum] = React.useState(false);
  const [bitcoin, setBitcoin] = React.useState(false);

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
              <Typography className={classes.heading}>IBAN</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                Receive payments to your IBAN via Swift
              </Typography>
            </Grid>
            <Grid item>{iban && <CheckIcon />}</Grid>
          </Grid>
        </ExpansionPanelSummary>
        <IbanPanelDetails setCheckMark={setIban} />
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
              <Typography className={classes.heading}>PayPal</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                Receive PayPal transfers
              </Typography>
            </Grid>
            <Grid item>{payPal && <CheckIcon />}</Grid>
          </Grid>
        </ExpansionPanelSummary>
        <PayPalPanelDetails setCheckMark={setPayPal} />
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
              <Typography className={classes.heading}>Ethereum</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                Receive payments to your Ethereum Wallet
              </Typography>
            </Grid>
            <Grid item>{ethereum && <CheckIcon />}</Grid>
          </Grid>
        </ExpansionPanelSummary>
        <EthereumPanelDetails setCheckMark={setEthereum} />
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
              <Typography className={classes.heading}>Bitcoin</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                Receive payments to your Bitcoin Wallet
              </Typography>
            </Grid>
            <Grid item>{bitcoin && <CheckIcon />}</Grid>
          </Grid>
        </ExpansionPanelSummary>
        <BitcoinPanelDetails setCheckMark={setBitcoin} />
      </ExpansionPanel>
    </div>
  );
}
