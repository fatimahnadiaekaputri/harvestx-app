import Image from "next/image";

type LoaderProps = {
    message?: string;
    subMessage?: string;
}

export default function Loader({message="Loading...", subMessage=""}: LoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full py-10 animate-fade-in">
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-4 border-green-400 
                                border-t-transparent animate-spin transition-colors duration-500 ease-in-out 
                                border-gradient-to-r from-gray-300 to-green-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image src="Logo.svg" alt="Logo" width={100} height={100} />
                </div>
            </div>
            <p className="mt-6 text-xl font-semibold text-gray-800 text-center">{message}</p>
            {subMessage && <p className="mt-2 text-sm text-gray-500 text-center">{subMessage}</p>}
        </div>
    );
}