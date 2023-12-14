import { Toaster } from "react-hot-toast";

const CustomToast = () => {
  return (
    <div>
      <Toaster
        toastOptions={{
          className: "bg-toast",
        }}
        position="bottom-center"
      />
    </div>
  );
};

export default CustomToast;
