import React, { useState } from "react";
import Link from "next/link";
import { Badge, Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { setQueryStringValue, textEllipsis } from "../../../../utils/utils";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { ICategory } from "../../../../Types/ICategory";
import {
  createCultivation,
  getAllCultivation,
  updateCultivation,
} from "../../../../helper/api/crops";
import { ICrop } from "../../../../Types/ICrop";
import { getAllFertiliser } from "../../../../helper/api/fertilizer";
import { IPlague } from "../../../../Types/IPlague";
import { IFertilizer } from "../../../../Types/IFertilizer";

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

  const fertiliser = useSWR([`/getAllFertiliser`, page, rowPerPage], () =>
    getAllFertiliser(page, rowPerPage),
  );

  const columns = [
    {
      name: "Plague",
      selector: (row: IFertilizer) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: IFertilizer) => `${row.description}`,
      sortable: true,
      center: false,
    },
    {
      name: "Acción",
      cell: (row: IFertilizer) => (
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
    title = "Crear Fertilizante",
    data: IFertilizer = {
      _id: "",
      name: "",
      description: "",
      image: "",
      active: true,
    },
  ) => {
    setIsOpen(true);
    setInitData(data);
    setAction(action);
    setTitle(title);
  };

  const onSubmit = async (
    data: IFertilizer,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<IFertilizer>,
  ) => {
    setStatus({ success: true });
    setSubmitting(false);
    // resetForm();
  };

  if (!fertiliser?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Fertilizantes"}
          button={{
            title: "Añadir fertilizante",
            onClick: () => {
              handleOpenModal("create");
            },
          }}
          columns={columns}
          data={fertiliser.data.data.data}
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
