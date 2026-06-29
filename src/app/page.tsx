import Documents from "./Documents";
import Search from "./Search";
import Upload from "./Upload";

export default function Home() {
  return (
    <div>
      Home Page
      <Upload />
      <Documents />
      <Search />
    </div>
  );
}
