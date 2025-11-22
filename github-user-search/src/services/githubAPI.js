import axios from "axios";


async function fetch_data_from_github(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
            }
        })

        return response.data
    } 
    catch (error) {
        console.error(error)
    }
}