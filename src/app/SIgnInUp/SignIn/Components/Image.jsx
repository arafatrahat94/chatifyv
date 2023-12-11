import signInbanner from "@/Assets/signupin.png";
import Image from "next/image";

const ImageComponent = () => {
  return (
    <div className="dark:bg-primaryBgDark bg-white">
      <div className="md:dark:bg-secondaryBgDark bg-white lg:dark:bg-primaryBgDark dark:bg-primaryBgDark  md:min-h-screen flex items-center pt-14 md:p-16 lg:p-24 justify-center">
        <Image
          src={signInbanner}
          alt="banner"
          width={500}
          height={500}
          className="md:w-full w-[150px]"
          placeholder="blur"
        ></Image>
      </div>
    </div>
  );
};

export default ImageComponent;
