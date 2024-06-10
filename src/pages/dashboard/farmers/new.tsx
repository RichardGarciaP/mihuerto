import React from "react";
import { Container } from "reactstrap";
import UserForm from "@/components/User/UserForm";
import { UserProps } from "../../../../Types/IUser";
import { FormikHelpers } from "formik";

const NewUser = () => {
  const onSubmit = (
    data: UserProps,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<UserProps>,
  ) => {
    console.log(data);
    if (false) {
      setErrors({ submit: "Error" });
      setStatus({ success: false });
      setSubmitting(false);
      return;
    }

    setStatus({ success: true });
    setSubmitting(false);
    // resetForm();
  };
  return (
    <div className="page-body">
      <Container fluid={true}>
        <UserForm onSubmit={onSubmit} title="Editar Usuario" />
      </Container>
    </div>
  );
};

export default NewUser;
