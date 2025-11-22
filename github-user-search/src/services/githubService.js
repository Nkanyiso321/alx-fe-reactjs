export default async function fetchUserData(username, location, minRepos) {

    let query = ""
    if (username) query += `${username} `;
    if (location) query += `location:${location} `;
    if (minRepos !== undefined && minRepos !== "") {
      query += `repos:>${minRepos}`;
    }

    query = encodeURIComponent(query)

    try {
        const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
            }
        })

        return response.data.items;
    } 
    catch (error) {
        console.error("GitHub Search Error:", error);
        throw error
    }
}