import { Slot } from "@radix-ui/react-slot";
import {clsx} from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    asChild?: boolean;
    mode?: string;
}


export function Button({ mode = 'default', children, asChild, className, ...props}: ButtonProps){
    const Comp = asChild ? Slot : 'button';
    return(
        <Comp 
        className={clsx(
        'font-semibold text-blue-700', 

       {'py-3 px-4 bg-yellow-500 rounded-xl text-sm hover:bg-yellow-700 ring-black': mode === 'default'}

        ,className
        )}
        {...props}
        >
        {children}
        </Comp>
    )
}