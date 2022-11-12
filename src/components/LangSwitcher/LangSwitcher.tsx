import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { langSlice } from '@/store/reducers/LanguageSlice';

export const LangSwitcher = (): JSX.Element => {
  const { currentLang } = useAppSelector(state => state.langReducer);
  const { setLanguage } = langSlice.actions;
  const dispatch = useAppDispatch();

  const changeLang = () => currentLang === 'eng' ? 'ru': 'eng';

  const clickHandler = () =>{
    dispatch(setLanguage(changeLang()));
  };

  return (
    <div className="lang-switcher">
      <button
        type='button'
        onClick={clickHandler}
      >
        {currentLang.toUpperCase()}
      </button>
    </div>
  );
};
