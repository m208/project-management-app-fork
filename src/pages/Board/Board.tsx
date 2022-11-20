import { Link, useMatch } from '@tanstack/react-location';

import { ColumnsContainer } from './ColumnsContainer/ColumnsContainer';

import { boardsApi } from '@/api/services/BoardsService';
import { Loader } from '@/components/Loader/Loader';

import './Board.pcss';

export const Board = (): JSX.Element => {
  const { data: { boardId } } = useMatch();
  const { data: board,  isLoading, error } = boardsApi.useGetBoardQuery(boardId as string);

  return (
    <section className="board">
      <div className="container">
        {(isLoading && <Loader/> )}

        {error && (
          <>
            <p>Board does not exist</p>
            <Link to='/boards'>
                Go back to yours boards
            </Link>
          </>
        )}

        {board && (
          <>
            <h1 className = 'board-heading'>BOARD: {board.title}</h1>
            <ColumnsContainer boardId={board.id} />
          </>
        )}
      </div>
    </section>
  );
};
