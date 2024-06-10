import React, { useContext, useState } from "react";
import Link from "next/link";
import { Badge, Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import { IRol } from "../../../../Types/IRol";
import { AddNewRole, Role } from "utils/Constant";
import useSWR, { mutate } from "swr";
import { createRole, getRoles, updateRole } from "../../../../helper/api/role";
import { setQueryStringValue } from "../../../../utils/utils";
import LargeModal from "@/components/Ui-kits/Modal/SizeModal/LargeModal";
import FormModal from "@/components/FormModal";
import { FormikHelpers } from "formik";
import RoleForm from "@/components/Role/RoleForm";
import { createUser, getUsersPortal } from "../../../../helper/api/users";
import { toast } from "react-toastify";
import { getAllCategory } from "../../../../helper/api/categories";
import layoutContext from "helper/Layout";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear Rol");
  const router = useRouter();

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const [initData, setInitData] = useState<IRol>({
    _id: "",
    active: false,
    name: "",
    description: "",
  });

  const {showLoadingModal,hideLoadingModal} = useContext(layoutContext)

  const categories = useSWR([`/getAllCategory`, page, rowPerPage], () =>
    {
      showLoadingModal();
      const allCategories = getAllCategory(page, rowPerPage)
      hideLoadingModal()
      return allCategories
    }
  );

  const columns = [
    {
      name: "Nombre",
      selector: (row: IRol) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: IRol) => `${row.description}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      cell: (row: IRol) =>
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
      cell: (row: IRol) => (
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
    title = "Crear Rol",
    data: IRol = {
      _id: "",
      active: true,
      name: "",
      description: "",
    },
  ) => {
    setIsOpen(true);
    setInitData(data);
    setAction(action);
    setTitle(title);
  };

  const onSubmit = async (
    data: IRol,
    { setErrors, setStatus, setSubmitting, resetForm }: FormikHelpers<IRol>,
  ) => {
    if (action === "create") {
      const response = await createRole(data);
      if (response.status === "success") {
        toast.success("Rol creado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllRoles");
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    if (data._id) {
      const response = await updateRole(data!._id, data);
      if (response.status === "success") {
        toast.success("Rol actualizado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllRoles");
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    setStatus({ success: true });
    setSubmitting(false);
    // resetForm();
  };

  if (!categories?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Categorias"}
          button={{
            title: "Añadir categoria",
            onClick: () => {
              handleOpenModal("create");
            },
          }}
          columns={columns}
          data={categories.data.data.data}
          onChangePage={(page, totalRows) => {
            setQueryStringValue("page", page, router);
          }}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
            setQueryStringValue("rowPerPage", currentRowsPerPage, router);
          }}
        />

        <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <RoleForm
            onSubmit={onSubmit}
            title={title}
            data={initData}
            action={action}
          />
        </FormModal>
      </Container>
    </div>
  );
};

export default Index;
