import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

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
                </AuthProvider>
            </body>
        </html>
    );
}
