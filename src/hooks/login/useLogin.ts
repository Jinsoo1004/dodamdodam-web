import { sha512 } from "js-sha512";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import authRepository from "../../repository/auth/auth.repository";
import { profileAtom } from "../../store/profile/profileStore";
import { Login } from "../../types/login/login.type";
import token from "../../lib/token/token";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "../../constants/token/token.constant";

const useLogin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<Login>({
    id: "",
    pw: "",
  });
  const [loginKeep, setLoginKeep] = useState<boolean>(false);

  const [profileData, setProfileData] = useRecoilState(profileAtom);

  const handleLoginKeep = () => setLoginKeep((prev) => !prev);
  const handleLoginData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value, name } = e.target;
      setLoginData((prev) => ({ ...prev, [name]: value }));
    },
    [setLoginData]
  );

  const submitLoginData = useCallback(async () => {
    const { id, pw } = loginData;

    const validLoginData: Login = {
      id,
      pw: sha512(pw),
    };

    try {
      const { data } = await authRepository.login(validLoginData);

      const { token: accessToken, refreshToken } = data;

      token.setToken(ACCESS_TOKEN_KEY, accessToken);
      token.setToken(REFRESH_TOKEN_KEY, refreshToken);

      window.alert("로그인 성공");
      navigate("/");
      setProfileData(data);
    } catch (error) {
      window.alert("로그인 실패");
    }
  }, [loginData, navigate, setProfileData]);

  return {
    loginData,
    handleLoginData,
    loginKeep,
    handleLoginKeep,
    submitLoginData,
  };
};

export default useLogin;