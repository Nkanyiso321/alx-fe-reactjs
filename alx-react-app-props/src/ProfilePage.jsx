import { useContext } from "react"
import { UserContext } from './components/UserContext.js'

import UserInfo from './components/UserInfo.jsx';

// ["useContext", "UserContext", "react"] <--- Where is this one coming from

function ProfilePage() {
  return <UserInfo />;
}

export default ProfilePage;