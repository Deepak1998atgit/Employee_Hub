import { object, string } from "yup";
export const EmployeeLoginValidationSchema = object().shape({
    email: string()
    .email("Invalid email")
    .test('valid-email', 'Email address must contain "."', (value) => {
        if (!value) return false;                                           // If value is empty, return false
        return value.includes('@') && value.includes('.');
    })
    .required("Email is required"),
    password: string()
    .required("Password is required"),
});

