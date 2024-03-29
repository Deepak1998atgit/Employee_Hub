import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EmployeeLoginValidationSchema } from "../validations/auth/employee-login-validation";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setToken } from "../../src/redux/reducers/authslicer";
import { useNavigate,Link} from "react-router-dom";
import { toast } from 'react-hot-toast'; 


const EmployeeLoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (studentInfo: any) => {
    try {
      console.log("ok handle login", studentInfo)
      const response = await axios.post("http://localhost:5000/employee-login", studentInfo);
      console.log("res got", response.data.accessToken);
      const { accessToken }: { accessToken: string } =await  response?.data;
      console.log("access token",accessToken);
      dispatch(setToken({ accessToken, userType: "employee" }));
      toast.success(`${response?.data?.message}`,{
        duration: 4000, 
      });
      setTimeout(
        () => {
          response?.data?.status === "success" && navigate("/");
        },4000
      )
    } catch (error: any) {
      console.log(error, "error")
      
      toast.error('Invalid Entry', {
        duration: 4000,
      });
    }
  };
    return (
        <>
        <div className="m-5 ">
      <div className='flex justify-center items-center mt-16  text-customFontColorBlack'>
        <div className='bg-white rounded-lg mx-4 shadow-xl border p-8 w-full max-w-md md:mx-auto md:p-10 lg:p-12'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
           
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={EmployeeLoginValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className='mt-10 space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>
             <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                </div>
                <div className='mt-2'>
                  <Field
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                >
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Do not have an account?
            <Link
              to="/register"
              className='font-semibold leading-6 text-blue-600 hover:text-indigo-500'
            >
              &nbsp; Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default EmployeeLoginPage;

