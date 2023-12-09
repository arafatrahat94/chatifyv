import Image from "next/image";
import logo from "@/Assets/Chatify.png";
const TopBar = () => {
  return (
    <div className="sticky top-[-1px] z-10">
      <div className="bg-purpleLightC h-[70px] flex justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          placeholder="blur"
          width={80}
          height={100}
        ></Image>
      </div>
    </div>
  );
};

export default TopBar;
