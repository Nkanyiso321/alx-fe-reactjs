import { Link } from "react-router-dom";

function NavBar() {
    return (
        <>
            <Link to={'/'} style={{ backgroundColor: 'navy', color: 'white', textAlign: 'center'}}>
                <p>Home</p>
            </Link>
            <Link to={'/about'} style={{ backgroundColor: 'navy', color: 'white', textAlign: 'center'}}>
                <p>About</p>
            </Link>
            <Link to={'/services'} style={{ backgroundColor: 'navy', color: 'white', textAlign: 'center'}}>
                <p>Services</p>
            </Link>
            <Link to={'/contact'} style={{ backgroundColor: 'navy', color: 'white', textAlign: 'center'}}>
                <p>Contact</p>
            </Link>
        </>
    )
}

export default NavBar