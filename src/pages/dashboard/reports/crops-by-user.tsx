import React, { useMemo, useState } from "react";
import { Container, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { downloadCSV } from "../../../../utils/utils";
import { toast } from "react-toastify";
import { getUsersApp } from "../../../../helper/api/users";
import { CultiveUser } from "../../../../Types/Reports";
import { getCropsByUser } from "../../../../helper/api/reports";
import format from "date-fns/format";

const CropsByUser = () => {
  const router = useRouter();
  const [id, setId] = useState("");

  const cropsByUser = useSWR(id ? `/user-cultivation/list${id}` : null, () =>
    getCropsByUser(id),
  );
  const users = useSWR(`/getAllUsersFarmers`, () => getUsersApp());

  const columns = [
    {
      name: "Nombre del Cultivo",
      selector: (row: CultiveUser) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Cultivo Original",
      selector: (row: CultiveUser) => `${row.originalCultivationName}`,
      sortable: true,
      center: false,
    },
    {
      name: "Usuario",
      selector: (row: CultiveUser) => `${row.userName}`,
      sortable: true,
      center: false,
    },
    {
      name: "Fecha de Plantación",
      selector: (row: CultiveUser) =>
        ` ${format(new Date(row.datePlantation), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      selector: (row: CultiveUser) => `${row.status}`,
      sortable: true,
      center: false,
    },
    {
      name: "Ubicación",
      selector: (row: CultiveUser) => `${row.location}`,
      sortable: true,
      center: false,
    },
  ];

  const exportToCSV = (data: any) => {
    if (!data) {
      toast.error("No hay datos disponibles");
      return;
    }
    downloadCSV(data, columns, "admins");
    toast.success("Archivo descargado correctamente!");
  };

  const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const Filters = useMemo(
    () => (
      <>
        <FormGroup>
          <Label for="user">Usuario </Label>

          <Input type="select" id="user" onChange={onUserChange}>
            <option value="">Selecciona una opción</option>
            {users?.data?.data?.data?.map((user: any, index: number) => (
              <option value={user._id} key={`user-key-search-${index}`}>
                {user.username}
              </option>
            ))}
          </Input>
        </FormGroup>
      </>
    ),
    [users, users?.data, users?.data?.data, users?.data?.data?.data],
  );

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Reporte de Cultivos por usuario"}
          button={{
            title: "Descargar reporte",
            onClick: () => {
              exportToCSV(cropsByUser?.data?.data);
            },
          }}
          filterData={users?.data?.data?.data}
          filter={Filters}
          columns={columns}
          data={cropsByUser?.data?.data}
        />
      </Container>
    </div>
  );
};

export default CropsByUser;
