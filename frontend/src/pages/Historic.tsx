import { Logo } from "../assets/Logo";
import { Heading } from "../components/Heading";
import { Menu } from "../components/Menu";
import { NavBar } from "../components/NavBar";

export function Historic(){
    return(
        <div className="bg-black bg-[url('../assets/Topography.svg')] h-screen w-screen flex flex-row ">
            
            <div className="flex flex-col items-center">
                <Logo className=" mt-8 h-16 w-16"></Logo>
                <div className="pt-20 pl-4">
                    <Menu></Menu>
                </div>
                <div className="mt-auto pb-4 ">
                    <NavBar></NavBar>
                </div>
            </div>

            <div className="flex flex-col mx-6 ">
                <div className=" flex flex-row justify-center  bg-blue-300 bg-opacity-60 mt-8 mx-8 h-[10rem] w-[50rem] rounded-3xl">
                    <Heading>HISTORIC</Heading>
                </div>
            </div>
        </div>
    )

}