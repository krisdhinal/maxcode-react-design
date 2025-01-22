import React from "react";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

function RenderBarcode(props) {
  const { value, type, settings } = props;
  if(!value || value.length === 0){
	return <></>
  }
  return (
    <>
      {type === "QR" ? (
        <div className="bg-white p-2">
          <QRCode value={value} size={settings?.barcodeHeight} />
        </div>
      ) : (
        <Barcode
          value={value}
          displayValue={settings.showCode}
          height={settings?.barcodeHeight}
          width={settings?.barcodeWidth}
          fontSize={settings?.fontSize}
          format={type}
        />
      )}
    </>
  );
}

export default RenderBarcode;
