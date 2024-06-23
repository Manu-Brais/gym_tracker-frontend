import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";
import { FETCH_USER_DATA_QUERY } from "../../../graphql/queries/fetchUserData";
import { UPDATE_USER_DATA_MUTATION } from "../../../graphql/mutations/updateUserData";
import { UpdateUserDataSchema } from "../../../components/validation/UpdateUserDataSchema";
import useGraphQLMutation from "../../../hooks/useGraphQlMutation";

export default function ProfilePage() {
  const { loading, error, data } = useQuery(FETCH_USER_DATA_QUERY);

  const { execute } = useGraphQLMutation(
    UPDATE_USER_DATA_MUTATION,
    (data) => onCompletedMutation(data),
    () => toast.success("Datos actualizados con éxito"),
    () => toast.error("Error al guardar los datos de perfil")
  );

  const handleSubmit = async (values) => {
    await execute({ input: values });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phone: "",
      address: "",
    },
    validationSchema: UpdateUserDataSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (data) {
      const { authenticatable } = data.fetchUserData;
      const { name, surname, phone, address } = authenticatable;
      formik.setValues({
        name: name,
        surname: surname,
        phone: phone,
        address: address,
      });
    }
  }, [data]);

  const onCompletedMutation = (data) => {
    const { authenticatable } = data.updateUserData.userData;
    const { name, surname, phone, address } = authenticatable;
    formik.setValues({
      name: name,
      surname: surname,
      phone: phone,
      address: address,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col lg:flex-row rounded overflow-hidden shadow-md shadow-black-500 bg-slate-50/80"
    >
      <div className="flex flex-col justify-end gap-3 w-full px-10 py-8 lg:order-1 lg:p-16 lg:items-center lg:justify-between">
        <div className="flex flex-col gap-[0.75rem] mb-4 w-full">
          <FormInput
            id="name"
            label="Name"
            name="name"
            placeholder="Jhon"
            error={formik.errors.name}
            touched={formik.touched.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="name"
          />
          <FormInput
            id="surname"
            label="Surname"
            name="surname"
            placeholder="Doe"
            error={formik.errors.surname}
            touched={formik.touched.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
            type="surname"
          />
          <FormInput
            id="phone"
            label="Phone"
            name="phone"
            placeholder="675123987"
            error={formik.errors.phone}
            touched={formik.touched.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="phone"
          />
          <FormInput
            id="address"
            label="Address"
            name="address"
            placeholder="C/ Santiago de Chile, 9"
            error={formik.errors.address}
            touched={formik.touched.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            type="address"
          />
        </div>
        <Button type="submit" isLoading={formik.isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
}
