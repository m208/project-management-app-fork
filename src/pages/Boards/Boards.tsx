/* eslint-disable no-alert */
import { boardsApi } from '@/api/services/BoardsService';
import { IBoard } from '@/app/types';
import { Loader } from '@/components/Loader/Loader';
import { useAppSelector } from '@/hooks/redux';

import './Boards.pcss';

export const Boards = (): JSX.Element => {
  const { user } = useAppSelector(
    state => state.authReducer,
  );

  const { data: boards,  isLoading , refetch } = boardsApi.useGetAllBoardsQuery();
  const [createBoard, { error, isLoading: createIsLoading }] = boardsApi.useCreateBoardMutation();

  const [deleteBoard, { isLoading: deleteIsLoading }] = boardsApi.useDeleteBoardMutation();

  const handleCreate = async () => {

    const title = prompt('What\'s your sign?');

    if (title){
      await createBoard({
        title,
        owner: user?.login,
        users: [user?.login],
      } as IBoard);

      await refetch();
    }

  };

  const handleRemove = async (id: string) => {

    await deleteBoard(id);

    await refetch();
  };

  return (
    <section className="boards">

      {((isLoading || createIsLoading || deleteIsLoading) && <Loader/> )}

      <h1 className='boards-heading'>Boards</h1>
      <p>List of user boards here</p>
      <ul>
        {boards && boards.map((board, i) =>
          <li key = {i} className='py-2'>
            <div className="flex w-full p1-3 border-2 border-indigo-500 justify-between">
              {`id: ${board._id} | title: ${board.title} | owner: ${board.owner}`}
              <button
                type ='button'
                onClick={()=>handleRemove(board._id!)}
                className="pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
              >
                DEL
              </button>
            </div>

          </li>,
        )}
      </ul>
      <button
        type ='button'
        onClick={handleCreate}
        className="pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
      >
        Add new board
      </button>
      {error &&
      <span>
        {`${JSON.stringify(error)}`}
      </span>

      }

    </section>
  );};
