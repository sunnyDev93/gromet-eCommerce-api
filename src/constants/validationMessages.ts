export const validationMessages = {
  email: "Email is Invalid",
  password: {
    min: "Password should be at least 6 Characters",
    max: "Password is too long",
  },
  required: (field: string) => {
    return `${field} field is required`
  }
};
