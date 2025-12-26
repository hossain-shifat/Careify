import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
    title: "Careify - Trusted Care Services",
    description: "Find reliable and trusted care services for children, elderly, and family members",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </AuthProvider>
            </body>
        </html>
    );
}
