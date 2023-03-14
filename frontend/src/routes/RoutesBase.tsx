import { Historic } from "../pages/Historic";
import { SignIn } from "../pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const RoutesBase = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn/>}/>                
                <Route path="/historic" element={<Historic/>}/>                
            </Routes>
        </BrowserRouter>
    );
};