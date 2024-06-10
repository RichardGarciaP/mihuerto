import React, { useContext, useState } from "react";
import Link from "next/link";
import { Badge, Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { setQueryStringValue } from "../../../../utils/utils";
import FormModal from "@/components/FormModal";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import layoutContext from "helper/Layout";
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../../../../helper/api/categories";
import { ICategory } from "../../../../Types/ICategory";
import CategoryForm from "@/components/Category/CategoryForm";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear Rol");
  const [userId, setUserId] = useState("");
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

  const { showLoadingModal, hideLoadingModal } = useContext(layoutContext);

  const categories = useSWR([`/getAllCategory`, page, rowPerPage], () => {
    showLoadingModal();
    const allCategories = getAllCategory(page, rowPerPage);
    hideLoadingModal();
    return allCategories;
  });

  const category = useSWR(userId ? `/getOneCategory/${userId}` : null, () =>
    getOneCategory(userId!.toString()),
  );

  const columns = [
    {
      name: "Nombre",
      selector: (row: ICategory) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: ICategory) => `${row.description}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      cell: (row: ICategory) =>
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
      cell: (row: ICategory) => (
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
    data: ICategory = {
      _id: "",
      active: true,
      name: "",
      description: "",
      image: "",
    },
  ) => {
    setUserId(data!._id as string);
    if (action === "create") {
      setIsOpen(true);
    } else {
      setIsOpenEdit(true);
    }
    // setInitData(data);
    setAction(action);
    setTitle(title);
  };

  const onSubmit = async (
    data: ICategory,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<ICategory>,
  ) => {
    if (action === "create") {
      const response = await createCategory(data);
      if (response.status === "success") {
        toast.success("Categoria creada correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllCategory");
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    if (data._id) {
      const response = await updateCategory(data!._id, data);
      if (response.status === "success") {
        toast.success("Categoria actualizada correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllCategory");
        mutate(`/getOneCategory/${data._id}`);
        setIsOpenEdit(false);
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
          <CategoryForm
            onSubmit={onSubmit}
            title={title}
            data={initData}
            action={action}
          />
        </FormModal>
        {category?.data?.data && (
          <FormModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit}>
            <CategoryForm
              onSubmit={onSubmit}
              title={title}
              data={category?.data?.data}
              action={action}
            />
          </FormModal>
        )}
      </Container>
    </div>
  );
};

export default Index;
