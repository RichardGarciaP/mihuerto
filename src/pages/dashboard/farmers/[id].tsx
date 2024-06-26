import React from "react";
import { Col, Container, Row } from "reactstrap";
import { UserProps } from "../../../../Types/IUser";
import { FormikHelpers } from "formik";
import useSWR, { mutate } from "swr";
import { getOneUser, updateUser } from "../../../../helper/api/users";
import { useRouter } from "next/router";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";
import FarmerMain from "@/components/Farmer/FarmerMain";
import FarmerCultives from "@/components/Farmer/FarmerCultives";
import { getCultivesPerUser } from "../../../../helper/api/crops";
import { IUserCrop } from "../../../../Types/IUserCrop";
import Widgets1 from "../../../../CommonElements/Widgets1";
import { WidgetsData4 } from "../../../../Data/Dashboard/DefaultData";

const EditUser = () => {
  const router = useRouter();
  const userId = router?.query?.id;
  const user = useSWR(userId ? `/getUser/${userId}` : null, () =>
    getOneUser(userId!.toString()),
  );
  const crops = useSWR(userId ? `/user-cultivation/list/${userId}` : null, () =>
    getCultivesPerUser(userId!.toString()),
  );

  if (!user?.data?.data || !crops?.data?.data) return null;

  const formattedCrop = crops?.data?.data?.map((crop: IUserCrop) => ({
    ...crop,
    name: crop.userCultivationName,
  }));

  console.log(formattedCrop);

  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={"Huertista"}
        parentElement={{ title: "Huertistas", url: "/dashboard/farmers" }}
        subParent={`${user?.data?.data?.name} ${user?.data?.data?.lastName}`}
      />
      <Container fluid={true}>
        {/*<Row>*/}
        {/*  <Col sm={12} md={6} lg={6}>*/}
        {/*    <Widgets1*/}
        {/*      data={{*/}
        {/*        title: "Total de cultivos",*/}
        {/*        total: formattedCrop.length,*/}
        {/*        color: "warning",*/}
        {/*        icon: "rate",*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          <Col xs={12} lg={6}>
            <FarmerMain title="Información Personal" user={user?.data?.data} />
          </Col>
          <Col xs={12} lg={6}>
            <Row>
              <Col xs={12}>
                <FarmerCultives crops={formattedCrop} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditUser;
