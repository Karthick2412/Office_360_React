import HomePage from "./HomePage";
import { Outlet,Navigate } from "react-router-dom";
import './RootLayoutStyle.css'



function RootLayout() {
    const storedExpirationTime = localStorage.getItem('expirationTime');
    var expirationValue=storedExpirationTime && new Date().getTime() < parseInt(storedExpirationTime);
    console.log("expirationValue is "+expirationValue);

        if (storedExpirationTime && new Date().getTime() < parseInt(storedExpirationTime)) {
        } else {
        localStorage.removeItem('myKey');
        localStorage.removeItem('expirationTime');
        }
   
    return expirationValue ? <>
        <HomePage />
        <div className="pageContent">
        {/* <main className="content"> */}
            <Outlet />
        {/* </main> */}
        </div>
    </>:<Navigate to="/" />;
    }

export default RootLayout;