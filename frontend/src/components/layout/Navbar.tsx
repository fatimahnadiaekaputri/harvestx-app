"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/CustomButton";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { IoMenu } from "react-icons/io5"; // Gunakan icon menu

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-8 border-b border-gray-300">
            <div className="flex justify-between items-center h-20 mx-4 md:mx-16">
                {/* Logo */}
                <Link href="/">
                    <Image src="/Logo.svg" alt="HarvestX Logo" width={120} height={40} />
                </Link>

                {/* Menu Desktop */}
                <div className="hidden lg:flex flex-grow space-x-20 justify-end">
                    <Link href="#" className="text-black text-lg hover:text-[#4FAD5B]">Beranda</Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-black text-lg hover:text-[#4FAD58]">Fitur Kami</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><Link href="#">Informasi Harga</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="#">Visualisasi Grafis</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/simulasi">Simulasi Belanja</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="#" className="text-black text-lg hover:text-[#4FAD5B] mr-5">Profil</Link>
                </div>

                {/* Tombol Lihat Harga (Desktop) */}
                <div className="hidden lg:block ml-8">
                    <Button text="Lihat Harga" variant="filled" color="green" />
                </div>

                {/* Button Menu untuk Mobile */}
                <button 
                    className="lg:hidden text-black text-3xl" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <IoMenu />
                </button>
            </div>

            {/* Dropdown Menu untuk Mobile */}
            {isOpen && (
                <div className="lg:hidden w-full bg-white shadow-md absolute top-20 left-0 right-0 z-50 p-4">
                    <Link href="#" className="block py-2 text-black hover:text-[#4FAD5B]">Beranda</Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-full text-left py-2 text-black hover:text-[#4FAD58]">Fitur Kami</DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                            <DropdownMenuItem><Link href="#">Informasi Harga</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="#">Visualisasi Grafis</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="#">Simulasi Belanja</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="#" className="block py-2 text-black hover:text-[#4FAD5B]">Profil</Link>
                    <div className="mt-4">
                        <Button text="Lihat Harga" variant="filled" color="green" className="w-full" />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
