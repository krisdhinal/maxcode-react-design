import React, { useEffect, useState } from "react";
import { getStyles } from "../utils/getStyles";
import { formatRupiah } from "../utils/FormattedPrice";
import moment from "moment";
import RenderBarcode from "./RenderBarcode";
import RenderList from "./RenderList";

function ItemPrintReceive(props) {
  const { settings, data, printStyles, index } = props;
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
    setCards((prevCards) =>
      prevCards.map((item) => ({
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
      }))
    );
    setLists((prevLists) =>
      prevLists.map((item) => ({
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
      }))
    );
  }, [settings, data?.itemBarcode]);

  const items = React.useMemo(() => {
    const displayItems = Array(
      parseInt((settings.showDisplay && data?.printQty) || 0)
    ).fill(<RenderList data={cards} setState={setCards} />);

    const listItems = Array(parseInt(data?.printQty) || 0).fill(
      <RenderList data={lists} setState={setLists} />
    );

    return [...displayItems, ...listItems];
  }, [settings.showDisplay, data?.printQty, cards, lists]);
  const printPerLine = parseInt(settings?.printPerLine);
  const groupedLines = React.useMemo(() => {
    const groups = [];
    for (let i = 0; i < items.length; i += printPerLine) {
      groups.push(items.slice(i, i + printPerLine));
    }
    return groups;
  }, [items, printPerLine]);

  return (
    <div key={index}>
      {groupedLines.map((line, indx) => (
        <div
          className={`border border-gray-500 border-dashed flex  justify-between print-container ${
            indx !== 0 ? "not-first-elm" : ""
          } ${
            settings?.printPerLine > 1
              ? "flex-row items-center"
              : "flex-col items-center"
          }`}
          style={{
            ...printStyles,
            breakAfter: "page",
          }}
          key={indx}
        >
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
  );
}

export default ItemPrintReceive;
