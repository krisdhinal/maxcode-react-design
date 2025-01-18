import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Accordion from "./Accordion";

const PrintSettings = ({ onSave, printSettings }) => {
  const [settings, setSettings] = useState(printSettings);

  useEffect(() => {
    setSettings(printSettings);
  }, [printSettings]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(settings);
    localStorage.setItem("printSettings", JSON.stringify(settings));
    toast.success("Setting printer berhasil disimpan!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Accordion
      title="Print Settings"
      content={
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <label className="w-1/2">Barcode Width Per Bar</label>
              <input
                type="number"
                name="barcodeWidth"
                value={settings.barcodeWidth}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/2">Barcode Height</label>
              <input
                type="number"
                name="barcodeHeight"
                value={settings.barcodeHeight}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/2">Page Width (cm)</label>
              <input
                type="number"
                name="pageWidth"
                value={settings.pageWidth}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/2">Page Height (cm)</label>
              <input
                type="number"
                name="pageHeight"
                value={settings.pageHeight}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/2">Font Size</label>
              <input
                type="number"
                name="fontSize"
                value={settings.fontSize}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/2">Font Price Size</label>
              <input
                type="number"
                name="fontPrice"
                value={settings.fontPrice}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/2">Margin Top (mm)</label>
              <input
                type="number"
                name="marginTop"
                value={settings.marginTop}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/2">Margin Bottom (mm)</label>
              <input
                type="number"
                name="marginBottom"
                value={settings.marginBottom}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/2">Margin Left (mm)</label>
              <input
                type="number"
                name="marginLeft"
                value={settings.marginLeft}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/2">Margin Right (mm)</label>
              <input
                type="number"
                name="marginRight"
                value={settings.marginRight}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/2">Barcode Type</label>
              <select
                name="barcodeType"
                value={settings.barcodeType}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              >
                <option value="CODE128">CODE128</option>
                <option value="EAN13">EAN13</option>
                <option value="UPC">UPC</option>
                <option value="QR">QR CODE</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-1/2">Print Per Line</label>
              <input
                type="number"
                name="printPerLine"
                value={settings.printPerLine}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded"
              />
            </div>
          </div>

          <div className="text-right mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Save Settings
            </button>
          </div>
        </div>
      }
    />
  );
};

export default PrintSettings;
