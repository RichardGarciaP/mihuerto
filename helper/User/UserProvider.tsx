import { ReactNode, useEffect, useState } from "react";
import { initialUserState, UserContext } from "./index";
import { User } from "../../Types/Types";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getMe } from "../api/users";

interface contextType {
  children: ReactNode;
}
const UserProvider = ({ children }: contextType) => {
  const [user, setUser] = useState<User>(initialUserState);
  const router = useRouter();

  const login = (user: User, token: string) => {
    setUser(user);
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

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getMe().then((res) => {
        setUser(res?.data);
      });
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
