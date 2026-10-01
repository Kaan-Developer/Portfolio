import type { FC } from "react";

import clsx from "clsx";

interface ButtonType {
    name: string;
    option: string;
}

const Button = ({ name, option }: ButtonType) => {

    return (
        <>
        <button className={clsx(
            "rounded-full px-4 py-2",
            option.includes("github") && "bg-black text-white",
        )}>{name}</button>
        </>
    )
}

export default Button;