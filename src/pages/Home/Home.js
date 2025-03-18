import Slider from "./Slider";
import Info from "./Info";
import DanceMoves from "./DanceMove";
import Achievement from "./Achievement";
import Event from "./Event";

function Home() {
        const script1 = document.createElement("script");
        script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "https://files.bpcontent.cloud/2025/03/03/14/20250303143157-DX7NWTHH.js";
        script2.async = true;
        document.body.appendChild(script2);

    return (
        <div className="body">
            <Slider />
            <Info />
            <Achievement />
            <Event />
            <DanceMoves />
        </div>
    );
}

export default Home;  