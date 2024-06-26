import React from "react";
import { setQueryStringValue } from "../../../utils/utils";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import { IUserCrop } from "../../../Types/IUserCrop";
import { useRouter } from "next/router";
import CardHead from "../../../CommonElements/CardHead";
import { Card, CardBody } from "reactstrap";
import format from "date-fns/format";

interface FarmerCultives {
  crops: IUserCrop[];
}

const FarmerCultives = ({ crops }: FarmerCultives) => {
  const router = useRouter();
  const columns = [
    {
      name: "Cultivo",
      selector: (row: IUserCrop) => `${row?.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Plantado",
      selector: (row: IUserCrop) =>
        `${format(new Date(row.datePlantation), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
    {
      name: "Próximo Riego",
      selector: (row: IUserCrop) =>
        `${format(new Date(row.nextWateringDate), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
      width: "170px",
    },
    {
      name: "Ubicación",
      selector: (row: IUserCrop) => `${row.location}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      selector: (row: IUserCrop) => `${row.status}`,
      sortable: true,
      center: false,
      width: "170px",
    },
  ];

  console.log("Crops", crops);
  return (
    <Card className="height-equal p-0">
      <CardBody className="p-0">
        <CustomTableData
          columns={columns}
          hasPadding={false}
          data={crops}
          subHeader={false}
        />
      </CardBody>
    </Card>
  );
};

export default FarmerCultives;
