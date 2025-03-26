import {Header} from "./components/header";
import { About } from "./components/about";
import { Skillset } from "./components/skillset";

export default function Home() {
  return (
    <div className="">
      <Header />

      <About  />
      <Skillset />
    </div>
  );
}
