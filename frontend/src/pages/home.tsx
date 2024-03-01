import React,{useEffect} from 'react';
import Navbar from './partials/navbar';
import EmployeeLists from '../components/employeeLists';
import { useNavigate} from "react-router-dom";
import { selectIsLoggedIn } from "../redux/reducers/authslicer";
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    console.log(isLoggedIn,"uuuuu")
    useEffect(
        () => {
            if(isLoggedIn === false){
                navigate("/login");
            }     
        },[isLoggedIn, navigate]
    )
    return (
        <>
            <Navbar />
            {isLoggedIn &&  <EmployeeLists/>  }       
        </>
    )
}
export default Home;
