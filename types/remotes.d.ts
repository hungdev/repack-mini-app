declare module 'MiniAppSecond/Info' {
  import React from 'react';
  const Info: React.ComponentType;
  export default Info;
}

declare module 'RepackHostApp/SharedRedux' {
  import React from 'react';
  export const useAppDispatch: () => any;
  export const useAppSelector: (selector: (state: any) => any) => any;
  export const getReducers: () => any;
  export const StoreProvider: React.ComponentType<{children: React.ReactNode}>;
}
