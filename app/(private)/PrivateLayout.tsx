import Breadcrumb from "@/components/ui/Breadrumb";
import { useAuthContext } from "@/lib/AuthProvider";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        {/* <Breadcrumb /> */}
        <div className="flex-1 space-y-4 py-6">{children}</div>
      </div>
    </div>
  );
};

export default PrivateLayout;
