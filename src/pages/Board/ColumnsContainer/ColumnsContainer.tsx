import { Column } from '../Column/Column';

import { columnsApi } from '@/api/services/ColumnsService';
import { IColumn } from '@/app/types';
import { Loader } from '@/components/Loader/Loader';
import './ColumnsContainer.pcss';

interface ColumnsContainerProps {
  boardId: string;
}

export const ColumnsContainer = ({ boardId }: ColumnsContainerProps): JSX.Element => {

  const { data: columns, isLoading } = columnsApi.useGetColumnsQuery(boardId);
  const [createCol, { error, isLoading: crLoading }] = columnsApi.useCreateColumnMutation();
  const [deleteCol, { isLoading: delLoading }] = columnsApi.useDeleteColumnMutation();

  const handleCreate = async () => {
    // eslint-disable-next-line no-alert
    const title = prompt('Input new column title');

    if (title){
      await createCol({
        col: {
          title,
          order: 0,
        } as IColumn,
        boardId,
      });
    }
  };

  const handleDelete = async (col: IColumn) => {
    await deleteCol({
      col,
      boardId,
    });
  };

  return (
    <section className="columns">
      {error && (
        <p> {`${JSON.stringify(error)}`}</p>
      )}

      {((isLoading || delLoading || crLoading) && <Loader/> )}

      <div className="columns-wrapper">
        {columns && columns.map(col =>
          <Column
            column = {col}
            boardId = {boardId}
            onDelete={handleDelete}
            key = {col.id}
          />,
        )}

        <div className="columns-add">
          <button
            type = 'button'
            className='col-addbttn'
            onClick={handleCreate}
          >
            Add COLUMN
          </button>
        </div>

      </div>

    </section>
  );};
