import Home from "../../components/Home";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  if (user.token) {
    return <Home hashtag={router.query.slug} />;
  } else {
    router.push("/");
  }
}
