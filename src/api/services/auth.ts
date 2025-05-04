import Cookies from "js-cookie";
import axiosInstance from "../config"
import { jwtDecode } from 'jwt-decode';
import { toast } from "sonner";


export interface User {
  NAME: string
  CPF: string
  LOGIN: string
  PASSWORD: string
  EMAIL: string
  AGENCY: number
  TYPE: number
  ID_SUPERVISOR: string
}

export interface LoginUser {
  login: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
    department: string
    avatar?: string
  }
  token: string
  refreshToken?: string
}


export async function Register(data: User) {
  try {
    const response = await axiosInstance.post('/create_user', data)

    if (response.data.SUCCESS) {
      toast.success("Usuário cadastrado com sucesso!")
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 422 && Array.isArray(data.detail)) {
        const missingFields = data.detail.map((item: any) => item.loc.at(-1)).join(', ');
        toast.error(missingFields);
      }
    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Error:', error.message)
    }
  }
}


export async function Login(
  navigate,
  data: LoginUser,
) {
  try {
    const response = await axiosInstance.post('/login_user', data);
    
    if (response && response.data && response.data.Authorization) {
      const { Authorization } = response.data;
      const decode = jwtDecode(Authorization);
      Cookies.set('auth', Authorization);
      
      navigate("/dashboard");
      toast.success("Login feito com sucesso!")
    } else {
      console.error("Login failed: No Authorization token returned.");
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Server error:', error.response.data);
      toast.error('Erro ao tentar fazer login. Verifique suas credenciais e tente novamente.');
    } else if (error.request) {
      console.error('Network error:', error.request);
      toast.error('Erro de rede. Tente novamente mais tarde.');
    } else {
      console.error('Unexpected error:', error.message);
      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
    }
  }
}


