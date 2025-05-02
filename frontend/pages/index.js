import Login from "../components/Login";
import Home from "../components/Home";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  if (user.token) {
    router.push("/home");
  } else {
    return <Login />;
  }
}

export default Index;
