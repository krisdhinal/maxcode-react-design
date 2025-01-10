import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { formatRupiah } from "../utils/FormattedPrice";
import moment from "moment";

const BarcodePreview = ({ code, settings, product }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && code) {
      try {
        JsBarcode(svgRef.current, code, {
          format: settings?.barcodeType || "CODE128",
          width: settings.barcodeWidth || 2,
          height: settings.barcodeHeight || 100,
          displayValue: true,
          textAlign: "center",
          fontSize: settings.fontSize || 12,
          margin: parseInt(settings.margin) || 10,
        });
        JsBarcode("#barcode", code, {
          format: settings?.barcodeType || "CODE128",
          width: settings.barcodeWidth || 2,
          height: settings.barcodeHeight || 100,
          displayValue: true,
          textAlign: "center",
          fontSize: settings.fontSize || 12,
          margin: parseInt(settings.margin) || 10,
        });
      } catch (err) {
        console.error("Failed to generate barcode:", err);
      }
    }
  }, [code, settings]);
  const printStyles = {
    fontSize: `${settings?.fontSize}px`,
    marginTop: `${settings?.marginTop}px`,
    marginBottom: `${settings?.marginBottom}px`,
    marginLeft: `${settings?.marginLeft}px`,
    marginRight: `${settings?.marginRight}px`,
  };
  const handlePrint = () => {
    setTimeout(() => {
      const element = document.getElementById("print-area");
      if (!element) {
        console.error(`Element with  not found.`);
        return;
      }
      document.body.style.height = `${settings?.pageHeight}cm !important`;
      document.body.style.width = `${settings?.pageWidth}cm !important`;
      element.style.visibility = "visible";
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = element.outerHTML;

      setTimeout(() => {
        window.print();
        document.body.innerHTML = originalContent;

        window.location.reload();
      }, 1000);
    }, 500);
  };

  return (
    <div className="py-4 my-4 border-y border-y-dashed border-y-gray">
      <h2 className="text-lg font-semibold">Barcode Preview</h2>
      {code ? <svg id="barcode"></svg> : null}
      {code && product ? (
        <div>
          <div
            id="print-area"
            style={{ ...printStyles, height: 1, visibility: "hidden" }}
          >
            {settings.showName && (
              <h2 className="text-xl">{product?.itemName}</h2>
            )}
            {settings.showPrice && (
              <p
                style={{
                  fontSize: `${settings.fontPrice}px`,
                }}
              >
                {formatRupiah(product?.itemPrice)}
              </p>
            )}
            {settings.showCode && <p>{product?.itemBarcode}</p>}
            {settings.showDate && (
              <p>{settings.showDate && moment().format("DD MMM YYYY")}</p>
            )}
            <svg ref={svgRef} className="mt-4" />
          </div>
          <button
            onClick={handlePrint}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Print
          </button>
        </div>
      ) : (
        <div>
          <p className="text-red-500">Barcode Not Found!</p>
          <button className="my-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Generate Barcode
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcodePreview;
