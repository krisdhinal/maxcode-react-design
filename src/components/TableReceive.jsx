import React from "react";
import { formatRupiah } from "../utils/FormattedPrice";

function TableReceive(props) {
  const { datas, setDatas } = props;

  const handleInputChange = (index, field, value) => {
    if (field === "printQty" && value < 0) return;
    const updatedData = datas.map((data, i) =>
      i === index ? { ...data, [field]: value } : data
    );
    setDatas(updatedData);
  };

  return (
    <div>
      <p className="text-lg font-semibold">Receive Detail</p>
      <div className="w-full md:w-1/3 my-4">
        <div className="w-full flex items-center gap-4">
          <p className="font-semibold w-1/2">Transaction Number</p>
          <p>{datas[0]?.transNumber}</p>
        </div>
        <div className="w-full flex items-center gap-4">
          <p className="font-semibold w-1/2">Transaction Date</p>
          <p>{datas[0]?.transDate}</p>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 max-w-[200px]">
                Product Code
              </th>
              <th scope="col" className="px-6 py-3 max-w-[200px]">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Barcode Number
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Quantity
              </th>
              <th scope="col" className="px-6 py-">
                Print Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((data, index) => (
              <tr key={index} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 max-w-[200px]"
                >
                  {data?.itemNumber ?? "-"}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 max-w-[200px]"
                >
                  {data?.itemName}
                </th>
                <td className="px-6 py-4">{formatRupiah(data?.itemPrice)}</td>
                <td className="px-6 py-4 ">
                  <div className="flex items-center gap-4 max-w-[200px]">
                    <input
                      type="text"
                      name="itemBarcode"
                      value={data.itemBarcode}
                      placeholder="Scan for add barcode"
                      className="w-full border p-2 rounded focus:border-blue-600 focus:border-solid"
                      onChange={(e) =>
                        handleInputChange(index, "itemBarcode", e.target.value)
                      }
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 text-right"
                >
                  {data?.itemQty}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      name="printQty"
                      value={data.printQty}
                      placeholder="Print Quantity"
                      className="w-full border p-2 rounded"
                      onChange={(e) =>
                        handleInputChange(index, "printQty", e.target.value)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableReceive;
