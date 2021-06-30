import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../utils/constants";

export async function setTokenApi(token) {
  try {
    await AsyncStorage.setItem(TOKEN, token);
    return true;
  } catch (error) {
    return null;
    // console.log(error);
  }
}

export async function getTokenApi() {
  try {
    const token = await AsyncStorage.getItem(TOKEN, token)
    return true;
  } catch (error) {
    return null;
  }
}

