// UserActions.js
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "../Constants/Constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getSpecialProducts } from "../../store/productsSlice";
interface BreadcrumbProps {
    selectedPage: string
}
const Breadcrumb = (props: BreadcrumbProps) => {
  const { specialProducts, loading, error } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSpecialProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (


    <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-gray-700">بيت</Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li>
              <span className="text-gray-700" aria-current="page">{props.selectedPage}</span>
            </li>
          </ol>
        </nav>
   

  );
};

export default Breadcrumb;
