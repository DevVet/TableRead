import { LandingPage } from "@/components/LandingPage";
import { NextPage } from "next";

const IndexPage: NextPage = async () => {
  // This is fetched on the server and passes the data to the client component
  let greeting = "FetchFailed";
  try {
    const data = await fetch("http://localhost:3000/api/hello");
    const parsed = await data.json();
    greeting = parsed.name;
  } catch (e) {
    console.error(e);
  }
  return <LandingPage nameFromSSR={greeting} />;
};

export default IndexPage;
