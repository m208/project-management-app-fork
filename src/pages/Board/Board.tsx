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
          <h1 className = 'board-heading'>{t('BOARD.BOARD')}: {board.title}</h1>
          <ColumnsContainer boardId={board.id} />
        </>
      )}

    </section>
  );
};
