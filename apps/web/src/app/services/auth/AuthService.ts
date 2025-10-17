import type { ISigninInDTO } from "@/app/types/auth/signIn";
import type { ISignUpDTO } from "@/app/types/auth/signUp";
import { httpClient } from "../httpClient";


interface ISigninResponse {
  accessToken: string;
}

export class AuthService {
  static async signup({ email, password, name }: ISignUpDTO) {
    const { data } = await httpClient.post('/auth/register', {
      email,
      password,
      name,
    });

    return data;
  }

  static async signin({ email, password }: ISigninInDTO) {
    const { data } = await httpClient.post<ISigninResponse>('/auth/login', {
      email,
      password
    });

    return data;
  }
}
