import { parseJwt } from "./AuthVerify";
import { logout } from "../slices/Auth";
import TokenService from "../services/TokenService";
import { refreshToken } from "../slices/Auth";
import axiosInstance from "../services/Api";

export const checkTokenExpiration = async (accessToken, dispatch) => {
  const decodedJwt = parseJwt(accessToken);
  const expirationTime = decodedJwt.exp * 1000;
  const currentTime = Date.now();

  const tokenThreshold = 1 * 60 * 1000;
  if (expirationTime - currentTime <= tokenThreshold) {
    try {
      const rs = await axiosInstance.post("/auth/refresh-token", {
        refreshToken: TokenService.getLocalRefreshToken(),
      });

      const { accessToken } = rs.data;

      dispatch(refreshToken(accessToken));
      TokenService.updateLocalAccessToken(accessToken);

      setTimeout(() => checkTokenExpiration(accessToken, dispatch), 1 * 60 * 1000);
    } catch (error) {
      
      dispatch(logout());
    }
  } else {
    setTimeout(() => checkTokenExpiration(accessToken, dispatch), 1* 60 * 1000);
  }
};