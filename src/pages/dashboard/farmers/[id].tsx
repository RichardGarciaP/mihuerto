import React from "react";
import { Container } from "reactstrap";
import UserForm from "@/components/User/UserForm";
import { UserProps } from "../../../../Types/IUser";
import { FormikHelpers } from "formik";
import { UserData } from "../../../../utils/Constant/TestData";

const EditUser = () => {
  const onSubmit = (
    data: UserProps,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<UserProps>,
  ) => {};

  return (
    <div className="page-body">
      <Container fluid={true}>
        <UserForm
          onSubmit={onSubmit}
          data={UserData}
          disabled={true}
          title="Editar Usuario"
        />
      </Container>
    </div>
  );
};

export default EditUser;
