/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useCallback, FC } from 'react';
import { jsx, css } from '@emotion/core';
import update from 'immutability-helper';
import { Button, Label } from 'semantic-ui-react';
import Card from './Card';

const listBaseCss = css`
  background-color: lightgreen;
  border-radius: 10px;
  padding: 20px;
  width: 350px;
`;
const listHeaderCss = css`
  margin: auto;
  margin-left: 0;
  padding-bottom: 10px;
  padding-left: 3px;
  padding-right: 10px;
  padding-top: 10px;
  width: 90%;
`;
const listContentsCss = css`
  padding: 20px;
`;
const addButtonCss = css`
  margin: 0 auto;
  width: 60%;
`;

// カードの中身を表す interface
export interface Item {
  id: number;
  text: string;
}

// このコンポーネントの State を表す interface
export interface ContainerState {
  cards: Item[];
}

// ごく普通の関数コンポーネント
const Container: FC = () => {
  // state の初期値に Item のリストを書いている
  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 4,
      text: 'Create some examples',
    },
  ]);

  // カード移動時の処理
  // 多分ホバー中にめちゃくちゃレンダリングされるから、 useCallback を使ったり update を使ったりして負荷を減らしてる
  const moveCard = useCallback(
    // ドラッグしたアイテムのインデックスと、現在ホバー中の位置にあるインデックス？
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      // ドラッグしたカードとホバー中のインデックスの位置からアイテム配列の順序を並び替えている
      // update に関しては、おそらく新規配列をわざわざ作成してから置き換える、ということを省けるライブラリなのだろう
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      );
    },
    [cards],
  );

  const renderCard = (card: { id: number; text: string }, index: number) => {
    return <Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />;
  };

  const addCard = () => {
    const newCards = cards.slice();
    newCards.push({ id: cards.length + 1, text: '' });
    setCards(newCards);
  };

  return (
    <div>
      <div css={listBaseCss}>
        <div css={listHeaderCss}>
          <Label size="big" color="green">
            TODO List
          </Label>
        </div>
        <div css={listContentsCss}>{cards.map((card, i) => renderCard(card, i))}</div>
        <div css={addButtonCss}>
          <Button fluid color="blue" onClick={addCard}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Container;
