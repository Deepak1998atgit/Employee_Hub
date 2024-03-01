import { Router, Request, Response } from 'express';
import { registerEmployee, loginEmployee, getAllEmployees,removeEmployee,changePassword} from '../controller/employee-controller';
import { verifyToken } from '../middleware/verifyToken';
const router = Router();

router.post('/employee-registration', registerEmployee);                // route for register an employee
router.post('/employee-login', loginEmployee);                          // route for login an employee
router.get('/employee-details', verifyToken, getAllEmployees);          // protected route
router.delete('/employee-remove/:email', verifyToken, removeEmployee);  // remove an employee
router.patch('/employee-change-password', verifyToken, changePassword); // change password


export default router;