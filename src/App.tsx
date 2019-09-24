import React from "react";
import uuidv4 from "uuid";
import Typography from "@material-ui/core/Typography";
import withRoot from "./withRoot";
import { Grid, Paper, Button } from "@material-ui/core";
import Oireachtas from "./OireachtasService/oireachtas";
import Bill from "./OireachtasService/interfaces/iBill";
import CastVoteModalComponent from "./CastVoteModalComponent/CastVoteModalComponent";
import BlockchainService from "./BlockchainService/blockchainService";
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
      // Get identity Inputs
      const domainNameInput = document.getElementById("domain-name-field")!;
      const emailInput = document.getElementById("email-field")!;
      const phoneInput = document.getElementById("mobile-number-field")!;

      // Get Payment Inputs
      const ibanInput = document.getElementById("iban-field")!;
      const payPalInput = document.getElementById("paypal-field")!;
      const ethereumInput = document.getElementById("ethereum-field")!;
      const bitcoinInput = document.getElementById("bitcoin-field")!;

      // Get values
      const domain: string = (domainNameInput as HTMLInputElement).value;
      const email: string = (emailInput as HTMLInputElement).value;
      const phone: string = (phoneInput as HTMLInputElement).value;
      const iban: string = (ibanInput as HTMLInputElement).value;
      const payPal: string = (payPalInput as HTMLInputElement).value;
      const ethereum: string = (ethereumInput as HTMLInputElement).value;
      const bitcoin: string = (bitcoinInput as HTMLInputElement).value;

      const uuid = uuidv4();
      var options = {
        method: "POST",
        uri:
          "https://9p6vivastb.execute-api.us-east-2.amazonaws.com/prod/party/register",
        body: {
          user: uuid,
          payments: {
            iban,
            payPal,
            ethereum,
            bitcoin
          },
          identities: {
            domain,
            email,
            phone
          }
        },

        json: true // Automatically stringifies the body to JSON
      };
      var rp = require("request-promise-native");
      rp(options)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
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
              color={"primary"}
              fullWidth
              onClick={() => this.save()}
              variant={"contained"}
            >
              Confirm
            </Button>
          </Grid>

          <Grid item xs={12}>
            {/* Identifying myself and donation address */}
            <Paper className={"paper"}>
              <Typography variant="caption">
                Built by <span className={"yellow"}>SibosYellow</span> for the
                SIBOS 2019 Hackathon
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(App);
