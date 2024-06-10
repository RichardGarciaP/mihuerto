import HarvestStatistics from "@/components/Dashboard/Default/WidgetsWrapper/HarvestStatistics";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import React from "react";
import { Container, Row } from "reactstrap";
import { Dashboard, Default_Util } from "utils/Constant";
import PieChartClass from "@/components/Charts/ChartJS/PieChart";

const Default = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        title={Default_Util}
        mainTitle={Dashboard}
        parent={Dashboard}
      />
      <Container fluid={true}>
        <Row className="widget-grid">
          <HarvestStatistics />
          <PieChartClass />
          <PieChartClass />
          <PieChartClass />
        </Row>
      </Container>
    </div>
  );
};

export default Default;
