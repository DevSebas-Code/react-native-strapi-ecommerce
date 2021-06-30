import Toast from "react-native-root-toast";
import { API_URL } from "../utils/constants";

export async function registerApi(formData) {
  try {
    //Endpoint de Strapi para el registro
    const url = `${API_URL}/auth/local/register`;
    console.log(API_URL);
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function loginApi(formData) {
  try {
    const url = `${API_URL}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    Toast.show("Error al ingresar", {
      position: Toast.positions.CENTER,
    });
    console.log(error);
    return;
  }
}
