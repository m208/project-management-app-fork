import { Link, useMatch } from '@tanstack/react-location';
import { useTranslation } from 'react-i18next';

import { ColumnsContainer } from './ColumnsContainer/ColumnsContainer';

import { boardsApi } from '@/api/services/BoardsService';
import { Loader } from '@/components/Loader/Loader';
import './Board.pcss';

export const Board = (): JSX.Element => {
  const { data: { boardId } } = useMatch();
  const { data: board,  isLoading, error } = boardsApi.useGetBoardQuery(boardId as string);

  const { t } = useTranslation();

  return (
    <section className="board">
      {(isLoading && <Loader/> )}

      {error && (
        <>
          <p>{t('BOARD.NOT_EXIST')}</p>
          <Link to='/boards'>
            {t('BOARD.TO_BOADRS')}
          </Link>
        </>
      )}

      {board && (
        <>
          <div className="board-heading">
            <span className='board-crumbs'>
              <Link to='/boards'>
                Back to boards
              </Link>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mx-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>

            </span>
            <h1 className = 'board-title'>{board.title}</h1>
          </div>

          <div className="board-wrapper">
            <ColumnsContainer boardId={board.id} />
          </div>
        </>
      )}
    </section>
  );
};
