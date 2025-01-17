import React from "react";
import { formatRupiah } from "../utils/FormattedPrice";
import Barcode from "react-barcode";

function DetailProduct(props) {
  const { data, handleQuantityChange } = props;
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            {data?.itemBarcode ? (
              <th scope="col" className="px-6 py-3 w-[15%]">
                Print Quantity
              </th>
            ) : null}
            <th scope="col" className="px-6 py-3">
              Barcode
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {data?.itemName}
            </th>
            <td className="px-6 py-4">{formatRupiah(data?.itemPrice)}</td>
            {data?.itemBarcode ? (
              <td className="px-6 py-4 w-[15%]">
                <input
                  type="number"
				  value={data?.quantity || 1}
				  min={1}
				  onChange={(e)=> handleQuantityChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Quantity"
                />
              </td>
            ) : null}
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                {data?.itemBarcode ? (
                  <Barcode value={data?.itemBarcode} />
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
