import Borther from "./borther.jsx";
import Community from "./community.jsx";
import Event from "./event.jsx";
import Footer from "./footer.jsx";
import Heard from "./heard.jsx";


export default class CapIndex extends React.Component{
    render() {
        return(
            <div>
                <Heard></Heard>
                <h1>CptIndex - CptIndex - CptIndex</h1>
                {/* <Event></Event> */}
                <div>
                    {/* <Community></Community> */}
                    <Borther></Borther>
                </div>
                <Footer></Footer>
            </div>
        )   
            
            
    }
}