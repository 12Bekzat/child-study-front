import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import { useApiFetch } from "./apiFetch";

export const useQueries = () => {
  const mainStore = useMainStore();
  const { currentUser } = storeToRefs(mainStore);

  const getPaged = async ({ serviceName }) => {
    const { get } = useApiFetch();

    return await get(`/${serviceName}/getPaged`);
  };

  const getById = async ({ id, serviceName }) => {
    const { get } = useApiFetch();

    return await get(`/${serviceName}/getById/${id}`);
  };

  const update = async ({ item, serviceName }) => {
    const { post } = useApiFetch();

    return await post(`/${serviceName}/update`, item);
  };

  const create = async ({ item, serviceName }) => {
    const { post } = useApiFetch();

    return await post(`/${serviceName}/create`, item);
  };

  const remove = async ({ id, serviceName }) => {
    const { get } = useApiFetch();

    return await get(`/${serviceName}/remove/${id}`);
  };

  const login = async (username, password) => {
    const { any } = useApiFetch();

    const response = await any("/login", { username, password });
    if (!response?.token) {
      console.log("Error in login when login syystem");

      return false;
    }
    localStorage.setItem("jwt_token", response?.token);
    return true;
  };

  const getMe = async () => {
    const { get } = useApiFetch();

    const response = await get("/users/me");
    currentUser.value = response;
  };

  return {
    getPaged,
    getById,
    update,
    create,
    remove,
    login,
    getMe
  };
};
