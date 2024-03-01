import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAccessToken } from "../redux/reducers/authslicer";
import { Link } from 'react-router-dom';


interface Employee {
    name: string;
    email: string;
    phone: string;
    _id: string;
    address: string;
    isBlocked: boolean;
  }

const EmployeeLists: React.FC = () => {
    const accessToken = useSelector(selectAccessToken);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/employee-details", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`                                                       // Pass the access token as a Bearer token in the Authorization header
                    }
                });
                setEmployees(response?.data?.getAllEmployees);                                                       // Handle the response data here
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [accessToken]);
    console.log(employees)

    const handleDelete = async (email :string) => { 
        console.log(email, "email")
        try {
            await axios.delete(`http://localhost:5000/employee-remove/${email}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setEmployees(prevEmployees => prevEmployees.filter(employee =>  employee.email !== email));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }

    const filteredEmployees = employees.filter(employee => {
        // Filter employees based on search query matching name or address
        return employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.address.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <> 
           
            <div className="flex  justify-center min-h-screen ">
                <div className="overflow-auto lg:overflow-visible mr-10 ml-10  mt-10 border-x-cyan-950 lg:rounded-xl">
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or address"
                        className='w-full focus:outline-none h-11 '
                />
                    <table className="table text-white border-separate space-y-6 text-sm border ">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3 text-left">Address</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredEmployees.map((employee: Employee, index) => (
                                <tr key={index} className="bg-gray-700 border rounded-2xl mt-4 w-full">
                                    <td className="p-3">
                                        <div className="flex align-items-center">
                                            <img className="rounded-full h-12 w-12  object-cover" src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg" alt="Employee" />
                                            <div className="ml-3">
                                                <div className="">{employee.name}</div>
                                                <div className="text-white">{employee.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">{employee.address}</td>
                                    <td className="p-3 font-bold">{employee.phone}</td>
                                    <td className=" lg:p-3">
                                        <button onClick={() => { handleDelete(employee?.email) }} className="bg-white text-black h-11 w-20 lg:w-24 rounded-md">remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <Link to="/change-password" className="py-2 px-3 text-black text-xl">Change Password</Link>  
                
                </div>
            </div>
        </>
    );
}
export default EmployeeLists;



