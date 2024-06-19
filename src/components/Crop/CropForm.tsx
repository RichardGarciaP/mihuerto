import CardHead from "CommonElements/CardHead";
import { Card, CardBody, FormFeedback, FormGroup, Media } from "reactstrap";
import { Role, SubmitForm } from "utils/Constant";
import { Button, Col, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Formik, FormikHelpers } from "formik";
import { ICrop } from "../../../Types/ICrop";
import { initialStateCrop } from "../../../utils/constants";
import useSWR from "swr";
import { getAllCategoryActive } from "../../../helper/api/categories";
import { ICategory } from "../../../Types/ICategory";
import CustomTypehead from "@/components/Forms/Fields/CustomTypehead";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { getAllFertiliser } from "../../../helper/api/fertilizer";
import { getAllPlague } from "../../../helper/api/plague";
import { getAllReproductions } from "../../../helper/api/reproduction";
import { getAllCultivation } from "../../../helper/api/crops";
import { validIfIsBase64 } from "../../../utils/utils";

interface CropFormProps {
  onSubmit: (data: ICrop, formikHelpers: FormikHelpers<ICrop>) => void;
  data?: ICrop;
  title: string;
  action?: string;
}

const CropForm = ({
  onSubmit,
  data,
  title,
  action = "create",
}: CropFormProps) => {
  const validations = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre debe tener minimo 3 caracteres")
      .required("El nombre es requerido"),
    description: Yup.string()
      .min(3, "La descripción debe tener minimo 3 caracteres")
      .required("La descripción es requerida"),
    image: Yup.string().required("La imagen es requerida"),
    scientificName: Yup.string()
      .min(3, "El nombre científico debe tener minimo 3 caracteres")
      .required("El nombre científico es requerido"),
    active: Yup.boolean().default(true),
    categoryId: Yup.string().required("La categoria es requerida"),
    beneficalNeighboursId: Yup.array(),
    germinationTime: Yup.number().min(
      1,
      "El tiempo minimo de germinación debe ser 1",
    ),
    harvestTime: Yup.number().min(1, "El tiempo de coseña minimo debe ser 1"),
    sowingSeason: Yup.string().required(
      "La temporada de plantación es requerida",
    ),
    solarLight: Yup.string().required("La cantidad de luz solar es requerida"),
    plantedAtHome: Yup.boolean().default(true),
    plotSize: Yup.number().min(1, "El tamaño minimo debe ser 1").default(1),
    thermalFloor: Yup.string().required("El tipo de clima es requerido"),
    typeOfSoil: Yup.string().required("El tipo de suelo es requerido"),
    plaguesId: Yup.array().required(),
    harmfulNeighboursId: Yup.array().required(),
    reproductionsId: Yup.array().required(),
    transplantSoil: Yup.string().required(
      "El metodo de transplante es requerido",
    ),
    temperatureMax: Yup.number().required("La temperatura máxima es requerida"),
    temperatureMin: Yup.number().required("La temperatura minima es requerida"),
  });

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ): void => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          setFieldValue("image", e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    setFieldValue("image", null);
  };

  const categories = useSWR([`/getAllCategoryActive`], () =>
    getAllCategoryActive(),
  );
  const fertiliser = useSWR([`/getAllFertiliser`], () => getAllFertiliser());
  const plagues = useSWR([`/getAllPlague`], () => getAllPlague());
  const reproductionsMethods = useSWR([`/getAllReproductions`], () =>
    getAllReproductions(),
  );
  const cultivates = useSWR([`/getAllCultivation`], () => getAllCultivation());

  return (
    <Card className="height-equal w-100">
      <CardHead title={title} headClass="custom-card-pd" />
      <CardBody className="custom-card-pd">
        <Formik
          initialValues={
            data
              ? {
                  ...data,
                }
              : initialStateCrop
          }
          validationSchema={validations}
          onSubmit={onSubmit}
        >
          {(props) => {
            const {
              errors,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
            } = props;
            return (
              <form noValidate onSubmit={handleSubmit} className={`row g-3`}>
                <Col xs={6}>
                  <Label for="name">Nombre</Label>
                  <Field
                    name="name"
                    as={Input}
                    invalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="description">Descripción</Label>
                  <Field
                    name="description"
                    as={Input}
                    type="textarea"
                    minRows={1}
                    invalid={touched.description && !!errors.description}
                  />
                  <ErrorMessage name="description" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="scientificName">Nombre científico</Label>
                  <Field
                    name="scientificName"
                    as={Input}
                    invalid={touched.scientificName && !!errors.scientificName}
                  />
                  <ErrorMessage
                    name="scientificName"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="categoryId">Categoria</Label>
                  <Field
                    name="categoryId"
                    as={Input}
                    type="select"
                    invalid={touched.categoryId && !!errors.categoryId}
                  >
                    <option value="">Selecciona una opción</option>
                    {categories?.data?.data?.data?.map(
                      (category: ICategory, index: number) =>
                        category.name !== "app" && (
                          <option
                            value={category._id}
                            key={`category-plant-key-${index}`}
                          >
                            {category.name}
                          </option>
                        ),
                    )}
                  </Field>
                  <ErrorMessage name="categoryId" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="sowingSeason">Temporada de siembra</Label>
                  <Field
                    name="sowingSeason"
                    as={Input}
                    invalid={touched.sowingSeason && !!errors.sowingSeason}
                  />
                  <ErrorMessage name="sowingSeason" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="solarLight">Necesidad de luz solar</Label>
                  <Field
                    name="solarLight"
                    as={Input}
                    invalid={touched.solarLight || !!errors.solarLight}
                  />
                  <ErrorMessage name="solarLight" component={FormFeedback} />
                </Col>{" "}
                <Col xs={6}>
                  <Label for="thermalFloor">Tipo de clima</Label>
                  <Field
                    name="thermalFloor"
                    as={Input}
                    invalid={touched.thermalFloor && !!errors.thermalFloor}
                  />
                  <ErrorMessage name="thermalFloor" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="typeOfSoil">Tipo de suelo</Label>
                  <Field
                    name="typeOfSoil"
                    as={Input}
                    invalid={touched.typeOfSoil && !!errors.typeOfSoil}
                  />
                  <ErrorMessage name="typeOfSoil" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="plotSize">Tamaño de la parcela(metros)</Label>
                  <Field
                    name="plotSize"
                    type="number"
                    as={Input}
                    invalid={touched.plotSize && !!errors.plotSize}
                  />
                  <ErrorMessage name="SolarLight" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="germinationTime">Tiempo de germinación</Label>
                  <Field
                    name="germinationTime"
                    type="number"
                    as={Input}
                    invalid={
                      touched.germinationTime && !!errors.germinationTime
                    }
                  />
                  <ErrorMessage
                    name="germinationTime"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="harvestTime">Tiempo de cosecha</Label>
                  <Field
                    name="harvestTime"
                    type="number"
                    as={Input}
                    invalid={touched.harvestTime && !!errors.harvestTime}
                  />
                  <ErrorMessage name="harvestTime" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="temperatureMax">Temperatura máxima</Label>
                  <Field
                    name="temperatureMax"
                    type="number"
                    as={Input}
                    invalid={touched.temperatureMax && !!errors.temperatureMax}
                  />
                  <ErrorMessage
                    name="temperatureMax"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="temperatureMin">Temperatura minima</Label>
                  <Field
                    name="temperatureMin"
                    type="number"
                    as={Input}
                    invalid={touched.temperatureMin && !!errors.temperatureMin}
                  />
                  <ErrorMessage
                    name="temperatureMin"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="transplantSoil">Suelo de transplante</Label>
                  <Field
                    name="transplantSoil"
                    as={Input}
                    invalid={touched.transplantSoil && !!errors.transplantSoil}
                  />
                  <ErrorMessage
                    name="transplantSoil"
                    component={FormFeedback}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="beneficalNeighboursId">
                    Vecinos Beneficiosos
                  </Label>

                  <Field
                    placeholder={"Selecciona los vecinos"}
                    multiple
                    name="beneficalNeighboursId"
                    optionKey="beneficalNeighbourId"
                    options={cultivates?.data?.data?.data}
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="harmfulNeighboursId">Vecinos Dañinos</Label>

                  <Field
                    placeholder={"Selecciona los vecinos dañinos"}
                    multiple
                    name="harmfulNeighboursId"
                    options={cultivates?.data?.data?.data}
                    optionKey="harmfulNeighbourId"
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="plaguesId">Plagas</Label>

                  <Field
                    placeholder={"Selecciona las plagas"}
                    multiple
                    name="plaguesId"
                    optionKey="plagueId"
                    options={plagues?.data?.data?.data}
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="fertilisersId">Fertilizantes</Label>

                  <Field
                    placeholder={"Selecciona los fertilizantes"}
                    multiple
                    name="fertilisersId"
                    options={fertiliser?.data?.data?.data}
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6}>
                  <Label for="reproductionsId">Metodos de reprodución</Label>

                  <Field
                    placeholder={"Selecciona los metodos de reproducción"}
                    multiple
                    name="reproductionsId"
                    options={reproductionsMethods?.data?.data?.data}
                    optionKey="reproductionId"
                    component={CustomTypehead}
                  />
                </Col>
                <Col xs={6} className="d-flex flex-column align-items-center">
                  <Label for="image" className="w-100">
                    Imagen
                  </Label>

                  {action === "edit" && values.image && (
                    <Image
                      src={
                        values.image && validIfIsBase64(values.image)
                          ? values.image
                          : values.image
                            ? `${process.env.SERVER_URL}${values.image}`
                            : "/assets/images/no-image.jpeg"
                      }
                      alt="uploaded image"
                      className={`img-fluid`}
                      width={"355"}
                      height="400"
                    />
                  )}

                  <Field
                    type="file"
                    as={Input}
                    name="image-temp"
                    accept="image/*"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleImageChange(event, setFieldValue)
                    }
                    invalid={touched.image && !!errors.image}
                  />
                  <p
                    style={{
                      color: "red",
                      marginTop: "10px",
                      alignSelf: "start",
                    }}
                  >
                    Para mejor experiencia del usuario se recomienda una imagen
                    sin fondo.
                  </p>
                  <ErrorMessage name="image" component={FormFeedback} />
                </Col>
                <Col xs={6}>
                  <Label for="plantedAtHome" className="m-l-10">
                    Plantado en casa
                  </Label>
                  <Media body>
                    <Label className="switch mb-0">
                      <Field
                        id="plantedAtHome"
                        name="plantedAtHome"
                        as={Input}
                        type="checkbox"
                        defaultChecked={false}
                      ></Field>
                      <span
                        className={`switch-state ${values.plantedAtHome ? "bg-success" : "bg-secondary"}`}
                      />
                    </Label>
                  </Media>
                </Col>
                <Col xs={6}>
                  <Label for="active" className="m-l-10">
                    Esta activo
                  </Label>
                  <Media body>
                    <Label className="switch mb-0">
                      <Field
                        id="active"
                        name="active"
                        as={Input}
                        type="checkbox"
                        defaultChecked={true}
                      ></Field>
                      <span
                        className={`switch-state ${values.active ? "bg-success" : "bg-secondary"}`}
                      />
                    </Label>
                  </Media>
                </Col>
                <Col xs={12}>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {SubmitForm}
                  </Button>
                </Col>
              </form>
            );
          }}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default CropForm;
