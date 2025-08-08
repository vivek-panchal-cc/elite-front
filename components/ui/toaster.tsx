import { Toaster } from "sonner";

const ToasterComponent = () => {
  return (
    <Toaster
      position="top-right"
      duration={3000}
      toastOptions={{
        classNames: {
          error: "bg-red-400",
          success: "text-green-400",
          warning: "text-yellow-400",
          info: "bg-blue-400",
        },
      }}
      richColors
    />
  );
};

export default ToasterComponent;
