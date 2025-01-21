import React, { useCallback } from "react";
import Card from "./CardDrag";
import update from "immutability-helper";

function RenderList(props) {
  const { data, setState } = props;
  const moveFn = useCallback((dragIndex, hoverIndex) => {
    setState((prevState) =>
      update(prevState, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevState[dragIndex]],
        ],
      })
    );
  }, [setState]);
  const renderCard = useCallback(
    (card, index) => {
      if (card?.isShow) {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveFn}
            className={card.className}
            style={card.style}
          />
        );
      }
      return null;
    },
    [moveFn]
  );
  return (
    <div className="flex flex-col items-center">
      {data.map((list, i) => renderCard(list, i))}
    </div>
  );
}

export default RenderList;
