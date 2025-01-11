import { IProduct } from "@/src/types/Constants";
import React from "react";

interface itemDetailsProps {
    item: IProduct
}

const ItemDetails: React.FC<itemDetailsProps> = (ItemDetails:itemDetailsProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-lg font-semibold mb-4">Items Detail</h2>
    <div className="grid grid-cols-2 gap-y-4 text-sm">
      <div>
        <span className="font-medium">Product Dimensions :</span> {`${ItemDetails.item.dimensions} cm; ${ItemDetails.item.weight} grams`}
      </div>
      <div>
        <span className="font-medium">Date First Available :</span> {ItemDetails.item.dateAdded}
      </div>
      <div>
        <span className="font-medium">Department :</span> {ItemDetails.item.gender}
      </div>
      <div>
        <span className="font-medium">Manufacturer :</span> {ItemDetails.item.brand}
      </div>
      <div>
        <span className="font-medium">Item Category :</span> {ItemDetails.item.category}
      </div>
      <div>
        <span className="font-medium">Item Weight :</span> {ItemDetails.item.weight}
      </div>
      <div>
        <span className="font-medium"> Occasions:</span> {ItemDetails.item.occasion?.map((occ)=> <span className="font-light"> {occ}</span>)}
      </div>
      <div>
        <span className="font-medium">Tags :</span> {ItemDetails.item.tags?.map((tag)=> <span className="font-light"> {tag}</span>)}
      </div>
      
    </div>
    </div>
  );
};

export default ItemDetails;
