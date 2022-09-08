import { createContext, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const COLLECTIONS = gql`
  query {
  collections{
    id
    title
    items{
      id
      name
    }
  }
}
`



export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  const {data, loading, error} = useQuery(COLLECTIONS);

  console.log(loading);
  console.log(data);
  
  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocuments();
  //     setCategoriesMap(categoryMap);
  //   };

  //   getCategoriesMap();
  // }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
