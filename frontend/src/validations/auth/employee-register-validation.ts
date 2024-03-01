import { object, string, ref } from "yup";
export const EmployeeRegistrationValidationSchema = object().shape({
name: string().trim().required("Name is required"),
email: string().email("Invalid email").trim().required("Email is required")
.test('valid-email', 'Email address must contain "."', (value) => {
    if (!value) return false;                                               
    return value.includes('@') && value.includes('.');
}),
phone: string().trim()
.required("phone number is required")
.matches(
    /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/,
    "Please enter a valid 10-digit mobile number"
),
password: string().required("Password is required")
.min(8, "Password must be at least 8 characters long"),
confirmPassword: string()
.oneOf([ref("password")], "Passwords must match")
.required("Confirm Password is required"),
});



export const EmployeeChangePasswordValidationSchema = object().shape({
currentPassword: string().required("Password is required")
.min(8, "Password must be at least 8 characters long"),
newPassword: string().required("New password is required")
.min(8, "New Password must be at least 8 characters long"),
confirmNewPassword: string()
.oneOf([ref("newPassword")], "Passwords must match")
.required("Confirm new Password is required"),
});