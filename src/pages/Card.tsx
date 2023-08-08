import IFrame from "components/create_iframe";
import config from "config"; 

export default function Card() {
    if (config.BUSINESS_CARD_URL) {
        return <IFrame url={config.BUSINESS_CARD_URL} />;        
    } 
    return <p>URL not found!</p>
}
