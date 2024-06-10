import React from "react";
import { Container } from "reactstrap";
import UserForm from "@/components/User/UserForm";
import { UserProps } from "../../../../Types/IUser";
import { FormikHelpers } from "formik";
import { UserData } from "../../../../utils/Constant/TestData";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { getOneUser, updateUser } from "../../../../helper/api/users";
import { toast } from "react-toastify";

const EditUser = () => {
  const router = useRouter();
  const userId = router?.query?.id;

  const user = useSWR(userId ? `/getUser/${userId}` : null, () =>
    getOneUser(userId!.toString()),
  );

  const onSubmit = async (
    data: UserProps,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<UserProps>,
  ) => {
    if (!userId) return;

    const response = await updateUser(userId as string, data);
    if (response.status === "success") {
      toast.success("Usuario actualizado correctamente");
      setStatus({ success: true });
      setSubmitting(false);
      mutate("/getAllUsers");
      mutate(`/getUser/${userId}`);
      router.push("/dashboard/users");
      resetForm();
      return;
    }
    setStatus({ success: false });
    setSubmitting(false);
  };

  if (!user?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <UserForm
          onSubmit={onSubmit}
          data={user?.data?.data}
          title="Editar Usuario"
          action="edit"
        />
      </Container>
    </div>
  );
};

export default EditUser;
