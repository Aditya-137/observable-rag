import Upload from "@/components/common/Upload";
import Documents from "@/components/common/Documents";

export default function LeftPanel(){
    return <div className="bg-blue-900 h-full max-w-75">
        <Documents />
        <Upload />
    </div>
}