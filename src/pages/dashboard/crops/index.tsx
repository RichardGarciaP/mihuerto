import React from "react";
import ZeroConfiguration from "@/components/Table/DataTable/BasicInit/ZeroConfiguration";
import { Container } from "reactstrap";
import { AddNewUser, Role } from "utils/Constant";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <div className="page-body">
      <Container fluid={true}>
        <ZeroConfiguration
          title={Role}
          button={{
            title: AddNewUser,
            onClick: () => {
              router.push("/dashboard/users/new");
            },
          }}
        />
      </Container>
    </div>
  );
};

export default Index;
