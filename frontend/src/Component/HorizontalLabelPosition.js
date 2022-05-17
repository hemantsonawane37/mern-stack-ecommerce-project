import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import styled from "styled-components";
import { LocalShipping, CheckBox, AccountBalance } from "@material-ui/icons";

const steps = [
  { Label: "Shipping Details", Icon: <LocalShipping /> },
  { Label: "Comfirm Order", Icon: <CheckBox /> },
  { Label: "Payment", Icon: <AccountBalance /> },
];

const HorizontalLabelPosition = ({OrderSteps}) => {

  return (
    <>
      <MainParentDiv>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={OrderSteps} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  style={
                    OrderSteps >= index
                      ? { color: "green" }
                      : { color: "#505050" }
                  }
                  icon={step.Icon}
                >
                  {step.Label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </MainParentDiv>
    </>
  );
};

var MainParentDiv = styled.div`
  width: 100vw;
  margin: 2vmax 0vmax;
  //border:1px solid red;
`;

export default HorizontalLabelPosition;
