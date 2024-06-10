import { Pie } from "react-chartjs-2";
import { Col, Card, CardBody } from "reactstrap";
import { PieChart } from "utils/Constant";
import { doughnutData, doughnutOption } from "Data/Charts/ChartJsData";
import CommonCardHeading from "CommonElements/CommonCardHeading";

const PieChartClass = () => {
  return (
    <Col lg={6} md={6} sm={12} className="box-col-6">
      <Card>
        <CommonCardHeading smallHeading={PieChart} />
        <CardBody className="chart-block">
          <Pie
            data={doughnutData}
            options={doughnutOption}
            width={758}
            height={500}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PieChartClass;
