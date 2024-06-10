import { Card } from "reactstrap";
import { FollowersGrowth, WeeklyMonDropdown } from "utils/Constant";
import FollowerChart from "./FollowerChart";

const FollowerGrowth = () => {
  return (
    <Card className="growth-wrap widget-growth">
      <FollowerChart />
    </Card>
  );
};

export default FollowerGrowth;
