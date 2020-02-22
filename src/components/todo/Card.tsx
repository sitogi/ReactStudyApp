/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useRef } from 'react';
import { jsx, css } from '@emotion/core';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { XYCoord } from 'dnd-core';
import ItemTypes from './ItemTypes';

const style = css`
  background-color: white;
  border: 2px dashed gray;
  cursor: move;
  margin-bottom: 30px;
  padding: 30px 10px;
`;

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}
const Card: React.FC<CardProps> = ({ id, text, index, moveCard }) => {
  // div への ref を宣言しておく。この div が一枚一枚のカードそのもの
  const ref = useRef<HTMLDivElement>(null);

  // useDrop Hook. set 関数のような drop だけを宣言している？
  // useDrop の引数は、
  // 1. accept というドロップを受け入れることができるアイテムを表すキーのようなもの
  // 2. hover という関数。 プロパティが関数の場合にショートハンドで書けるっぽい...！
  //    `functionName: (str: string) => {}` -> `functionName(str: string){}`
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      // ホバー中に何百、何千回とコールされる関数

      // ref の現在の値がない場合には終了
      if (!ref.current) {
        return;
      }

      // ドラッグしているアイテムの現在の Index と、ホバーしている位置の Index ？
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        // ホバーしている位置が自身の領域と同じ場合は何もしない
        return;
      }

      // ここからは要素の位置情報を計算して、特定の位置に来た場合にカードを動かすということをしている。

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    // eslint-disable-next-line object-shorthand
    <div ref={ref} css={{ ...style, opacity: opacity }}>
      {text}
    </div>
  );
};

export default Card;
