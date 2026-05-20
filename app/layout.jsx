import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SkillSphere — Online Learning Platform",
  description:
    "Upgrade your skills with expert-led courses in Web Development, Design, Marketing, and more. Learn at your own pace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="skillsphere">
      <body className="min-h-screen flex flex-col bg-base-100 font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid #334155",
              fontFamily: "'DM Sans', sans-serif",
            },
            success: {
              iconTheme: { primary: "#f97316", secondary: "#0f172a" },
            },
          }}
        />
      </body>
    </html>
  );
}
