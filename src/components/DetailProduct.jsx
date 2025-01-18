import React from "react";
import { formatRupiah } from "../utils/FormattedPrice";

function DetailProduct(props) {
  const { data } = props;
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 max-w-[200px]">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              UPC
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 max-w-[200px]"
            >
              {data?.itemNumber ? `(${data?.itemNumber})` : null}{" "}
              {data?.itemName}
            </th>
            <td className="px-6 py-4">{formatRupiah(data?.itemPrice)}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                {data?.itemBarcode ? (
                  data?.itemBarcode
                ) : (
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Generate Barcode
                  </button>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailProduct;
