import React, { useState } from "react";
import Link from "next/link";
import { Badge, Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import { IRol } from "../../../../Types/IRol";
import useSWR, { mutate } from "swr";
import { createRole, getRoles, updateRole } from "../../../../helper/api/role";
import { setQueryStringValue, textEllipsis } from "../../../../utils/utils";
import FormModal from "@/components/FormModal";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "../../../../helper/api/categories";
import { ICategory } from "../../../../Types/ICategory";
import CategoryForm from "@/components/Category/CategoryForm";
import {
  createCultivation,
  getAllCultivation,
  updateCultivation,
} from "../../../../helper/api/crops";
import { ICrop } from "../../../../Types/ICrop";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear Rol");
  const router = useRouter();

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const [initData, setInitData] = useState<ICategory>({
    _id: "",
    active: false,
    name: "",
    image: "",
    description: "",
  });

  const crops = useSWR([`/getAllCultivation`, page, rowPerPage], () =>
    getAllCultivation(page, rowPerPage),
  );

  const columns = [
    {
      name: "Nombre",
      selector: (row: ICrop) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: ICrop) => `${textEllipsis(row.description, 50)}`,
      sortable: true,
      center: false,
    },
    {
      name: "Temporada",
      selector: (row: ICrop) => `${row.sowingSeason}`,
      sortable: true,
      center: false,
    },
    {
      name: "Clima",
      selector: (row: ICrop) => `${row.thermalFloor}`,
      sortable: true,
      center: false,
    },
    {
      name: "Tiempo de germinación",
      selector: (row: ICrop) => `${row.germinationTime}`,
      sortable: true,
      center: false,
    },
    {
      name: "Tiempo de cosecha",
      selector: (row: ICrop) => `${row.harvestTime}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      cell: (row: ICrop) =>
        row.active ? (
          <Badge color="success">Activo</Badge>
        ) : (
          <Badge color="danger">Desactivado</Badge>
        ),
      sortable: true,
      center: false,
    },
    {
      name: "Acción",
      cell: (row: ICrop) => (
        <ul className="action">
          <li className="edit">
            <Link
              href="#"
              onClick={() => handleOpenModal("edit", "Editar Rol", row)}
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
        </ul>
      ),
      sortable: false,
      center: false,
    },
  ];

  const handleOpenModal = (
    action: string,
    title = "Crear Categoria",
    data: ICrop = {
      _id: "",
      name: "",
      description: "",
      image: "",
      scientificName: "",
      active: true,
      categoryId: "",
      beneficalNeighboursId: [],
      plaguesId: [],
      germinationTime: 0,
      harvestTime: 0,
      sowingSeason: "",
      SolarLight: "",
      plantedAtHome: false,
      plotSize: 0,
      thermalFloor: "",
      typeOfSoil: "",
      fertilisersId: [],
      harmfulNeighboursId: [],
      reproductionsId: [],
    },
  ) => {
    setIsOpen(true);
    setInitData(data);
    setAction(action);
    setTitle(title);
  };

  const onSubmit = async (
    data: ICrop,
    { setErrors, setStatus, setSubmitting, resetForm }: FormikHelpers<ICrop>,
  ) => {
    if (action === "create") {
      const response = await createCultivation(data);
      if (response.status === "success") {
        toast.success("Cultivo creado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllCultivation");
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    if (data._id) {
      const response = await updateCultivation(data!._id, data);
      if (response.status === "success") {
        toast.success("Cultivo actualizado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllCultivation");
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    setStatus({ success: true });
    setSubmitting(false);
    // resetForm();
  };

  if (!crops?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Cultivos"}
          button={{
            title: "Añadir cultivo",
            onClick: () => {
              handleOpenModal("create");
            },
          }}
          columns={columns}
          data={crops.data.data.data}
          onChangePage={(page, totalRows) => {
            setQueryStringValue("page", page, router);
          }}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
            setQueryStringValue("rowPerPage", currentRowsPerPage, router);
          }}
        />
      </Container>
    </div>
  );
};

export default Index;
