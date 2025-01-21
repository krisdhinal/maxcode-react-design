/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Accordion from "./Accordion";
import ItemPrintReceive from "./ItemPrintReceive";
import { toast } from "react-toastify";
import { postItems } from "../services/api";

function PrintReceive(props) {
  const { settings, handleChange, data } = props;
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [isLoading, setIsLoading] = useState(false);

  const printStyles = {
    fontSize: `${settings?.fontSize}px`,
    marginTop: `${settings?.marginTop}mm`,
    marginBottom: `${settings?.marginBottom}mm`,
    marginLeft: `${settings?.marginLeft}mm`,
    marginRight: `${settings?.marginRight}mm`,
    height: `${settings?.pageHeight - 0.5}cm`,
    width: `${settings?.pageWidth - 0.5}cm`,
  };
  const ref = useRef(null);
  const pageStyle = `
  @media print {
		@page {
         size: ${settings?.pageWidth}cm ${settings?.pageHeight}cm;
         margin: 0px !important;
        }

		.print-container{
          border: none !important;    
		}
	}
`;
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const productData = await postItems(data);
      if (productData?.data) {
        toast.success("Data item berhasil disimpan!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reactToPrintFn();
      } else {
        toast.error("Data not found", { position: "top-right" });
      }
    } catch (err) {
      toast.error(err.message || "Data not found", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion
      title="Print Preview"
      defaultOpen
      content={
        <div ref={ref}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Display Setting</p>
              {Object.entries({
                showDisplay: "Show Data Display",
                showNameDisplay: "Show Name Display",
                showPriceDisplay: "Show Price Display",
                showCodeDisplay: "Show Code Display",
                showDateDisplay: "Show Date Display",
              }).map(([key, label]) => (
                <>
                  {(key !== "showDisplay" && settings?.showDisplay) ||
                  key === "showDisplay" ? (
                    <div key={key}>
                      <label>
                        <input
                          type="checkbox"
                          name={key}
                          checked={settings[key]}
                          onChange={handleChange}
                        />
                        <span className="ml-2 font-[500]">{label}</span>
                      </label>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Barcode Attributes</p>
              {Object.entries({
                showName: "Show Name",
                showPrice: "Show Price",
                showCode: "Show Code",
                showDate: "Show Date",
                showBarcode: "Show Barcode",
              }).map(([key, label]) => (
                <div key={key}>
                  <label>
                    <input
                      type="checkbox"
                      name={key}
                      checked={settings[key]}
                      onChange={handleChange}
                    />
                    <span className="ml-2 font-[500]">{label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              disabled={isLoading}
              onClick={onSubmit}
              className={`px-4 py-2 rounded ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loader-clock"></span>
                  Loading...
                </div>
              ) : (
                "Submit"
              )}
            </button>
            <button
              disabled={isLoading}
              onClick={() => reactToPrintFn()}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Print
            </button>
          </div>
          <br />
          <div
            style={{ maxWidth: ref.current ? ref.current.offsetWidth : "100%" }}
          >
            <div ref={contentRef} className="parent-container">
              <style>{pageStyle}</style>

              {data?.map((item, index) => (
                <ItemPrintReceive
                  key={index}
                  data={item}
                  index={index}
                  settings={settings}
                  printStyles={printStyles}
                />
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}

export default PrintReceive;
