import { Link } from "react-router-dom";
import RecoilComponent from "./RecoilComponent";

const Main = () => {
  return (
    <div>
      <h1>main page</h1>
      <Link to={'/member'}>go to member list</Link>
      <RecoilComponent />
    </div>
  )
}

export default Main;