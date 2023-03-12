import { SignIn } from "../pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const RoutesBase = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/*PUBLIC ROUTES*/}
                <Route path="/signin" element={<SignIn/>}/>                
            </Routes>
        </BrowserRouter>
    );
};