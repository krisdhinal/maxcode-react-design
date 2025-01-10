import React, { useState } from "react";
import { fetchProductDetails } from "../services/api";
import BarcodePreview from "./BarcodePreview.jsx";
import { toast } from "react-toastify";
import PrintSettings from "./PrintSetting";
import { formatRupiah } from "../utils/FormattedPrice.js";

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState(null);
  const initStatePrint = JSON.parse(localStorage.getItem("printSettings")) || {
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
  const [printSettings, setPrintSettings] = useState(initStatePrint);

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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {product ? (
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">{product.itemName}</h2>
          <p>Bardcode: {product.itemNumber}</p>
          <p>Price: {formatRupiah(product.itemPrice)}</p>
          <BarcodePreview
            code={product?.itemBarcode}
            settings={printSettings}
            product={product}
          />
          {product?.itemBarcode ? (
            <PrintSettings onSave={setPrintSettings} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProductSearch;
