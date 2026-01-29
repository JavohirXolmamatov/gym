import { Loader } from "lucide-react";

const FillLoading = () => {
  return (
    <div className="w-full h-full inset-0 absolute bg-black/80  ">
      <div className="w-full h-full inset-0 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    </div>
  );
};

export default FillLoading;
