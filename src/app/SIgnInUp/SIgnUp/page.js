import Back from "@/Utilities/Back";
import ImageComponent from "./Components/Image";
import FormComponent from "./Components/Form";

const SignUpPage = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Back></Back>
      <div className="grid grid-cols-2 h-[872px]">
        <div className="bg-blue-400">
          <ImageComponent></ImageComponent>
        </div>
        <div className="">
          <FormComponent></FormComponent>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
