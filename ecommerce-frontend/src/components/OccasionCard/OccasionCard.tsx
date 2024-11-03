
interface OccasionCardProps {
  icon: string;
  iname: string;
}
const OccasionCardProps = {
  icon: "",
  iname: "",
};
const OccasionCard = (OccasionCardProps: OccasionCardProps) => {

  return (
    <>
    <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center ">
      <img src={OccasionCardProps.icon} alt={OccasionCardProps.iname} className="w-full h-full object-contain" />
      <h3 className="text-lg font-semibold text-center text-gray-800">{OccasionCardProps.iname}</h3>
  </div>
    </>
  );
};

export default OccasionCard;
