import { useMatch } from '@tanstack/react-location';

import './Board.pcss';

export const Board = (): JSX.Element => {
  const { data: { boardId } } = useMatch();

  return (
    <section className="board">
      <h1>BOARD</h1>
      <p>id: {boardId as string}</p>
    </section>
  );};
