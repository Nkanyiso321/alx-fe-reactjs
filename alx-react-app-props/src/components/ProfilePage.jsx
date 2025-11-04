import { useContext } from "react"
import { UserContext } from './UserContext.js'

import UserInfo from './UserInfo';

// userContext <--- Where is this one coming from

function ProfilePage() {
  return <UserInfo />;
}

export default ProfilePage;