import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';


const LazyEmployeeRegister = lazy(
  () => import("./pages/empolyee-register")
);

const LazyEmployeeLogin = lazy(
  () => import("./pages/employee-login")
);

const LazyEmployeeHome = lazy(
  () => import("./pages/home")
);

const LazyChangePasswordPage= lazy(
  () => import("./pages/employee-changepassword")
);



function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/change-password" element={<LazyChangePasswordPage/>} />
          <Route path="/register" element={<LazyEmployeeRegister />} />
          <Route path="/login" element={<LazyEmployeeLogin />} />
          <Route path="/"  element={<LazyEmployeeHome/>} />
       </Routes> 
      </Suspense>     
    </Router> 
    </>
  )
}

export default App;
