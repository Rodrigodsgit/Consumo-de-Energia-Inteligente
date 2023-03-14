import * as React from 'react';
import {ClockCounterClockwise, Money} from 'phosphor-react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Text } from "../components/Text";


export function NavBar() {

  return (
    <nav className=''>
         <ul className=" w-[15rem] flex flex-row justify-between bg-gray-700 bg-opacity-70 rounded-xl px-8 py-4">
                <li className='flex flex-col items-center cursor-pointer transition-transform duration-300  hover:scale-150'>
                    <ClockCounterClockwise className='text-yellow-500 w-6 h-6'/>
                    <Text className="text-white hover:text-yellow-700 font-extralight" size="lg">
                        <Link to={'/'}>Historic</Link>
                    </Text>
                </li>

                <li className='flex flex-col items-center cursor-pointer transition-transform duration-300  hover:scale-150'>
                    <Money  className='text-yellow-500 w-6 h-6'/>
                    <Text className="text-white hover:text-yellow-700 font-extralight" size="lg">
                        <Link to={'/'}>Invaice</Link>
                    </Text></li>
            </ul>
    </nav>
  );
}