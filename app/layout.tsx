import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Poppins } from "next/font/google";
import { Toaster } from 'sonner';


const bebasNeue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-bebas-neue",
    display: "swap",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
    display: "swap",
});



export const metadata: Metadata = {
    title: "GYM Stranger Club",
    description: "El mejor GYM de Cañete",
    icons: {
        icon: "/logo.jpg",
        apple: "/logo.jpg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${bebasNeue.className} ${poppins.className} bg-black`}
                
            >
                {children}
                <Toaster 
                    position="top-center"
                    theme="dark"
                />
            </body>
        </html>
    );
}
