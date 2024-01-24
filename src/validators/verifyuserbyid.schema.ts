import { validationMessages } from "../constants/validationMessages";

const yup = require("yup");

export const verifyItemByIdSchema = yup.object({
  params: yup.object({
    id: yup.string().required(validationMessages.required("No id provided")),
  }),
});
