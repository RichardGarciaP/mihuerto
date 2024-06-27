import React, { useState } from "react";
import Link from "next/link";
import { Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { setQueryStringValue, textEllipsis } from "../../../../utils/utils";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import ProtectionForm from "@/components/Protection/ProtectionForm";
import FormModal from "@/components/FormModal";
import { IProtection } from "../../../../Types/IProtection";
import {
  createPlague,
  getAllPlague,
  getOnePlague,
  updatePlague,
} from "../../../../helper/api/plague";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear plaga");
  const router = useRouter();
  const [id, setId] = useState("");

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const plagues = useSWR([`/getAllPlague`, page, rowPerPage], () =>
    getAllPlague(page, rowPerPage),
  );

  const selectedPlague = useSWR(id ? `/getOnePlague/${id}` : null, () =>
    getOnePlague(id!.toString()),
  );

  const columns = [
    {
      name: "Plaga",
      selector: (row: IProtection) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: IProtection) => `${textEllipsis(row.description, 100)}`,
      sortable: true,
      center: false,
    },
    {
      name: "Acción",
      cell: (row: IProtection) => (
        <ul className="action">
          <li className="edit">
            <Link
              href="#"
              onClick={() => handleOpenModal("edit", "Editar plaga", row)}
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
    title = "Crear plaga",
    data: IProtection = {
      _id: "",
      name: "",
      description: "",
      image: "",
    },
  ) => {
    setId(data!._id as string);
    if (action === "create") {
      setIsOpen(true);
    } else {
      setIsOpenEdit(true);
    }
    setAction(action);
    setTitle(title);
  };
  const onSubmit = async (
    data: IProtection,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<IProtection>,
  ) => {
    setSubmitting(true);
    if (action === "create") {
      const response = await createPlague(data);
      if (response.success) {
        toast.success("Plaga creada correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllFertiliser");
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    if (data._id) {
      const response = await updatePlague(data!._id, data);
      if (response.success) {
        toast.success("Plaga actualizada correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate("/getAllFertiliser");
        mutate(`/getOneFertiliser/${data._id}`);
        setIsOpenEdit(false);
        resetForm();
        return;
      }
    }

    setStatus({ success: true });
    setSubmitting(false);
    resetForm();
  };

  if (!plagues?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Plagas"}
          button={{
            title: "Añadir plaga",
            onClick: () => {
              handleOpenModal("create");
            },
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

        <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <ProtectionForm onSubmit={onSubmit} title={title} action={action} />
        </FormModal>
        {selectedPlague?.data?.data && (
          <FormModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit}>
            <ProtectionForm
              onSubmit={onSubmit}
              title={title}
              data={selectedPlague?.data?.data}
              action={action}
            />
          </FormModal>
        )}
      </Container>
    </div>
  );
};

export default Index;
