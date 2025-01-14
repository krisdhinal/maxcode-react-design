/* eslint-disable react-hooks/exhaustive-deps */
import update from "immutability-helper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatRupiah } from "../utils/FormattedPrice";
import moment from "moment";
import Barcode from "react-barcode";
import { Card } from "./CardDrag";
import { useReactToPrint } from "react-to-print";

function PrintPreview(props) {
  const { settings, handleChange, data } = props;
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [cards, setCards] = useState([
    {
      id: 1,
      text: data?.itemName,
      className: "text-xs font-bold",
      isShow: settings.showName,
    },
    {
      id: 2,
      text: data?.itemBarcode,
      className: "text-xs font-bold",
      isShow: settings.showCode,
    },
    {
      id: 3,
      text: formatRupiah(data?.itemPrice),
      className: `text-xl font-bold`,
      isShow: settings.showPrice,
      style: {
        fontSize: `${settings?.fontPrice}px`,
      },
    },
    {
      id: 4,
      text: moment().format("DD MMM YYYY"),
      className: "text-[8px] font-bold",
      isShow: settings.showDate,
    },
  ]);
  const [lists, setLists] = useState([
    {
      id: 1,
      text: (
        <Barcode
          value={data?.itemBarcode}
          displayValue={settings.showCode}
          height={settings?.barcodeHeight}
          width={settings?.barcodeWidth}
          fontSize={settings?.fontSize}
          format={settings?.barcodeType}
        />
      ),
      className: "text-xs font-bold",
      isShow: settings.showBarcode,
    },
    {
      id: 2,
      text: data?.itemName,
      className: "text-xs font-bold",
      isShow: settings.showName,
    },
    {
      id: 3,
      text: moment().format("DD MMM YYYY"),
      className: "text-[8px] font-bold",
      isShow: settings.showDate,
    },
    {
      id: 4,
      text: formatRupiah(data?.itemPrice),
      className: `text-xs font-bold`,
      isShow: settings.showPrice,
      style: {
        fontSize: `${settings?.fontPrice}px`,
      },
    },
  ]);
  useEffect(() => {
    const newData = cards?.map((item) => {
      let data = {
        ...item,

        isShow:
          (item?.id === 1 && settings.showName) ||
          (item?.id === 2 && settings.showCode) ||
          (item?.id === 3 && settings.showPrice) ||
          (item?.id === 4 && settings.showDate),
      };
      if (item?.id === 3) {
        data.style = {
          fontSize: `${settings?.fontPrice}px`,
        };
      }
      return data;
    });
    const newList = lists?.map((item) => {
      let list = {
        ...item,
        text:
          item.id === 1 ? (
            <Barcode
              value={data?.itemBarcode}
              displayValue={settings.showCode}
              height={settings?.barcodeHeight}
              width={settings?.barcodeWidth}
              fontSize={settings?.fontSize}
              format={settings?.barcodeType}
            />
          ) : (
            item.text
          ),
        isShow:
          (item?.id === 1 && settings.showBarcode) ||
          (item?.id === 2 && settings.showName) ||
          (item?.id === 3 && settings.showDate) ||
          (item?.id === 4 && settings.showPrice),
      };
      if (item?.id === 4) {
        list.style = {
          fontSize: `${settings?.fontPrice}px`,
        };
      }
      return list;
    });
    setCards(newData);
    setLists(newList);
  }, [settings]);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const moveList = useCallback((dragIndex, hoverIndex) => {
    setLists((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card, index) => {
      if (card?.isShow) {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            className={card.className}
            style={card.style}
          />
        );
      }
      return null;
    },
    [settings]
  );
  const renderList = useCallback(
    (card, index) => {
      if (card?.isShow) {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveList}
            className={card.className}
            style={card.style}
          />
        );
      }
      return null;
    },
    [settings]
  );
  const printStyles = {
    fontSize: `${settings?.fontSize}px`,
    marginTop: `${settings?.marginTop}px`,
    marginBottom: `${settings?.marginBottom}px`,
    marginLeft: `${settings?.marginLeft}px`,
    marginRight: `${settings?.marginRight}px`,
    height: `${settings?.pageHeight - 0.5}cm`,
    width: `${settings?.pageWidth - 0.5}cm`,
  };
  const ref = useRef(null);
  const pageStyle = `
  
		
		@media print {
		@page {
    size: ${settings?.pageWidth}cm ${settings?.pageHeight}cm;
        margin: 0mm;
  }
		*{
		fontSize: ${settings?.fontSize}px !important;
		}
  .print-container {
		  display: block !important;
		  border: none !important;
        }
		   div, p, img { page-break-inside: avoid !important; }
		  .left{
		  float: left;
          page-break-inside: avoid !important;
		  padding: 0px;

		  }
		  .right{
		  float: ${settings?.showDisplay ? "right" : "left"};
          page-break-inside: avoid !important;
		  padding: 0px;

		  }
	body {
    margin: 0;
    padding: 0;
  }
}
`;
  return (
    <div className="py-4 border-t border-dashed border-gray-500" ref={ref}>
      <h3 className="text-lg font-semibold mb-2">Print Preview</h3>
      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <label>
            <input
              type="checkbox"
              name="showBarcode"
              checked={settings.showBarcode}
              onChange={handleChange}
            />
            <span className="ml-2">Show Barcode</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showDisplay"
              checked={settings.showDisplay}
              onChange={handleChange}
            />
            <span className="ml-2">Show Data Display</span>
          </label>
        </div>
      </div>
      <div
        className="overflow-auto"
        style={{ maxWidth: ref.current ? ref.current.offsetWidth : "100%" }}
      >
        <div
          className="border border-gray-500 border-dashed flex items-center justify-between print-container"
          style={printStyles}
          ref={contentRef}
        >
          <style>{pageStyle}</style>
          {settings.showDisplay ? (
            <div className="text-center w-1/2 left">
              <div>{cards.map((card, i) => renderCard(card, i))}</div>
            </div>
          ) : null}
          <div className="text-center w-1/2 right">
            <div className="flex flex-col items-center">
              {lists.map((card, i) => renderList(card, i))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => reactToPrintFn()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Print
        </button>
      </div>
    </div>
  );
}

export default PrintPreview;
