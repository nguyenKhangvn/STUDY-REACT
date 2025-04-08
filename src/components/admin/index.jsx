import { Outlet } from "react-router-dom"; 
const LayoutAdmin = () => { 
    return ( 
    <div> 
        <h1>Admin Layout</h1> 
        <Outlet /> 
        </div> 
    ); 
}; 
export default LayoutAdmin;