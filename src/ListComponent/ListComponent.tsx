import React from "react";
import Bill from "../OireachtasService/interfaces/iBill";
import BillComponent from "../BillComponent/BillComponent";
import { Grid, Typography } from "@material-ui/core";
import EthComponent from "../EthComponent/EthComponent";
import IBANComponent from "../IBANComponent/IBANComponent";
import PayPalComponent from "../PayPalComponent/PayPalComponent";

interface Props {
  updateBills: Function;
  triggerVoteCast: Function;
}
interface State {
  bills: Bill[];
}
class ListComponent extends React.Component<Props, State> {
  // React element BillComponents outputted from a map.
  public billItems: any = [
    <EthComponent key={0} triggerVoteCast={function() {}} />,
    <IBANComponent key={1} triggerVoteCast={function() {}} />,
    <PayPalComponent key={2} triggerVoteCast={function() {}} />
  ];

  constructor(props: any) {
    super(props);
    this.state = { bills: [] };
  }

  render() {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Set Payment Methods
        </Typography>
        <div>
          <Grid container={true} direction="column" spacing={3}>
            {this.billItems}
          </Grid>
        </div>
      </div>
    );
  }
}

export default ListComponent;
