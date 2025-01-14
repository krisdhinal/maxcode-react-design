import React, { useEffect, useState } from "react";

const PrintSettings = ({ onSave, printSettings }) => {

  const [settings, setSettings] = useState(printSettings);

  useEffect(()=>{
	setSettings(printSettings)
  },[printSettings])

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

  };

  return (
    <div className="mb-8 mt-4">
      <h3 className="text-lg font-semibold mb-2">Print Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>
            Barcode Width Per Bar:
            <input
              type="number"
              name="barcodeWidth"
              value={settings.barcodeWidth}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Barcode Height:
            <input
              type="number"
              name="barcodeHeight"
              value={settings.barcodeHeight}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Page Width (cm):
            <input
              type="number"
              name="pageWidth"
              value={settings.pageWidth}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Page Height (cm):
            <input
              type="number"
              name="pageHeight"
              value={settings.pageHeight}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>

        {/* Font */}
        <div>
          <label>
            Font Size:
            <input
              type="number"
              name="fontSize"
              value={settings.fontSize}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Font Price Size:
            <input
              type="number"
              name="fontPrice"
              value={settings.fontPrice}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>

        {/* Margin */}
        <div>
          <label>
            Margin Top:
            <input
              type="number"
              name="marginTop"
              value={settings.marginTop}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Margin Bottom:
            <input
              type="number"
              name="marginBottom"
              value={settings.marginBottom}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Margin Left:
            <input
              type="number"
              name="marginLeft"
              value={settings.marginLeft}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Margin Right:
            <input
              type="number"
              name="marginRight"
              value={settings.marginRight}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Barcode Type:
            <select
              name="barcodeType"
              value={settings.barcodeType}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            >
              <option value="CODE128">CODE128</option>
              <option value="EAN13">EAN13</option>
              <option value="UPC">UPC</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Print Per Line:
            <input
              type="number"
              name="printPerLine"
              value={settings.printPerLine}
              onChange={handleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
};

export default PrintSettings;
