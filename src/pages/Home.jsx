import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PrintSettings from "../components/PrintSetting";
import { fetchProductDetails } from "../services/api";
import { toast } from "react-toastify";
import DetailProduct from "../components/DetailProduct";
import PrintPreview from "../components/PrintPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Home() {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState(null);
  const initStatePrint = JSON.parse(localStorage.getItem("printSettings")) || {
    showName: true,
    showPrice: true,
    showCode: true,
    showBarcode: true,
    showDate: true,
    showDisplay: false,
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
  const [printSettings, setPrintSettings] = useState(initStatePrint);
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
    try {
      const productData = await fetchProductDetails(query);
      if (productData?.data) {
        setProduct(productData?.data);
      } else {
        toast.error("Data not found", { position: "top-right" });
      }
    } catch (err) {
      toast.error(err.message || "Data not found", { position: "top-right" });
    }
  };
  return (
    <Layout>
      <DndProvider
        context={typeof window !== "undefined" ? window : undefined}
        backend={HTML5Backend}
      >
        <div className="w-full bg-white p-6 h-fit rounded-lg shadow-md">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Search Product</h1>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Enter Product Name or SKU"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                disabled={query.length === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Search
              </button>
            </div>
            {product ? (
              <div className="border p-4 rounded shadow-md">
                <DetailProduct data={product} />

                {product?.itemBarcode ? (
                  <>
                    <PrintSettings onSave={setPrintSettings} />
                    <PrintPreview
                      settings={printSettings}
                      handleChange={handleChange}
                      data={product}
                    />
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </DndProvider>
    </Layout>
  );
}

export default Home;
