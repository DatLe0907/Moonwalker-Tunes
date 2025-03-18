import "./Info.css"
import "./Info-responsive.css"
import mjInfo from "../../assets/photo/biography/mj-info.jpg"
import mjPopular from "../../assets/photo/biography/mj-global-heat-map.png"
const InfoStyle = {
    width: "400px",  // Đặt chiều rộng cụ thể
    height: "550px",  // Đặt chiều cao cụ thể để div không bị mất
    backgroundImage: `url(${mjInfo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#ddd", // Màu nền khi ảnh không tải được
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
};

const PopularStyle = {
    width: "540px",
    height: "300px",
    backgroundImage: `url(${mjPopular})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#eee",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
};
function Info(){
    return(
        <div className="Info">
            <h1 className="title Info-heading">Biography</h1>
            <div className="Info-box">
                <div className="mj-info img" style = {InfoStyle} alt="" />
                <div className = "Info-content">
                <p>Michael Joseph Jackson (August 29, 1958 – June 25, 2009) was an American singer, songwriter, dancer, and philanthropist. Dubbed the "King of Pop", he is regarded as one of the most significant figures of the 20th century. Over a four-decade career, his world record music achievements broke racial barriers in America and his publicized personal life made him a global figure. Through songs, stages, and fashion, he proliferated visual performance for singers in pop music; popularizing street dance moves including the moonwalk (which he named), the robot, and the anti-gravity lean. Guinness World Records named him the most successful entertainer of all-time.</p>
                <div className="mj-popular img" style={PopularStyle} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Info