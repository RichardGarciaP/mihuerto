import { Container, Row } from "reactstrap";
import BarChartClass from "./BarChart";
import DoughnutChartClass from "./DoughnutChart";
import LineChartClass from "./LineChart";
import LineChart2Class from "./LineChart2";
import PolarChartClass from "./PolarChart";
import RadarChartClass from "./RadarChart";
import PieChartClass from "@/components/Charts/ChartJS/PieChart";
const ChartJsContainer = () => {
  return (
    <Row>
      <BarChartClass />
      <LineChartClass />
      <RadarChartClass />
      <LineChart2Class />
      <DoughnutChartClass />
      <PolarChartClass />
      <PieChartClass />
    </Row>
  );
};

export default ChartJsContainer;
