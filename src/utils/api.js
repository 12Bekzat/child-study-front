import { useMainStore } from "@/stores/mainStore"
import { storeToRefs } from "pinia"

export const useApi = () => {
    const baseApi = 'http://localhost:5002/api'

    const store = useMainStore()
    const { currentUser } = storeToRefs(store)

    const getUrl = (service, methodName = '') => {
        return `${baseApi}/${service}/${methodName}`
    }

    const post = async (service, method = '', params = {}, isAuth = false) => {
        const urlParams = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }
        if (isAuth && currentUser.value?.token) urlParams.headers['Authorization'] = `Bearer ${currentUser.value?.token}`
        const response = await fetch(getUrl(service, method), urlParams)

        const answer = await response.json()
        console.log(answer);
        return answer
    }

    return { post, getUrl }
}