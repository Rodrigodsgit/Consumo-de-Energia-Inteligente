import axios from "axios";
import { useState, useEffect } from "react";
import { Logo } from "../assets/Logo";
import { Heading } from "../components/Heading";
import { NavBar } from "../components/NavBar";
import { Perfil } from "../components/Perfil";
import { Text } from "../components/Text";
import { Circle } from "../assets/Circle";
import { Wave } from "../assets/Wave";
import { Button } from "../components/Button";
import QRCode from "react-qr-code";


export function Invoice(){

    const ID = localStorage.getItem("id");
    const [invoice,setInvoice] = useState([]); 
    const [alert, setAlerta] = useState("");


    useEffect(()=>{
        async function getBill() {
            axios({
                method: 'get',
                url: `http://172.16.103.2:4005/invoice/${ID}`,
            }).then(function(response){
                setAlerta(response.data.alert)
                setInvoice(response.data.invoice)
            })
        }
        getBill()
        },[])


        const handlePrint = () => {
        window.print();
        };


    return(
        <div className="bg-black bg-[url('../assets/Topography.svg')] h-screen w-screen flex flex-row ">
            <div className="flex flex-col items-center ">
                <Logo className=" mt-8 h-16 w-16"></Logo>
                <div className="flex flex-col pt-6 pl-6 items-center w-[24rem]">
                    <QRCode value="https://www.example.com" className="w-40 " />
                    <Text className="text-white text-[0.6rem] ">Nome do beneficiário: COIOT Energia Elétrica</Text>
                    <Text className="text-white text-[0.6rem] ">Identificação do pagamento: Fatura nº 123456789</Text>
                    <Text className="text-white text-[0.6rem] text-center pt-4">Instruções: Leia este código com o seu aplicativo de banco para concluir o pagamento da fatura.
                    Para mais informações ou ajuda, entre em contato com o nosso suporte pelo telefone (xx) xxxx-xxxx ou pelo e-mail suporte@coiot.com.br</Text>
                </div>
                <div className="mt-auto pb-4 pl-6 ">
                    <NavBar></NavBar>
                </div>
            </div>
            <div className="flex flex-col items-center w-full ">
                <div className=" flex flex-col justify-center items-center  bg-blue-300 bg-opacity-60 mt-8  h-[6rem] w-[50rem] rounded-3xl">
                    <Heading classname="mt-2">INVOICE</Heading>
                    <Text className="text-yellow-500 mt-2">{alert}</Text>
                </div>
                <div className="flex flex-col items-center mt-14 ">
                    <div className="flex flex-col items-center">
                        <Perfil></Perfil>
                        <Text className="text-white pt-2">Client: {ID}</Text>
                    </div>
                    <div className="flex flex-row">
                        <div className="mt-4 flex flex-col">
                            <div className="bg-black border flex flex-col
                              border-gray-600 w-[314px] h-[116px] mb-4">
                                <div className="flex flex-row justify-between px-3 pt-3">
                                    <Text className="text-white pt-1">Invoice Total</Text>
                                    <Wave></Wave>
                                    <Text className="text-white pt-1">R$: {invoice}</Text>
                                </div>
                                <div className="flex mt-4 justify-between">
                                    <Text className="pl-2 pt-4 text-white">Generate your invoice:</Text>
                                    <Button className="flex items-center justify-center w-16 mr-8" onClick={handlePrint}>Print</Button>
                                </div>
                            </div>
                            <div>
                                <Circle></Circle>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}