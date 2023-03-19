import { Historic } from "../pages/Historic";
import { Invoice } from "../pages/Invoice";
import { SignIn } from "../pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const RoutesBase = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn/>}/>                
                <Route path="/historic" element={<Historic/>}/>                
                <Route path="/invoice" element={<Invoice/>}/>                
            </Routes>
        </BrowserRouter>
    );
};