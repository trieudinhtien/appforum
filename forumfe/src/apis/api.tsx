import axios, {AxiosResponse} from 'axios';

interface User {
  username: string,
  email: string,
  password: string,
}

export function callApiRegister(data: User): Promise<any> {
    return axios({
      method: 'post',
      url: "http://localhost:3000/register",
      data: data,
    }).then((response: AxiosResponse<any>) => response.data)
}


