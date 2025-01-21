/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { formatRupiah } from "../utils/FormattedPrice";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import RenderBarcode from "./RenderBarcode";
import Accordion from "./Accordion";
import RenderList from "./RenderList";
import { getStyles } from "../utils/getStyles";

function PrintPreview(props) {
  const { settings, handleChange, data, handleQuantityChange } = props;
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [cards, setCards] = useState([
    {
      id: 1,
      text: data?.itemName,
      className: "text-xs font-bold",
      isShow: settings.showNameDisplay,
      style: getStyles(settings?.fontSize, settings?.fontSize),
    },
    {
      id: 2,
      text: data?.itemBarcode,
      className: "text-xs font-bold",
      isShow: settings.showCodeDisplay,
      style: getStyles(settings?.fontSize, settings?.fontSize),
    },
    {
      id: 3,
      text: formatRupiah(data?.itemPrice),
      className: `text-xl font-bold`,
      isShow: settings.showPriceDisplay,
      style: getStyles(settings?.fontPrice, settings?.fontPrice),
    },
    {
      id: 4,
      text: moment().format("DD MMM YYYY"),
      className: "text-[8px] font-bold",
      isShow: settings.showDateDisplay,
      style: getStyles(settings?.fontSize, settings?.fontSize),
    },
  ]);
  const [lists, setLists] = useState([
    {
      id: 1,
      text: (
        <RenderBarcode
          value={data?.itemBarcode}
          settings={settings}
          type={settings?.barcodeType}
        />
      ),
      className: "text-xs font-bold",
      isShow: settings.showBarcode,
      style: getStyles(settings?.fontSize, settings?.fontSize),
    },
    {
      id: 2,
      text: data?.itemName,
      className: "text-xs font-bold",
      isShow: settings.showName,
      style: getStyles(settings?.fontSize, settings?.fontSize),
    },
    {
      id: 3,
      text: moment().format("DD MMM YYYY"),
      className: "text-[8px] font-bold",
      isShow: settings.showDate,
      style: getStyles(settings?.fontSize, settings?.fontSize),
    },
    {
      id: 4,
      text: formatRupiah(data?.itemPrice),
      className: `text-xs font-bold`,
      isShow: settings.showPrice,
      style: getStyles(settings?.fontPrice, settings?.fontPrice),
    },
  ]);
  useEffect(() => {
    const newData = cards?.map((item) => {
      let data = {
        ...item,
        isShow:
          (item?.id === 1 && settings.showNameDisplay) ||
          (item?.id === 2 && settings.showCodeDisplay) ||
          (item?.id === 3 && settings.showPriceDisplay) ||
          (item?.id === 4 && settings.showDateDisplay),
        style: getStyles(
          item?.id !== 3 ? settings.fontSize : settings?.fontPrice,
          item?.id !== 3 ? settings.fontSize : settings?.fontPrice
        ),
      };

      return data;
    });
    const newList = lists?.map((item) => {
      let list = {
        ...item,
        text:
          item.id === 1 ? (
            <RenderBarcode
              value={data?.itemBarcode}
              settings={settings}
              type={settings?.barcodeType}
            />
          ) : (
            item.text
          ),
        isShow:
          (item?.id === 1 && settings.showBarcode) ||
          (item?.id === 2 && settings.showName) ||
          (item?.id === 3 && settings.showDate) ||
          (item?.id === 4 && settings.showPrice),
        style: getStyles(
          item?.id !== 4 ? settings.fontSize : settings?.fontPrice,
          item?.id !== 4 ? settings.fontSize : settings?.fontPrice
        ),
      };

      return list;
    });
    setCards(newData);
    setLists(newList);
  }, [settings]);

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

  const items = [
    ...Array(
      parseInt((settings.showDisplay && settings?.displayQuantity) || 0)
    ).fill(<RenderList data={cards} setState={setCards} />),
    ...Array(parseInt(settings?.printQuantity)).fill(
      <RenderList data={lists} setState={setLists} />
    ),
  ];
  const groupedLines = [];
  for (let i = 0; i < items.length; i += parseInt(settings?.printPerLine)) {
    groupedLines.push(items.slice(i, i + parseInt(settings?.printPerLine)));
  }
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
                  {((key !== "showDisplay" && settings?.showDisplay) ||
                  key === "showDisplay") ? (
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

              {settings?.showDisplay ? (
                <>
                  <div>
                    <label className="font-[500]">Print Display Quantity</label>
                    <input
                      type="number"
                      min={1}
                      value={settings.displayQuantity}
                      onChange={(e) => handleQuantityChange(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[27%] p-2.5"
                      placeholder="Print Quantity"
                      name="displayQuantity"
                    />
                  </div>
                </>
              ) : null}
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
              <div>
                <label className="font-[500]">Print Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={settings?.printQuantity}
                  name="printQuantity"
                  onChange={(e) => handleQuantityChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[27%] p-2.5"
                  placeholder="Print Quantity"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
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
              {groupedLines.map((line, index) => (
                <div
                  key={index}
                  className={`border border-gray-500 border-dashed flex  justify-between print-container ${
                    index !== 0 ? "not-first-elm" : ""
                  } ${
                    settings?.printPerLine > 1
                      ? "flex-row items-center"
                      : "flex-col items-center"
                  }`}
                  style={{
                    ...printStyles,
                    breakAfter: "page",
                  }}
                >
                  <style>{pageStyle}</style>
                  {line.map((item, idx) => (
                    <div
                      className="text-center left relative z-[999]"
                      style={{
                        width: `${100 / (settings?.printPerLine || 1)}%`,
                      }}
                      key={idx}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}

export default PrintPreview;
