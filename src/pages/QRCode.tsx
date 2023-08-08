import IFrame from "components/create_iframe";
// import config from "config/config";
import config from "config"; 

export default function QRCode() {
    if (config.QR_CODE_URL) {
        return <IFrame url={config.QR_CODE_URL} />;
    } 
    return <p>URL not found!</p>
}
