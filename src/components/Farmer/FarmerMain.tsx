import React, { useState } from "react";
import format from "date-fns/format";

import CardHead from "../../../CommonElements/CardHead";
import { Card, CardBody, Col, Row } from "reactstrap";
import { UserProps } from "../../../Types/IUser";
import FieldDescription from "@/components/Farmer/FieldDescription";
import Link from "next/link";

interface FarmerMainProps {
  title: string;
  user: UserProps;
}

const FarmerMain = ({ title, user }: FarmerMainProps) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <Card>
      <CardHead title={title} headClass="custom-card-pm" />
      <CardBody>
        <Row>
          <Col xs={6}>
            <FieldDescription
              title="Nombre"
              description={`${user.name} ${user.lastName}`}
            />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Cédula" description={`${user.dni}`} />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Correo" description={`${user.email}`} />
          </Col>
          <Col xs={6}>
            <FieldDescription
              title="Fecha de nacimiento"
              description={`${format(new Date(user.dateOfBirth), "dd-MM-yyyy")}`}
            />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Teléfono" description={user.phone} />
          </Col>
          <Col xs={6}>
            <FieldDescription title="Parroquia" description={user.parish} />
          </Col>
          <Col xs={12}>
            <FieldDescription title="Rol" description={user.position} />
          </Col>
          <Col xs={6}>
            <p
              className="change-password"
              onClick={() => setOpenChangePassword(true)}
            >
              Cambiar contraseña
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default FarmerMain;
