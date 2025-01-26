import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PrintSettings from "../components/PrintSetting";
import { fetchReceives } from "../services/api";
import { toast } from "react-toastify";
import TableReceive from "../components/TableReceive";
import PrintReceive from "../components/PrintReceive";

function Receive() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initStatePrint = JSON.parse(localStorage.getItem("printSettings")) || {
    showName: true,
    showPrice: true,
    showCode: true,
    showBarcode: true,
    showDate: true,
    showDisplay: false,
    showPriceDisplay: true,
    showCodeDisplay: true,
    showNameDisplay: true,
    showDateDisplay: true,
    barcodeWidth: 2,
    barcodeHeight: 60,
    pageWidth: 15,
    pageHeight: 5,
    fontSize: 16,
    fontPrice: 16,
    marginTop: 3,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
    barcodeType: "CODE128",
    printPerLine: 2,
    displayQuantity: 1,
    printQuantity: 1,
  };
  const [printSettings, setPrintSettings] = useState(initStatePrint);
  const [receives, setReceives] = useState([]);
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("printSettings"));
    if (savedSettings) {
      setPrintSettings(savedSettings);
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newPrintSettings = {
      ...printSettings,
      [name]: type === "checkbox" ? checked : value,
    };
    setPrintSettings(newPrintSettings);
    localStorage.setItem("printSettings", JSON.stringify(newPrintSettings));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const receive = await fetchReceives(query);
      if (receive?.data) {
        const result = receive?.data?.map((i)=>({...i, printQty: 1}));
        setReceives(result);
      } else {
        toast.error("Data not found", { position: "top-right" });
      }
    } catch (err) {
      toast.error(err.message || "Data not found", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      handleSearch();
    }
  };

  return (
    <Layout breadcrumbTitle="Receive">
      <div className="w-full bg-white p-6 h-fit rounded-lg shadow-md">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Search Receive</h1>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Enter Transaction Number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              disabled={query?.length === 0 || isLoading}
              className={`px-4 py-2 rounded ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loader-clock"></span>
                  Loading...
                </div>
              ) : (
                "Search"
              )}
            </button>
          </div>
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <span className="loader-clock"></span>
            </div>
          )}
          {receives?.length > 0 ? (
            <div className="border p-4 rounded shadow-md">
              <TableReceive datas={receives} setDatas={setReceives} />
              <PrintSettings
                onSave={setPrintSettings}
                printSettings={printSettings}
              />
              <PrintReceive
                settings={printSettings}
                handleChange={handleChange}
				data={receives}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default Receive;
