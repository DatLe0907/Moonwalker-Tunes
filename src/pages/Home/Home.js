import Slider from "./Slider";
import Info from "./Info";
import DanceMoves from "./DanceMove";
import Achievement from "./Achievement";
import Event from "./Event";

function Home() {
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