"use server";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
const Dynamicimage = async ({ src, width, height, rounded }) => {
  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);
  return (
    <Image
      src={src}
      placeholder="blur"
      blurDataURL={base64}
      alt="image"
      draggable={false}
      width={width}
      height={height}
      loading="lazy"
      sizes="(100vw, 100vh)"
      className={` ${rounded}  `}
    ></Image>
  );
};

export default Dynamicimage;
