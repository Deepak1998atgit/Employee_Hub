import React from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-hot-toast';
import { EmployeeChangePasswordValidationSchema } from "../validations/auth/employee-register-validation";
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../redux/reducers/authslicer";

const EmployeeChangePassword: React.FC = () => {
  const accessToken = useSelector(selectAccessToken);
  const handleSubmit = async (employeeInfo: any) => {
    try {
      const response = await axios.patch("http://localhost:5000/employee-change-password", employeeInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      toast.success(`${response?.data?.message}`, {
        duration: 4000, 
      });
    } catch (error: any) {
        console.error('Error:', error);
        toast.error("Attempt Failed", {
            duration: 4000, 
          });
    }
  };

  return (
    <>
      <div className="m-5">
        <div className='flex justify-center items-center mt-28 text-customFontColorBlack'>
          <div className='bg-white rounded-lg mx-4 shadow-xl border p-8 w-full max-w-md md:mx-auto md:p-10 lg:p-12'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Change Password
              </h2>
            </div>
            <Formik
              initialValues={{ currentPassword: "", newPassword: "", confirmNewPassword: "" }}
              validationSchema={EmployeeChangePasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              <Form className='mt-2'>
                <div>
                  <label
                    htmlFor='currentPassword'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Current Password
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='currentPassword'
                      name='currentPassword'
                      type='password'
                      autoComplete='currentPassword'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='currentPassword'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='newPassword'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    New Password
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='newPassword'
                      name='newPassword'
                      type='password'
                      autoComplete='newPassword'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='newPassword'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='confirmNewPassword'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Confirm New Password
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='confirmNewPassword'
                      name='confirmNewPassword'
                      type='password'
                      autoComplete='confirmNewPassword'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='confirmNewPassword'
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
                    Change Password
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeChangePassword;
