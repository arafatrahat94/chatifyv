import signInbanner from "@/Assets/signupin.png";
import Image from "next/image";

const ImageComponent = () => {
  return (
    <div>
      <div className="md:dark:bg-secondaryBgDark  md:min-h-screen lg:dark:bg-primaryBgDark flex items-center pt-10 md:p-16 lg:p-24 justify-center">
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
