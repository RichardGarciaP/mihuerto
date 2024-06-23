import React, { useMemo, useState } from "react";
import { Container, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { downloadCSV } from "../../../../utils/utils";
import { toast } from "react-toastify";
import { CropReport } from "../../../../Types/Reports";
import { getCultiveById } from "../../../../helper/api/reports";
import format from "date-fns/format";
import { getAllCultivation } from "../../../../helper/api/crops";

const UserByCrops = () => {
  const router = useRouter();
  const [id, setId] = useState("");

  const crops = useSWR(
    id ? `/getCultivationByUserCultivation/${id}` : null,
    () => getCultiveById(id),
  );
  const cultives = useSWR(`/getAllCultivation`, () => getAllCultivation());

  const columns = [
    {
      name: "Nombre del Cultivo",
      selector: (row: CropReport) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Fecha de Plantación",
      selector: (row: CropReport) =>
        ` ${format(new Date(row.dateHarvest), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      selector: (row: CropReport) => `${row.status}`,
      sortable: true,
      center: false,
    },
    {
      name: "Usuario",
      selector: (row: CropReport) => `${row.id_user.username}`,
      sortable: true,
      center: false,
    },
    {
      name: "Ubicación",
      selector: (row: CropReport) => `${row.id_user.parish}`,
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
            {cultives?.data?.data?.data?.map((user: any, index: number) => (
              <option value={user._id} key={`cultive-key-search-${index}`}>
                {user.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </>
    ),
    [
      cultives,
      cultives?.data,
      cultives?.data?.data,
      cultives?.data?.data?.data,
    ],
  );

  console.log(cultives?.data);

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Reporte de Cultivos por usuario"}
          button={{
            title: "Descargar reporte",
            onClick: () => {
              exportToCSV(crops?.data?.data);
            },
          }}
          filterData={cultives?.data?.data?.data}
          filter={Filters}
          columns={columns}
          data={crops?.data?.data}
        />
      </Container>
    </div>
  );
};

export default UserByCrops;
