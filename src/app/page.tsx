import {Header} from "./components/header";
import { About } from "./components/about";
import { Skillset } from "./components/skillset";
import { Projects } from "./components/projects";
import { Blogs } from "./components/blogs";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div>
      <Header />

      <About  />
      <Skillset />
      <Projects />
      <Blogs />
      <Contact />
      <Footer />

    </div>
  );
}
