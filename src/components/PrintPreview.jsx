/* eslint-disable react-hooks/exhaustive-deps */
import update from "immutability-helper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatRupiah } from "../utils/FormattedPrice";
import moment from "moment";
import { Card } from "./CardDrag";
import { useReactToPrint } from "react-to-print";
import RenderBarcode from "./RenderBarcode";

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
	  style: {
        fontSize: `${settings?.fontSize}px`,
        lineHeight: `${settings?.fontSize}px`,
      },
    },
    {
      id: 2,
      text: data?.itemBarcode,
      className: "text-xs font-bold",
      isShow: settings.showCodeDisplay,
	  style: {
        fontSize: `${settings?.fontSize}px`,
        lineHeight: `${settings?.fontSize}px`,
      },
    },
    {
      id: 3,
      text: formatRupiah(data?.itemPrice),
      className: `text-xl font-bold`,
      isShow: settings.showPriceDisplay,
      style: {
        fontSize: `${settings?.fontPrice}px`,
        lineHeight: `${settings?.fontPrice}px`,
      },
    },
    {
      id: 4,
      text: moment().format("DD MMM YYYY"),
      className: "text-[8px] font-bold",
      isShow: settings.showDateDisplay,
	  style: {
        fontSize: `${settings?.fontSize}px`,
        lineHeight: `${settings?.fontSize}px`,
      },
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
	  style: {
        fontSize: `${settings?.fontSize}px`,
        lineHeight: `${settings?.fontSize}px`,
      },
    },
    {
      id: 2,
      text: data?.itemName,
      className: "text-xs font-bold",
      isShow: settings.showName,
	  style: {
        fontSize: `${settings?.fontSize}px`,
        lineHeight: `${settings?.fontSize}px`,
      },
    },
    {
      id: 3,
      text: moment().format("DD MMM YYYY"),
      className: "text-[8px] font-bold",
      isShow: settings.showDate,
	  style: {
        fontSize: `${settings?.fontSize}px`,
        lineHeight: `${settings?.fontSize}px`,
      },
    },
    {
      id: 4,
      text: formatRupiah(data?.itemPrice),
      className: `text-xs font-bold`,
      isShow: settings.showPrice,
      style: {
        fontSize: `${settings?.fontPrice}px`,
        lineHeight: `${settings?.fontPrice}px`,
      },
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
  const quantity =
    parseInt(settings?.displayQuantity) > parseInt(settings?.printQuantity)
      ? parseInt(settings?.displayQuantity)
      : parseInt(settings?.printQuantity);
  return (
    <div className="py-4 mt-4" ref={ref}>
      <h3 className="text-lg text-gray-700 font-semibold mb-2">
        Print Preview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Display Setting</p>
          <div>
            <label>
              <input
                type="checkbox"
                name="showDisplay"
                checked={settings.showDisplay}
                onChange={handleChange}
              />
              <span className="ml-2 font-[500]">Show Data Display</span>
            </label>
          </div>
          {settings?.showDisplay ? (
            <>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="showNameDisplay"
                    checked={settings.showNameDisplay}
                    onChange={handleChange}
                  />
                  <span className="ml-2 font-[500]">Show Name Display</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="showPriceDisplay"
                    checked={settings.showPriceDisplay}
                    onChange={handleChange}
                  />
                  <span className="ml-2 font-[500]">Show Price Display</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="showCodeDisplay"
                    checked={settings.showCodeDisplay}
                    onChange={handleChange}
                  />
                  <span className="ml-2 font-[500]">Show Code Display</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="showDateDisplay"
                    checked={settings.showDateDisplay}
                    onChange={handleChange}
                  />
                  <span className="ml-2 font-[500]">Show Date Display</span>
                </label>
              </div>
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
          <div>
            <label>
              <input
                type="checkbox"
                name="showName"
                checked={settings.showName}
                onChange={handleChange}
              />
              <span className="ml-2 font-[500]">Show Name</span>
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
              <span className="ml-2 font-[500]">Show Price</span>
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
              <span className="ml-2 font-[500]">Show Code</span>
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
              <span className="ml-2 font-[500]">Show Date</span>
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
              <span className="ml-2 font-[500]">Show Barcode</span>
            </label>
          </div>
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
      <br />
      <div style={{ maxWidth: ref.current ? ref.current.offsetWidth : "100%" }}>
        <div ref={contentRef} className="parent-container">
          {quantity
            ? new Array(parseInt(quantity)).fill("").map((_, index) => (
                <div
                  key={index}
                  className={`border border-gray-500 border-dashed flex  justify-between print-container ${index !== 0 ? "not-first-elm":""} ${
                    settings?.printPerLine > 1
                      ? "flex-row items-center"
                      : "flex-col"
                  }`}
                  style={{
                    ...printStyles,
                    breakAfter: "page",
                  }}
                >
                  <style>{pageStyle}</style>
                  {settings.showDisplay &&
                  index <= settings?.displayQuantity - 1 ? (
                    <div className="text-center w-1/2 left relative z-[9999]">
                      <div>{cards.map((card, i) => renderCard(card, i))}</div>
                    </div>
                  ) : null}
                  {index <= settings?.printQuantity - 1 ? (
                    <div className="text-center w-1/2 right">
                      <div className="flex flex-col items-center">
                        {lists.map((card, i) => renderList(card, i))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </div>
      <div>
        <br />
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
