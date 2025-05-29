"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/CustomButton";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { IoMenu, IoChevronDown, IoChevronUp } from "react-icons/io5"; // Gunakan icon menu
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fiturIsOpen, fiturSetIsOpen] = useState({menu:false, fitur:false});
    const router = useRouter();
    const toInformation = () => {
        router.push("/informasi");
    }

    return (
        <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-8 border-b border-gray-300">
            <div className="flex justify-between items-center h-20 mx-4 md:mx-16">
                {/* Logo */}
                <Link href="/">
                    <Image src="/Logo.svg" alt="HarvestX Logo" width={132} height={44} />
                </Link>

                {/* Menu Desktop */}
                <div className="hidden lg:flex flex-grow space-x-20 justify-end">
                    <Link href="/" className="text-black text-lg font-semibold hover:text-[#4FAD5B]">Beranda</Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-black text-lg font-semibold hover:text-[#4FAD58]">Fitur Kami</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><Link href="/informasi">Informasi Harga</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/grafik">Visualisasi Grafis</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/simulasi">Simulasi Belanja</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="#" className="text-black text-lg hover:text-[#4FAD5B] mr-5 font-semibold">Profil</Link>
                </div>

                {/* Tombol Lihat Harga (Desktop) */}
                <div className="hidden lg:block ml-8">
                    <Button text="Lihat Harga" variant="filled" color="green" onClick={toInformation}/>
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
                    <Link href="/" className="block py-2 text-black hover:text-[#4FAD5B] font-semibold">Beranda</Link>
                    <div>
                        <button className="w-full text-left py-2 text-black hover:text-[#4FAD58] font-semibold flex items-center gap-2"
                                onClick={() => fiturSetIsOpen(prev => ({...prev, fitur: !prev.fitur}))}>
                                <span>Fitur Kami</span>
                                {fiturIsOpen.fitur ? <IoChevronUp className="text-xl" /> : <IoChevronDown className="text-xl" />}
                        </button>
                        {fiturIsOpen.fitur && (
                            <div className="pl-4 mt-2 space-y-2">
                                <Link href="/informasi" className="block text-black hover:text-[#4FAD5B]">Informasi Harga</Link>
                                <Link href="/grafik" className="block text-black hover:text-[#4FAD5B]">Visualisasi Grafis</Link>
                                <Link href="/simulasi" className="block text-black hover:text-[#4FAD5B]">Simulasi Belanja</Link>
                            </div>
                        )}
                    </div>
                    <Link href="#" className="block py-2 text-black hover:text-[#4FAD5B] font-semibold">Profil</Link>
                    <div className="mt-4">
                        <Button text="Lihat Harga" variant="filled" color="green" className="w-full" onClick={toInformation}/>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
