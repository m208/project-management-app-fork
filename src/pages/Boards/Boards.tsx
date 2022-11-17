/* eslint-disable no-alert */
import { Link } from '@tanstack/react-location';

import { boardsApi } from '@/api/services/BoardsService';
import { IBoard } from '@/app/types';
import { Loader } from '@/components/Loader/Loader';
import { useAppSelector } from '@/hooks/redux';

import './Boards.pcss';

export const Boards = (): JSX.Element => {
  const { user } = useAppSelector(
    state => state.authReducer,
  );

  const { data: boards,  isLoading } = boardsApi.useGetAllBoardsQuery();
  const [createBoard, { isLoading: crIsLoading }] = boardsApi.useCreateBoardMutation();
  const [deleteBoard, { isLoading: delIsLoading }] = boardsApi.useDeleteBoardMutation();
  const [updateBoard, { error, isLoading: updIsLoading }] = boardsApi.useUpdateBoardMutation();

  const handleCreate = async () => {

    const title = prompt('Input new board title');

    if (title){
      await createBoard({
        title,
        // TODO: user.ID pass here, not login
        owner: user?.login,
        users: [user?.login],
      } as IBoard);
    }
  };

  const handleRemove = async (id: string) => {
    await deleteBoard(id);
  };

  const handleUpdate = async (board: IBoard) => {

    const title = prompt('Change board title', board.title);

    if (title){
      await updateBoard({
        ...board,
        title,
      });
    }
  };

  return (
    <section className="boards">

      {((isLoading || crIsLoading || delIsLoading || updIsLoading) && <Loader/> )}

      <h1 className='boards-heading'>Boards</h1>
      <p>List of boards:</p>
      <ul>
        {boards && boards.map(board =>
          <li key = {board.id} className='py-2'>
            <div className="board-item">
              <div className="board-content">
                <Link to={`/main/${board.id}`}>
                  {`id: ${board.id} | title: ${board.title} | owner: ${board.owner}`}
                </Link>

              </div>

              <div className="board-buttons">

                <button
                  type ='button'
                  onClick={()=>handleUpdate(board)}
                  className="board-button"
                >
                Edit
                </button>

                <button
                  type ='button'
                  onClick={()=>handleRemove(board.id)}
                  className="board-button"
                >
                DEL
                </button>

              </div>
            </div>
          </li>,
        )}
      </ul>

      <button
        type ='button'
        onClick={handleCreate}
        className="board-button"
      >
        Add new board
      </button>

      {error &&
      <span>
        {`${JSON.stringify(error)}`}
      </span>
      }

    </section>
  );
};
