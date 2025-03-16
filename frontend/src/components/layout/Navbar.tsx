import Image from "next/image"
import Link from "next/link"
import Button from "../ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";


const Navbar = () => {
    return (
        <nav className="bg-white shadow-md px-4 sm:px-6 lg-px-8 border-b-1 border-gray-300">          
                <div className="flex justify-between items-center h-20 mx-16">
                    <div className="flex items-center">
                       <Link href="#">
                       <Image src="/Logo.svg" alt="HarvestX Logo" width={120} height={40}></Image>
                       </Link>
                    </div>
                    <div className="hidden md:flex flex-grow space-x-24 justify-end">
                        <Link href="#" className="text-black hover:text-[#4FAD5B]">Beranda</Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-black hover:text-[#4FAD58] data-[state=open]:text-[#4FAD58]">Fitur Kami</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="text-black hover:text-[#4FAD58]">Informasi Harga</DropdownMenuItem>
                                <DropdownMenuItem className="text-black hover:text-[#4FAD58]">Visualisasi Grafis</DropdownMenuItem>
                                <DropdownMenuItem className="text-black hover:text-[#4FAD58]">Simulasi Belanja</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href="#" className="text-black hover:text-[#4FAD5B]">Profil</Link>
                    </div>
                    <div className="ml-36">
                        <Button text="Lihat Harga" variant="filled" color="green"></Button>
                    </div>
                </div>
        </nav>
    )
};

export default Navbar;