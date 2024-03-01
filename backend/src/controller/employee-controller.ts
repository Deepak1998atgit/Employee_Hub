import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express'; 
import Employee from '../model/employee';
import { EmployeeRegisterInterface } from '../types/employee';
import AppError from '../utils/customError';
import HttpStatusCodes from '../HttpStatusCodes';
import bcrypt from 'bcrypt';
import configKeys from '../config';
import jwt from 'jsonwebtoken'




//? Employee Registration
export const registerEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employee : EmployeeRegisterInterface = req.body;
  employee.email = employee?.email?.toLowerCase();
  const isEmailAlreadyRegisterd = await Employee.findOne({ email: employee?.email });
  console.log(isEmailAlreadyRegisterd,"isEmailAlreadyRegisterd")
  if (isEmailAlreadyRegisterd){
    throw new AppError(
      'Employee with same email already exists...!',
      HttpStatusCodes.CONFLICT
    );
  }
  const isPhoneIsAlreadyExist=await Employee.findOne({phone:employee?.phone})
  if(isPhoneIsAlreadyExist) {
    throw new AppError(
      'Employee with same Phone already exists...!',
      HttpStatusCodes.CONFLICT
    );
  }
  if (employee.password) {
    employee.password  = await bcrypt.hash(employee?.password, 10);
  }else{
    throw new AppError(
      'Employee  with not Password while registering...!',
      HttpStatusCodes.NOT_FOUND
    );
  }
  const newEmployee = await new Employee(employee);
  newEmployee.save()
  res.status(200).json({
    status: 'success',
    message: 'Successfully registered please login',
  });
});




//? Employee Login
export const loginEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employeeData: EmployeeRegisterInterface | null= req.body;
  const employee = await Employee.findOne({ email: employeeData?.email });
  if (!employee){
    throw new AppError(
      'Employee  not registered...!',
      HttpStatusCodes.NOT_FOUND
    );
  }
  if(employeeData?.password && employee?.password) {
    const isPasswordCorrect = await bcrypt.compare(employeeData?.password, employee?.password)
    if (!isPasswordCorrect) {
      throw new AppError(
        'Sorry, your password is incorrect. Please try again',
        HttpStatusCodes.UNAUTHORIZED
      );
    } else {
      const payload = {
        Id: employee?._id,
        email: employee?.email,
        role: 'employee'
      };
      const accessToken = jwt.sign({ payload }, configKeys?.JWT_SECRET, {
        expiresIn: '6h'
      });
      res.status(200).json({
        status: 'success',
        message: 'Employee logged in successfully',
        accessToken
      });
    }
  }
});


//?Home page getting
interface CustomRequest extends Request {
  user?: any;  
}
export const getAllEmployees = asyncHandler(async (req: CustomRequest, res: Response) => {
  const employeeEmail = req?.user?.payload?.email;
  const employee = await Employee.findOne({ email:employeeEmail});
  if (!employee){
    throw new AppError(
      'Employee  not registered...!',
      HttpStatusCodes.NOT_FOUND
    );
  }
  const getAllEmployees = await Employee.find({ email: { $ne: employeeEmail } },{ password: 0 }  );
  res.status(200).json({
    status: 'success',
    message: 'Fetched all employees',
    getAllEmployees
  });
})


//Remove employee
export const removeEmployee = asyncHandler(async (req:Request, res: Response) => {
  console.log("okkk")
  const {email} = req.params;
  const deletedEmployee = await Employee.findOneAndDelete({ email });
  if (!deletedEmployee) {
    throw new AppError(
      'Employee  not registered...!',
      HttpStatusCodes.NOT_FOUND
    );
  }
  res.status(200).json({
    status: 'success',
    message: 'Employee is removed'
  });
});


//?Change Password
export const changePassword = asyncHandler(async (req: CustomRequest, res: Response) => {
  const employeeEmail = req?.user?.payload?.email;
  const newPassword = req?.body?.newPassword;
  const employee = await Employee.findOne({ email:employeeEmail});
  if (!employee){
    throw new AppError(
      'Employee  not registered...!',
      HttpStatusCodes.NOT_FOUND
    );
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  employee.password = hashedPassword;
  await employee.save();
  res.status(200).json({
    message: 'Password updated successfully'
  });
});