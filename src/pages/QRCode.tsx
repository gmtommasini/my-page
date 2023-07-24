import IFrame from "components/create_iframe";
// import config from "config/config";
import config from "config"; 

export default function QRCode() {
    // return <IFrame url='https://gmtommasini.pythonanywhere.com/qrcode' />;
    if (config.QR_CODE_URL) {
        return <IFrame url={config.QR_CODE_URL!} />;        
    } 
    return <p>URL not found!</p>
}
