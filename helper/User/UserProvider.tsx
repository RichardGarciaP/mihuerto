import { ReactNode, useState } from "react";
import { initialUserState, UserContext } from "./index";
import { User } from "../../Types/Types";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface contextType {
  children: ReactNode;
}
const UserProvider = ({ children }: contextType) => {
  const [user, setUser] = useState<User>(initialUserState);
  const router = useRouter();

  const login = (user: User, token: string) => {
    console.log("Llega aqui");
    console.log(user);
    if (user?.idRole.name === "creador" || user?.idRole.name === "admin") {
      setUser(user);
    }
    router.push("/");
  };

  const logout = () => {
    setUser({
      _id: "",
      username: "",
      password: "",
      idRole: {
        _id: "",
        name: "",
      },
    });

    router.push("/authentication/login");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
