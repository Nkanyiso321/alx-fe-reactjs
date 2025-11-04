import { useContext } from "react"
import { UserContext } from './UserContext.js'

import UserInfo from './UserInfo.jsx';


function ProfilePage() {
  return <UserInfo />;
}

export default ProfilePage;