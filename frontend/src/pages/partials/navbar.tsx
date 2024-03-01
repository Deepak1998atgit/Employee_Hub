import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/reducers/authslicer";


export default function Navbar() {
  const dispatch = useDispatch();
    const handleLogOut = () => {
     try {
        dispatch(clearToken());
        } catch (error) {
        console.log(error);
        }
    }
    return (
        <nav className="bg-[#1b2430] w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a  className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Employee HUb</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={handleLogOut} type="button" className="text-black bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log Out</button>
                </div>
            </div>
        </nav>
    );
}
