import ALL from "@/Components/HOMEPAGE/ALL";
import POST from "@/Components/HOMEPAGE/POST";
import STORY from "@/Components/HOMEPAGE/STORY";
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
  title: "Home | Chatify",
  description: "An Social Media Web Application",
};
export default function Home() {
  return (
    <main className="px-4 ">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-[300px]">
            <div class="loader23">
              <span>CHATIFY</span>
              <span>CHATIFY</span>
            </div>
          </div>
        }
      >
        <STORY></STORY>
      </Suspense>
      <POST></POST>
      <ALL></ALL>
    </main>
  );
}
