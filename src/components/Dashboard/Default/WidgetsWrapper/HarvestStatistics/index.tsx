import React from "react";
import { Col, Row } from "reactstrap";
import Widgets1 from "../../../../../../CommonElements/Widgets1";
import {
  WidgetsData,
  WidgetsData2,
  WidgetsData4,
} from "../../../../../../Data/Dashboard/DefaultData";

const HarvestStatistics = () => {
  return (
    <>
      <Col sm={12} md={6} lg={4}>
        <Widgets1 data={WidgetsData} />
      </Col>
      <Col sm={12} md={6} lg={4}>
        <Widgets1 data={WidgetsData2} />
      </Col>
      <Col sm={12} md={6} lg={4}>
        <Widgets1 data={WidgetsData4} />
      </Col>
    </>
  );
};

export default HarvestStatistics;
