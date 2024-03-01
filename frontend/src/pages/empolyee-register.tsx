import React  from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EmployeeRegistrationValidationSchema } from "../validations/auth/employee-register-validation";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast'; 

const EmployeeRegisterPage: React.FC = () => {
    const handleSubmit = async (employeeInfo: any) => {
      try {
        console.log("ok reg handle", employeeInfo, "get the student")
        const response=await axios.post('http://localhost:5000/employee-registration',employeeInfo)
        .then(response => {
          console.log('Response:', response.data);
          toast.success("registerd successfully please login");
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error("Invalid Entry")
        }); 
      } catch (error: any) {
        console.log(error)
      }
    };
      return (
          <>
        <div className="m-5">
        <div className='flex justify-center items-center mt-4  text-customFontColorBlack'>
          <div className='bg-white rounded-lg mx-4 shadow-xl border p-8 w-full max-w-md md:mx-auto md:p-10 lg:p-12'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
             
              <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Sign Up 
              </h2>
            </div>
            <Formik
              initialValues={{name:"", email: "",address:"",phone:"", password: "" , confirmPassword:""}}
              validationSchema={EmployeeRegistrationValidationSchema }
              onSubmit={handleSubmit}
            >
             <Form className='mt-2'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Name
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='name'
                      name='name'
                      type='text'
                      autoComplete='name'
                      required
                      className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Email 
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
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Address
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='address'
                      name='address'
                      type='text'
                      autoComplete='address'
                      required
                      className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='address'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                 </div>
                 <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                  Phone
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='phone'
                      name='phone'
                      type='text'
                      autoComplete='phone'
                      required
                      className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='phone'
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
                   <div className='flex items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                     Confirm Password
                    </label>
                    </div>
                    <div className='mt-2'>
                    <Field
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      autoComplete='confirmPassword'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='confirmPassword'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div>
                  <button
                    type='submit'
                    className='flex w-full mt-4 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            </Formik>
            <p className='mt-10 text-center text-sm text-gray-500'>
             have an account?
                  <Link
                    to="/login"
                    className='font-semibold leading-6 text-blue-600 hover:text-indigo-500'>
                &nbsp; Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
      
    );
  };
  
  export default EmployeeRegisterPage;