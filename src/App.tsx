import React from "react";
import Typography from "@material-ui/core/Typography";
import withRoot from "./withRoot";
import { Grid, Paper, Button } from "@material-ui/core";
import Oireachtas from "./OireachtasService/oireachtas";
import Bill from "./OireachtasService/interfaces/iBill";
import logger from "./logger/winston";
import CastVoteModalComponent from "./CastVoteModalComponent/CastVoteModalComponent";
import BlockchainService from "./BlockchainService/blockchainService";
import ControlledExpansionPanels from "./DomainNameComponent/Identities";
import PaymentMethodPanels from "./DomainNameComponent/PaymentMethodPanels";
import Identities from "./DomainNameComponent/Identities";

/**
 * Main page. Outlines what this website is for and contains the sub modules for voting and onboarding.
 */
interface Props {}
interface State {
  castVoteModalOpen: boolean;
  bills: Bill[];
  billToVoteOn: Bill | undefined;
  inFavour: boolean;
}
class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      castVoteModalOpen: false,
      bills: [],
      billToVoteOn: undefined,
      inFavour: false
    };
  }

  /**
   * Saves the identities entered.
   */
  async save() {
    return new Promise(function(resolve, reject) {
      const oireachtasService = new Oireachtas();

      // Calculate the date 7 days ago, then the date 14 days ahead of now for getting bills.
      const date = new Date();
      const resultLimit = "50";
      const billState = "Current";
      const date7DaysAgo = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
      const date7DaysAgoString = date7DaysAgo.toISOString().substring(0, 10);
      const date14DaysFromNow = new Date(
        date.getTime() + 14 * 24 * 60 * 60 * 1000
      );
      const date14DaysFromNowString = date14DaysFromNow
        .toISOString()
        .substring(0, 10);
      const billsApiRequestUrl: string = oireachtasService.prepareDailBillsRequestUrl(
        billState,
        date7DaysAgoString,
        date14DaysFromNowString,
        resultLimit,
        "",
        "ga"
      );

      // Get Dail Bills
      const newBills = oireachtasService
        .getDailBills(billsApiRequestUrl)
        .then(response => {
          // If there are bills returned in this response, map them to Bill Objects then return the list of them.
          if (response.results) {
            logger.info(
              `${response.results.length} results returned from api.oireachtas.ie`
            );
            return response.results.map(function(result) {
              return result.bill;
            });
          } else {
            logger.warn(`api.oireachtas.ie returned no results for voting on.`);
            return;
          }
        })
        .catch(error => {
          logger.error(
            "Error thrown while trying to retrieve bills from the oireachtas api. "
          );
          reject(error);
        });
      resolve(newBills);
    });
  }

  /**
   * This function is passed down to a Bill Component. When called it is passed the Bill interface and a boolean, true meaning voting in favour
   * @param bill
   * @param vote
   */
  triggerCastVoteModal(bill: Bill, vote: boolean) {
    this.setState({
      ...this.state,
      castVoteModalOpen: true,
      billToVoteOn: bill,
      inFavour: vote
    });
  }

  handleClose = (event: any, reason: any) => {
    this.setState({
      ...this.state,
      castVoteModalOpen: false
    });
  };

  isWeb3User = (): boolean => {
    return BlockchainService.isWeb3Injected();
  };

  handleClick = () => {
    this.setState({ ...this.state, castVoteModalOpen: true });
  };

  render() {
    return (
      <div className={"centerColumn"}>
        <CastVoteModalComponent
          open={this.state.castVoteModalOpen}
          handleClose={this.handleClose}
          bill={this.state.billToVoteOn}
          inFavour={this.state.inFavour}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={"paper"}>
              <Typography variant="h3" gutterBottom>
                PayIdentity
              </Typography>
              <Typography variant="body1" gutterBottom>
                To make online payments more seamless, we have developed a
                mechanism to reference payment methods by domain name. This
                enables a merchant to list all payment methods they accept in
                our system and PayIdentity makes it easier for people to pay
                their merchant with the medium that best suits them. Similarly,
                PayIdentity can seamlessly convert value from one medium to
                another to reduce the friction between buyer and seller.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={"paper"}>
              <Typography variant="h4" gutterBottom>
                Identities
              </Typography>
              <Identities />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={"paper"}>
              <Typography variant="h4" gutterBottom>
                Payment Methods
              </Typography>
              <PaymentMethodPanels />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button
              size={"large"}
              onClick={() => this.save()}
              variant={"contained"}
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={12}>
            {/* Identifying myself and donation address */}
            <Paper className={"paper"}>
              <Typography variant="caption">Built by SibosYellow.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(App);
