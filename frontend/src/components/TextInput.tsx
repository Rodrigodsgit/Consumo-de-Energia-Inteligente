import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";



export interface TextInputRootProps{
    children: ReactNode;
    valid?: boolean;
    className?: string;
}

function TextInputRoot({valid = true, children, className}: TextInputRootProps){
    return(
        <div className={clsx(" flex items-center gap-3 h-12 py-4 px-3 rounded-lg w-full  text-blue-700 text-xs ",
        {   "border-2 border-black": valid === true,
            "border-2 border-black ": valid === false,
        }, className)}>
            {children}
        </div>
    )
}

export interface TextInputIconProps{
    children: ReactNode;
}

TextInputRoot.displayName = 'TextInput.Root'

function TextInputIcon(props: TextInputIconProps){
    return(
        <Slot className=" w-6 h-6 text-blue-700">
            {props.children}
        </Slot>
    )
}

TextInputIcon.displayName = 'TextInput.Icon'

export interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string
}

function TextInputInput({className, ...props}: TextInputInputProps){
    return(
        <input
            className={clsx("bg-transparent flex-1 text-black text-xs placeholder:text-blue-700 outline-none ", className)}
            {...props}
        />
    )
}

TextInputInput.displayName = 'TextInput.Input'

export const TextInput ={
    Root: TextInputRoot,
    Input: TextInputInput,
    Icon: TextInputIcon

}
