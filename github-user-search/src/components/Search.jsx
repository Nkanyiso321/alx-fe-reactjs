import { useState } from "react";
import fetchUserData from "../services/githubService";

export default function Search() {
    const [ searchValue, setSearchValue ] = useState('')
    const [ userData, setUserData ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState(false);

    const handleChange = (e) => setSearchValue(e.target.value)
    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true);
        setError(false);
        setUserData(null);

        try {
            const result = await fetchUserData(searchValue);
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
            <input 
            value={searchValue} 
            type="text" 
            onChange={handleChange} 
            placeholder="Enter GitHub username..."
            />
            <br /><br/>
            <button>Search</button>
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
            </div>
        )}
        </>

    )
}