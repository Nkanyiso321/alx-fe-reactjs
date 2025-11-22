import { useState } from "react";
import fetchUserData from "../services/githubService";

export default function Search() {
    const [ searchValue, setSearchValue ] = useState('')
    const [ userData, setUserData ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState(false);
    const [location, setLocation] = useState("");
    const [minRepos, setMinRepos] = useState("");

    const handleChange = (e) => setSearchValue(e.target.value)
    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true);
        setError(false);
        setUserData(null);

        try {
            const result = await fetchUserData(searchValue, location, minRepos);
            console.log(result)
            setUserData(result);
        } 
        catch (err) {
            setError(true);
        } 
        finally {
            setLoading(false);
        }
    }

    return (
        <>
        <h2>GitHub User Search</h2>

        <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="flex flex-col">
                <label htmlFor="username" className="text-gray-700 font-medium mb-1">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="Enter GitHub username..."
                    required
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Location */}
            <div className="flex flex-col">
                <label htmlFor="location" className="text-gray-700 font-medium mb-1">
                    Location (optional)
                </label>
                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco"
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Minimum Repos */}
            <div className="flex flex-col">
                <label htmlFor="minRepos" className="text-gray-700 font-medium mb-1">
                    Minimum Repositories (optional)
                </label>
                <input
                    id="minRepos"
                    type="number"
                    min="0"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    placeholder="e.g. 10"
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
        </form>

        {/* CONDITIONAL RENDERING */}
        {loading && <p>Loading...</p>}

        {error && <p>Looks like we cant find the user.</p>}

        {userData && (
            <div style={{ marginTop: "1rem" }}>
            <h3>{userData.name}</h3>
            <img src={userData.avatar_url} alt="avatar" width="120" />
            <p><strong>Username:</strong> {userData.login}</p>
            <p><strong>Followers:</strong> {userData.followers}</p>
            <p><strong>Public Repos:</strong> {userData.public_repos}</p>
            <p><strong>Number of Repos:</strong> {userData.repos}</p>
            </div>
        )}
        </>

    )
}