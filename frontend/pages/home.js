import Login from "../components/Login";
import Home from "../components/Home";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  if (user.token) {
    return <Home />;
  } else {
    router.push("/");
  }
}

export default HomePage;
