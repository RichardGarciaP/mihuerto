import Breadcrumbs from "CommonElements/Breadcrumbs";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Dashboard, Default_Util } from "utils/Constant";
import { getDashboardData } from "../../../../helper/api/users";
import useSWR from "swr";
import WidgetsStatistic from "../../../../CommonElements/Widgets1";
import {
  FaBahai,
  FaBug,
  FaSeedling,
  FaSunPlantWilt,
  FaTableList,
  FaUser,
  FaUserGroup,
  FaWheatAwn,
} from "react-icons/fa6";
import { GiFertilizerBag } from "react-icons/gi";

const Index = () => {
  const data = useSWR(`/dashboard`, () => getDashboardData());

  if (!data?.data?.data) return null;
  const dashboardData = data?.data?.data;
  return (
    <div className="page-body">
      <Breadcrumbs
        title={Default_Util}
        mainTitle={Dashboard}
        parent={Dashboard}
      />
      <Container fluid={true}>
        <Row className="widget-grid">
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Administradores",
                total: dashboardData.totalUsers,
                color: "warning",
                icon: <FaUser className="secondary" />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Huertistas",
                total: dashboardData.totalUserCultivations,
                color: "primary",
                icon: <FaUserGroup />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Roles",
                total: dashboardData.totalRoles,
                color: "secondary",
                icon: <FaBahai />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Categorias",
                total: dashboardData.totalCategories,
                color: "warning",
                icon: <FaTableList />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Cultivos",
                total: dashboardData.totalCultivations,
                color: "primary",
                icon: <FaSunPlantWilt />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Fertilizantes",
                total: dashboardData.totalFertilisers,
                color: "success",
                icon: <GiFertilizerBag />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Fertilizantes Organicos",
                total: dashboardData.totalPlagues,
                color: "success",
                icon: <GiFertilizerBag />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Plagas",
                total: dashboardData.totalReproductions,
                color: "secondary",
                icon: <FaBug />,
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <WidgetsStatistic
              data={{
                title: "Total de Metodos de Reproducción",
                total: dashboardData.totalOrganicFertilisers,
                color: "success",
                icon: <FaSeedling />,
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
