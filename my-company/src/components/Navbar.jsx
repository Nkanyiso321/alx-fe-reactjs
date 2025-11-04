import { Link } from "react-router-dom";

function NavBar() {
    return (
        <>
            <Link to={'/'}>
                <p>Home</p>
            </Link>
            <Link to={'/about'}>
                <p>About</p>
            </Link>
            <Link to={'/services'}>
                <p>Services</p>
            </Link>
            <Link to={'/contact'}>
                <p>Contact</p>
            </Link>
        </>
    )
}

export default NavBar