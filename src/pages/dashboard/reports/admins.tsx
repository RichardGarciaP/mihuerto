import React from "react";
import useSWR from "swr";
import { Container } from "reactstrap";

import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import { downloadCSV } from "../../../../utils/utils";
import { getAdministrators } from "../../../../helper/api/reports";
import { IAdmin } from "../../../../Types/Reports";
import format from "date-fns/format";
import { toast } from "react-toastify";

const Admins = () => {
  const admins = useSWR(`/administrators`, () => getAdministrators());

  const columns = [
    {
      name: "Cédula",
      selector: (row: IAdmin) => `${row.dni}`,
      sortable: true,
      center: false,
    },
    {
      name: "Nombre",
      selector: (row: IAdmin) => `${row.name} ${row.lastName}`,
      sortable: true,
      center: false,
    },
    {
      name: "Usuario",
      selector: (row: IAdmin) => `${row.username}`,
      sortable: true,
      center: false,
    },
    {
      name: "Correo",
      selector: (row: IAdmin) => `${row.email}`,
      sortable: true,
      center: false,
    },
    {
      name: "Rol",
      selector: (row: IAdmin) => `${row.idRole.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Teléfono",
      selector: (row: IAdmin) => `${row.phone}`,
      sortable: true,
      center: false,
    },
    {
      name: "Fecha de Creación",
      selector: (row: IAdmin) =>
        `${format(new Date(row.createdAt), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
  ];

  const exportToCSV = (data: any) => {
    downloadCSV(data, columns, "admins");
    toast.success("Archivo descargado correctamente!");
  };

  if (!admins?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Reporte de administradores"}
          button={{
            title: "Descargar reporte",
            onClick: () => exportToCSV(admins?.data?.data),
          }}
          columns={columns}
          data={admins.data.data}
        />
      </Container>
    </div>
  );
};

export default Admins;
