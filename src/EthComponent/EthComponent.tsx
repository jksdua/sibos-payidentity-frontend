import React from "react";
import Bill from "../OireachtasService/interfaces/iBill";
import { Paper, Grid, Typography } from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";

interface Props {
  key: number;
  triggerVoteCast: Function;
}
interface State {
  bill: Bill;
}
/**
 * Component to render a passed Bill interface conforming JSON object to a React Component with buttons for voting for and against bills.
 */
class EthComponent extends React.Component<Props, State> {
  startCastVoteFor(e: any) {}

  startCastVoteAgainst(e: any) {}

  render() {
    let billPdfUrl = "/";

    return (
      <Grid item xs={12}>
        <Paper className={"billPaper"}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h6" gutterBottom>
                Accept Ethereum
              </Typography>
              <Typography variant="body1" gutterBottom>
                Set an Ethereum Address or ENS name to recieve payments on
                Ethereum.
              </Typography>
              <Grid
                container
                justify="space-between"
                alignItems="flex-end"
                alignContent="center"
                className={"billInfoGrid"}
              >
                <Grid item>
                  <Typography variant="body1">[ETHERUM ADDRESS]</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">[VERIFY BUTTON]</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">[PROGRESS BAR]</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default EthComponent;
