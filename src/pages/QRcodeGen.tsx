export default function QRcode_page() {
// https://gmtommasini.pythonanywhere.com/qrcode

    return (
        <div className="iframe-container">
            <iframe
            title="External Page"
            src="https://gmtommasini.pythonanywhere.com/qrcode"
            width="100%"
            height="100%"
            />
        </div>
      );

}

