import Upload from "./Upload";
import Documents from "./Documents";

export default function LeftPanel(){
    return <div className="bg-blue-900 h-full max-w-75">
        <Documents />
        <Upload />
    </div>
}