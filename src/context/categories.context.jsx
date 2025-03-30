import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // Call this useEffect only once to add the data in firebase
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const category = await getCategoriesAndDocuments();
      setCategoriesMap(category);
    };
    getCategoriesMap();
  }, []);
  const value = { categoriesMap };
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
