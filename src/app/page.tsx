import LeftPanel from "./LeftPanel";
import MiddlePannel from "./MiddlePannel";
import RightPannel from "./RightPannel";

export default function Home() {
  return (
    <div className="flex h-screen w-screen overflow-y-hidden overflow-x-scroll">
      <LeftPanel />
      <MiddlePannel />
      <RightPannel />
    </div>
  );
}
