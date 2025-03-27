"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdInfo } from "react-icons/md";
import { TbGraphFilled } from "react-icons/tb";
import { RiShoppingBag4Fill } from "react-icons/ri";
import Button from "../ui/CustomButton";
import { JSX } from "react";


interface Fitur {
    _id: string;
    logo: string;
    icon: string;
    title: string;
    description: string;
    route: string;
}

interface FiturProps {
    fitur: Fitur;
}

export default function FiturCard({fitur}: FiturProps) {
    const router = useRouter();

    const handlebButtonClick = () => {
        router.push(fitur.route);
    };

    const iconComponents: { [key: string]: JSX.Element } = {
        MdInfo: <MdInfo size={20} color="#4FAD5B" />,
        TbGraphFilled: <TbGraphFilled size={20} color="#4FAD5B" />,
        RiShoppingBag4Fill: <RiShoppingBag4Fill size={20} color="#4FAD5B" />,
    };

    return (
        <div className="h-[400px] w-[270px] md:h-[450px] md:w-[320px] pt-10 bg-white rounded-lg shadow border border-[#e8e8e8] flex flex-col items-center gap-2">
            <div className="h-[153px] w-[180px] border-[#4FAD5B] border-1 rounded-2xl flex justify-center items-center overflow-hidden">
                <Image width={120} height={120} src={fitur.logo} alt={fitur.title}></Image>
            </div>
            <div className="flex justify-center md:justify-end items-center gap-2 pt-5">
                {iconComponents[fitur.icon]}
                <div className="text-black font-medium text-lg">
                    {fitur.title}
                </div>
            </div>
            <p className="max-w-[200px] text-center flex-grow">
                {fitur.description}
            </p>
            <div className="pb-10">
                <Button text="Coba Yuk" onClick={handlebButtonClick}></Button>
            </div>  
        </div>
    );
};
