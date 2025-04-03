import BlindBox from "./Blind-box/BlindBox"
import Ticket from "./Ticket/Ticket"
export default function Shop(){
    return(
        <div className="Shop">
            <BlindBox/>
            <Ticket/>
        </div>
    )
}