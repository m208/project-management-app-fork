import { Link, useMatch } from '@tanstack/react-location';

import { boardsApi } from '@/api/services/BoardsService';
import { Loader } from '@/components/Loader/Loader';
import './Board.pcss';

export const Board = (): JSX.Element => {
  const { data: { boardId } } = useMatch();
  const { data: board,  isLoading, error } = boardsApi.useGetBoardQuery(boardId as string);

  return (
    <section className="board">
      {(isLoading && <Loader/> )}

      <h1>BOARD</h1>

      {error && (
        <>
          <p>Board does not exist</p>
          <Link to='/main'>
              Go back to yours boards
          </Link>
        </>
      )}

      {board && (
        <>
          <p>id: {board?.id }</p>
          <p>title: {board?.title }</p>
          <p>owner: {board?.owner }</p>
          <p>users: {board?.users }</p>
        </>
      )}

    </section>
  );};
