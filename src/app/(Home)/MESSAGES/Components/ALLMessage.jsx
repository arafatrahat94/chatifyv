import Dynamicimage from "@/Utilities/DynamicImage";

const ALLMessage = () => {
  return (
    <div>
      <div className="mx-[17px] bg-secondaryBgLight dark:bg-secondaryBgDark flex justify-between items-center p-3 rounded-3xl">
        <div className="flex items-center gap-x-2">
          <Dynamicimage
            src={"https://i.ibb.co/Pczr02Y/20231119-120920646.jpg"}
            width={500}
            height={500}
            rounded={"rounded-[1rem] w-[54px] h-[54px]"}
          ></Dynamicimage>
          <div>
            <h1 className="font-bold dark:text-purpleLightC text-purpleC">
              Person name
            </h1>
            <h1 className="text-sm"> Message</h1>
          </div>
        </div>
        <h1 className="me-2 dark:text-purpleLightC text-purpleC">1 Min Ago</h1>
      </div>
    </div>
  );
};

export default ALLMessage;
