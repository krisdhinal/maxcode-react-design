import React, { useState, useEffect } from "react";

const PrintSettings = ({ onSave }) => {
  const initState = {
    showName: true,
    showPrice: true,
    showCode: true,
    showDate: false,
    barcodeWidth: 2,
    barcodeHeight: 100,
    pageWidth: 10.3,
    pageHeight: 2.3,
    fontSize: 14,
    fontPrice: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    barcodeType: "CODE128",
    printPerLine: 3,
  };
  const [settings, setSettings] = useState(initState);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("printSettings"));
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("printSettings", JSON.stringify(settings));
    onSave(settings);
  };

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Print Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Checkbox Pengaturan */}
        <div>
          <label>
            <input
              type="checkbox"
              name="showName"
              checked={settings.showName}
              onChange={handleChange}
            />
            <span className="ml-2">Show Name</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showPrice"
              checked={settings.showPrice}
              onChange={handleChange}
            />
            <span className="ml-2">Show Price</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showCode"
              checked={settings.showCode}
              onChange={handleChange}
            />
            <span className="ml-2">Show Code</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showDate"
              checked={settings.showDate}
              onChange={handleChange}
            />
            <span className="ml-2">Show Date</span>
          </label>
        </div>

        {/* Input untuk Dimensi Barcode */}
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

        {/* Input untuk Dimensi Halaman */}
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

        {/* Tipe Barcode */}
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

        {/* Per Baris */}
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