import axios from "axios";
import { Logo } from "../assets/Logo";
import { Heading } from "../components/Heading";
import { Menu } from "../components/Menu";
import { NavBar } from "../components/NavBar";
import { Scroll } from "../components/Scroll";
import { useState, useEffect } from "react";
import { Graph } from "../components/Graph";
import { G } from "../assets/G";
import {Text} from "../components/Text";



export function Historic(){
    const ID = localStorage.getItem("id");
    const [data,setData] = useState([]); 
    const [graph, setGraph] = useState([]);
    const [alert, setAlerta] = useState("");


    useEffect(()=>{
    async function historic() {
        axios({
            method: 'get',
            url: `http://127.0.0.1:4005/historic/${ID}`,
        }).then(function(response){
            setData(response.data.historic)
            setGraph(response.data.historic.map(([spent, date], index) => ({
                x: index + 1,
                y: spent
              })))
            setAlerta(response.data.alert)
        })
    }
    historic()
    },[])

    
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

            <div className="flex flex-col mx-6 items-center ">
                <div className=" flex flex-col justify-center items-center  bg-blue-300 bg-opacity-60 mt-8 mx-8 h-[6rem] w-[50rem] rounded-3xl">
                    <Heading classname="mt-2">HISTORIC</Heading>
                    <Text className="text-yellow-500 mt-2">{alert}</Text>
                </div>
                <div className="flex flex-row mt-14 justify-between">

                    <div className="pl-5">
                        <G className="w-[270px] h-60"></G>
                    </div>
                    <div className="ml-10 pr-5">
                        <Scroll data={data}></Scroll>
                    </div>
                    <div className="pl-5">
                        <Graph data={graph}></Graph>
                    </div>

                </div>
            </div>
        </div>
    )

}