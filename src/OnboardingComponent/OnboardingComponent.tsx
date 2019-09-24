import React from "react";
import withRoot from "../withRoot";
import { Grid, Typography } from "@material-ui/core";
import MetaMaskLogo from "../static/ethereum-metamask-chrome.png";
import logger from "../logger/winston";

class OnboardingComponent extends React.Component {
  state = { open: true };

  constructor(props: any) {
    super(props);

    if (props.web3Injected === true) {
      logger.info("Web3 is injected into this Onboarding object.");
      this.state = { open: false };
    }
  }

  render() {
    if (this.state.open === false) {
      return null;
    }
    return (
      <div className={"onboardingDiv"}>
        <Grid
          container
          direction={"column"}
          spacing={3}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Register a Domain Name
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
              className={"metaMaskUrl"}
            >
              <img
                src={MetaMaskLogo}
                className={"fullWidthImage"}
                alt="MetaMask Fox Logo"
              />
            </a>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Select a domain name to register payment methods for.
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(OnboardingComponent);
