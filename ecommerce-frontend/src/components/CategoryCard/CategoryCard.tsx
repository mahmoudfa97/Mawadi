import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: string | undefined;
  iname: string;
}
const CategoryCard = (ProductCardProps: CategoryCardProps) => {
  return (
    <Link to={`/productlisting/${ProductCardProps.iname}`}>
    <div className="rounded-3xl p-6 flex flex-col items-center justify-center">
      <img className='rounded-3xl' src={ProductCardProps.icon}/>
      <h3 className="text-lg font-semibold text-center">{ProductCardProps.iname}</h3>
    </div>
    </Link>
  );
};

export default CategoryCard;
