import ALL from "@/Components/HOMEPAGE/ALL";
import POST from "@/Components/HOMEPAGE/POST";
import STORY from "@/Components/HOMEPAGE/STORY";
import Image from "next/image";
export const metadata = {
  title: "Home | Chatify",
  description: "An Social Media Web Application",
};
export default function Home() {
  return (
    <main className="px-4 ">
      <STORY></STORY>
      <POST></POST>
      <ALL></ALL>
    </main>
  );
}
