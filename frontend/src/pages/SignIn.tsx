import { Envelope } from "phosphor-react";
import { TextInput } from "../components/TextInput";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Logo } from "../assets/Logo";
import { Icon1 } from "../assets/Icon1";
import { Icon2 } from "../assets/Icon2";
import { Icon3 } from "../assets/Icon3";
import { Balls } from "../assets/Balls";
import { BallsR } from "../assets/BallsR";
import { useToast } from '@chakra-ui/react'


export function SignIn() {

    const [id, setID] =  useState("");
    const toast = useToast();
    const navigate = useNavigate();
    
    async function  handleSignIp(event: FormEvent) {
        event.preventDefault()

        axios({
            method: 'get',
            url: `http://127.0.0.1:4005/measurer/${id}`,
        }).then(function (response){
            if (response.data){
                navigate('/historic', { replace: true });
                localStorage.setItem("id", id);
            }
            else{
                setID('');
                toast({
                    title: 'Non-existent identification.',
                    description: "Confirm that this meter exists.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }
        })

    }

    return (
        <div className="w-screen h-screen flex flex-row items-center justify-center ">
            <div className=" flex flex-col bg-gray-900 w-screen h-screen px-8">
                <header>
                    <Logo className="h-12 w-12 pl-4"></Logo>
                </header>

                <div className="flex flex-row self-start ml-10">
                    <Icon1 className="h-44 w-44"></Icon1>
                    <div className="flex flex-col items-center mt-14">
                        <Text className="font-bold text-white"> Connecting you to the energy </Text>
                        <Text className="font-bold text-yellow-500"> of the future </Text>
                    </div>
                </div>

                <div className="flex flex-row self-end mr-10">
                     <div className="flex flex-col items-center mt-14">
                        <Text className="font-bold text-white"> Analyze your consumption and save energy </Text>
                        <Text className="font-bold text-yellow-500"> with the help of COIOT.</Text>
                    </div>
                    <Icon2 className="h-44 w-44"></Icon2>    
                </div>

                <div className="flex flex-row self-start ml-10">
                    <Icon3 className="h-44 w-44"></Icon3>
                    <div className="flex flex-col items-center mt-14 ml-10">
                        <Text className="font-bold text-white"> A global energy for </Text>
                        <Text className="font-bold text-yellow-500">a sustainable future</Text>
                    </div>
                </div>

            </div>

            <div className=" flex flex-col bg-white w-screen h-screen">
                <div className="flex flex-row  justify-between pt-6 px-6">
                    <Balls className="h-32"></Balls>
                    <BallsR className="h-32"></BallsR>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Logo className="h-36 "></Logo>
                    <Heading classname="font-extrabold pt-3 text-3xl"> <span className="text-blue-700 ">CO</span><span className="text-yellow-500">IOT</span></Heading>
                </div>
                <form className="flex flex-col items-center"  onSubmit={handleSignIp}>

                    <label htmlFor="id" className="flex flex-col items-start pb-4">
                        <Text className="text-blue-700 font-bold pt-4">Identification</Text>
                        <TextInput.Root>
                        <TextInput.Icon>
                            <Envelope />
                        </TextInput.Icon>
                        <TextInput.Input
                            value={id}
                            onChange={(e) => setID(e.target.value)}
                            type="text"
                            id="id"
                            autoComplete="off"
                            placeholder="Enter your ID"
                        />
                    </TextInput.Root>
                    </label>

                    <Button className="w-[11rem]" type="submit">
                        Login 
                    </Button>

                </form>

                <footer className="mt-auto">
                    <Text className="text-blue-700 text-[8px] leading-tight">Copyright © 2023 COIOT. All rights reserved. All content on this site is the exclusive property of COIOT and is protected by copyright laws.
                    
                    </Text>
                </footer>
            </div>

        </div>
    );
}

