import axios from "axios";
import { Env } from "../env";

export const api = axios.create({
  baseURL: Env.API_URL,
});
