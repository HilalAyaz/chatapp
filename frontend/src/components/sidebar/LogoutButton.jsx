import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className=" mt-auto">
      {!loading ? (
        <BiLogOut
          className=" w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-dots loading-2xl"></span>
      )}
    </div>
  );
};

export default LogoutButton;
