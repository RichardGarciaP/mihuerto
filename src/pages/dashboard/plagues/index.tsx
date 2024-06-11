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
import { getAllCultivation } from "../../../../helper/api/crops";
import { IPlague } from "../../../../Types/IPlague";
import { getAllPlague } from "../../../../helper/api/plague";

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

  const plagues = useSWR([`/getAllPlague`, page, rowPerPage], () =>
    getAllPlague(page, rowPerPage),
  );

  const columns = [
    {
      name: "Plague",
      selector: (row: IPlague) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: IPlague) => `${row.description}`,
      sortable: true,
      center: false,
    },
    {
      name: "Acción",
      cell: (row: IPlague) => (
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
    title = "Crear Plaga",
    data: IPlague = {
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
    data: IPlague,
    { setErrors, setStatus, setSubmitting, resetForm }: FormikHelpers<IPlague>,
  ) => {
    setStatus({ success: true });
    setSubmitting(false);
    // resetForm();
  };

  if (!plagues?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Plagas"}
          button={{
            title: "Añadir plaga",
            onClick: () => {},
          }}
          columns={columns}
          data={plagues.data.data.data}
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
