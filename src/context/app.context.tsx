import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../shared/enums/localstorage';

interface AppState {
  titleGlobal: string;
  setTitleGlobal: React.Dispatch<React.SetStateAction<string>>;
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
  height: number;
  setCourseIdSelected: React.Dispatch<React.SetStateAction<number | null>>;
  courseIdSelected: number | null;
  optionsReactTableDefault: any;
}

interface IUserInfo {
  nickname: string;
}

export const AppContext = React.createContext<AppState>({
  titleGlobal: '',
  setTitleGlobal: () => {},
  userInfo: { nickname: '' },
  setUserInfo: () => null,
  height: 0,
  setCourseIdSelected: () => {},
  courseIdSelected: null,
  optionsReactTableDefault: {},
});

const AppProvider = ({ children }: any) => {
  const navigation = useNavigate();
  const [height, setHeight] = useState(window.innerHeight);
  const [titleGlobal, setTitleGlobal] = useState('');
  const [userInfo, setUserInfo] = useState<IUserInfo>({ nickname: '' });
  const [storedValue] = useLocalStorage(LOCAL_STORAGE_KEY.USER_INFO, null);
  const [courseIdSelected, setCourseIdSelected] = useState<number | null>(null);

  const optionsReactTableDefault = {
    enableGrouping: true,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    enableEditing: true,
    initialState: {
      columnPinning: { right: ['mrt-row-actions'] },
    },
    muiTableContainerProps: { sx: { maxHeight: `${height - 180}px` } },
  };

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    // Thêm sự kiện resize để cập nhật chiều cao màn hình khi kích thước màn hình thay đổi
    window.addEventListener('resize', handleResize);

    // Dọn dẹp sự kiện khi thành phần bị gỡ bỏ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const values = {
    titleGlobal,
    setTitleGlobal,
    userInfo,
    setUserInfo,
    height,
    courseIdSelected,
    setCourseIdSelected,
    optionsReactTableDefault,
  };

  useEffect(() => {
    if (storedValue) {
      setUserInfo(storedValue);
    } else {
      navigation('/auth/signin');
    }
  }, []);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useApp = (): AppState => {
  return useContext(AppContext);
};
