/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { Column } from '../Column/Column';

import { columnsApi } from '@/api/services/ColumnsService';
import { tasksApi } from '@/api/services/TasksService';
import { IColumn, ITaskResponse, ITaskSet } from '@/app/types';
import { Loader } from '@/components/Loader/Loader';
import './ColumnsContainer.pcss';
import { ModalData, ModalForm } from '@/components/ModalForm/ModalForm';
import { getBiggestOrder } from '@/utils/utils';

interface ColumnsContainerProps {
  boardId: string;
}

export const ColumnsContainer = ({ boardId }: ColumnsContainerProps): JSX.Element => {
  const [showModalCreateCol, setShowModalCreateCol] = useState(false);

  const { data: columns, isLoading } = columnsApi.useGetColumnsQuery(boardId);
  const [createCol, { error, isLoading: crLoading }] = columnsApi.useCreateColumnMutation();
  const [deleteCol, { isLoading: delLoading }] = columnsApi.useDeleteColumnMutation();
  const [updateColOrder] = columnsApi.useUpdateColumnSetMutation();
  const [getColumnsSet] = columnsApi.useGetColumnSetMutation();

  const [getTasksByColumn] = tasksApi.useGetTasksByColumnMutation();
  const [getTasksSet] = tasksApi.useGetTasksSetMutation();
  const [updateTaskSet] = tasksApi.useUpdateTasksSetMutation();

  const { t } = useTranslation();

  const handleCreate = () => {
    setShowModalCreateCol(true);
  };

  const createNewColumn = async (data: ModalData) => {
    setShowModalCreateCol(false);

    if (data.title){
      await createCol({
        col: {
          title: data.title,
          order: getBiggestOrder(columns) + 1,
        },
        boardId,
      });
    }
  };

  const transformTasks = (tasks: ITaskResponse[]) => {
    console.log(tasks);
    const transformedTasks = tasks.map(el => {
      const { _id: id, order, columnId } = el;
      return { _id: id , order, columnId };
    });
    return transformedTasks;
  };

  const onDragEndColumn = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
  };

  const onDragEndTask = async (result: DropResult) => {
    console.log(result);

    const { destination, source, draggableId } = result;
    const idFromColumn = columns?.find(el => el.id === source.droppableId);
    const idToColumn = columns?.find(el => el.id === destination!.droppableId);

    const tasksSetToColumn = await getTasksByColumn({ boardId, colId: idFromColumn!.id });

    try {
      const copyedArrTasks = transformTasks((tasksSetToColumn['data']));

      let reordered = [...copyedArrTasks]
        .sort((a, b) => (a.order - b.order))
        .map((el,i) =>( { ...el, order: i }));    // set orders by ascending

      // eslint-disable-next-line no-underscore-dangle
      const movedTask = reordered.find(el=>el._id === draggableId);
      const [from, to ] = [movedTask!.order, destination!.index];

      if (from > to) {
        reordered.splice(from, 1);
        reordered.splice(to, 0, movedTask!);
      } else {
        reordered.splice(to, 0, movedTask!);
        reordered.splice(from, 1);
      }

      reordered = reordered.map((el,i) =>( { ...el, order: i }));

      await updateTaskSet(reordered);

    } catch {
      toast.error(t('TOASTER.SERV_ERR'));
    }

  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (destination.droppableId === 'board') {
      await onDragEndColumn(result);
    } else {
      await onDragEndTask(result);
    }
  };

  const handleDelete = async (col: IColumn) => {
    await deleteCol({
      col,
      boardId,
    });
  };

  const handleShuffle = async () => {
    if (columns) {
      await updateColOrder([...columns]
        .sort((a, b)=>(a.order - b.order))
        .map((el, i )=>({
          _id: el.id,
          order: columns.length - i,
        })),
      );
    }
  };

  return (
    <section className="columns">
      {error && (
        <p> {`${JSON.stringify(error)}`}</p>
      )}

      {((isLoading || delLoading || crLoading) && <Loader/> )}

      {((showModalCreateCol) &&
      <ModalForm
        type ='CREATE_COLUMN'
        modalSubmit={createNewColumn}
        modalAbort={()=>setShowModalCreateCol(false)}
      />)}

      <div className="columns-wrapper">

        <DragDropContext
          onDragEnd={handleDragEnd}>
          {columns && [...columns]
            .sort((a, b) => (a.order - b.order))
            .map(col =>
              <Column
                column={col}
                boardId={boardId}
                onDelete={handleDelete}
                key={col.id}
              />,
            )}
        </DragDropContext>

        <div className="columns-add">
          <button
            type = 'button'
            className='columns-add-bttn'
            onClick={handleCreate}
          >
            {t('TASKS.ADD_COL')}
          </button>

          <button
            type = 'button'
            className='columns-add-bttn'
            onClick={handleShuffle}
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
            </span>

            <span>{t('TASKS.REVERSE')}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
