import LeftPanel from "@/components/panels/LeftPanel";
import MiddlePannel from "@/components/panels/MiddlePannel";
import RightPannel from "@/components/panels/RightPannel";

export default function Home() {
  return (
    <div className="flex h-screen w-screen overflow-y-hidden overflow-x-scroll">
      <LeftPanel />
      <MiddlePannel />
      <RightPannel />
    </div>
  );
}
