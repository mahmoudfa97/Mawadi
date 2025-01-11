import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ShoppingBag, Heart, Minus, Plus, Headphones, Gift, Truck, ChevronLeft, ChevronRight, Key } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Accordion from "../components/Accordion/Accordion";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { getRelatedProducts } from "../store/slices/productsSlice";
import { IProduct } from "../types/Constants";
import { addToCart, incrementQuantity, decrementQuantity } from "../store/slices/cartSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import { Button } from "../components/UI/button";
import { Input } from "../components/UI/Input";
import { Badge } from "../components/UI/Badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/UI/Dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StockAndDelivery from "../components/StockAndDelivery/StockAndDelivery";
import StaticOffers from "../components/Offers/StaticOffer";
import ItemDetails from "../components/ItemDetails/ItemDetails";

/** 
 * ProductDetailsPage.tsx
 * Purpose: Renders the product details page, allowing users to view product information, images, and reviews.
 * Main Functionalities:
 * - Fetches and displays the current product's details, including images, price, and description.
 * - Allows users to add the product to their cart and adjust quantities.
 * - Displays related products and user reviews.
 * - Includes a carousel for viewing additional product images.
 */
const ProductDetailsPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { relatedProducts } = useAppSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showQuantityInputs, setShowQuantityInputs] = useState<Record<string, boolean>>({});

  const currentProduct: IProduct = location.state;
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const defaultImage = currentProduct.image;
  const displayedImage = selectedImage || defaultImage;
  const reviews = currentProduct?.reviews ?? [];
  const averageRating = useMemo(() => {
    return reviews.length
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
  }, [reviews]);
  const roundedRating = Math.round(averageRating * 2) / 2;
  const totalReviews = reviews.length;

  const openCarousel = (index: number) => {
    setCarouselIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  const nextImage = () => {
    setCarouselIndex((prevIndex) => (currentProduct.additionalImages.length ? (prevIndex + 1) % currentProduct.additionalImages.length : 0));
  };

  const prevImage = () => {
    setCarouselIndex((prevIndex) =>
      currentProduct.additionalImages.length ? (prevIndex - 1 + currentProduct.additionalImages.length) % currentProduct.additionalImages.length : 0
    );
  };
  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(currentProduct.image);
      setCarouselIndex(0);
      dispatch(getRelatedProducts(currentProduct.id));
    }
  }, [dispatch, currentProduct]);

  const incrementQuantities = (productId: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
    dispatch(incrementQuantity(productId));
  };

  const decrementQuantities = (productId: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max((prev[productId] || 1) - 1, 1) }));
    dispatch(decrementQuantity(productId));
  };

  const handleAddToCart = (product: IProduct) => {
    const quantity = quantities[product.id] || 1;
    dispatch(addToCart({ item: { ...product, quantity }, quantity }));
    toast.success("Item added to cart!");
    setShowQuantityInputs((prev) => ({ ...prev, [product.id]: true }));
  };
  const handleMoveToCart = () => {
    navigate("/cart");
  };
  const addToWishList = () => {
    //TODO call api add to wisshlist
  };
  if (!currentProduct) return <div className="text-center py-8">لم يتم العثور على المنتج</div>;

  return (
    <div className="font-sans">
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb selectedPage={currentProduct.name} />

        <div className="container mx-auto p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100" onClick={() => openCarousel(currentProduct.additionalImages.indexOf(selectedImage))}>
                <img src={`${window.location.origin}/${currentProduct.image}`} alt={currentProduct.image} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {currentProduct?.additionalImages?.map((image, idx) => (
                  <button key={idx} className="aspect-square rounded-lg bg-gray-100 overflow-hidden" onClick={() => setSelectedImage(image)}>
                    <img src={`${window.location.origin}/${image}`} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Actions */}
              <div className="flex gap-4">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={() => handleAddToCart}>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add To Cart
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleMoveToCart}>
                  Buy Now
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12">
                  <Heart className="w-4 h-4" onClick={addToWishList} />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <Badge className="bg-green-500 hover:bg-green-600">New Arrival</Badge>
              <h2 className="text-2xl font-semibold">{currentProduct.name}</h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(roundedRating) ? "text-yellow-400 fill-yellow-400" : i < roundedRating ? "text-yellow-400 half-fill" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {roundedRating.toFixed(1)} ({totalReviews})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">₪{currentProduct.price}</span>
                {currentProduct.discount ? <span className="text-sm text-muted-foreground line-through">₪{currentProduct.originalPrice}</span>: ' '}
                <Badge className="text-red-500">{currentProduct.discount}% OFF</Badge>
              </div>
              {currentProduct.colors ? (
                <div>
                  <label className="text-sm font-medium">Colors → Dark</label>
                  <div className="flex gap-2 mt-2">
                    {currentProduct.colors?.map((color, index) => (
                      <button
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 ${index === 0 ? "border-primary" : "border-transparent"}`}
                        aria-label={`Select color ${color}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Size Selection */}
              {currentProduct.sizes ? (
                <div>
                  <label className="text-sm font-medium">Size → M</label>
                  <div className="flex gap-2 mt-2">
                    {currentProduct.sizes?.map((size, index) => (
                      <button
                        key={size}
                        aria-label={`Select size ${size}`}
                        className={`px-3 py-1 rounded border ${index === 1 ? "border-primary bg-primary/10 text-primary" : "border-gray-200"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Quantity */}
              <div>
                <label className="text-sm font-medium">Quantity :</label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex justify-between items-center gap-1  duration-700 ease-in-out transition-all">
                    <button
                      onClick={(e) => decrementQuantities(currentProduct.id)}
                      className="px-3 py-1 rounded border themeButton button-style bg-[#F8F8F8] border-0 h-7 aspect-square sm:h-8 w-7 sm:w-[2.5rem] flex justify-center items-center p-0"
                    >
                      <Minus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                    </button>
                    <div className="border-none quantity-text text-base flex justify-center items-center p-1 h-7 sm:h-8 button-style aspect-square md:min-w-[2.5rem] text-center font-bold cursor-pointer rounded-md text-black bg-[#F8F8F8]">
                      <span className="pb-[0.5px]">{quantities[currentProduct.id] || 1}</span>
                    </div>
                    <button
                      onClick={(e) => incrementQuantities(currentProduct.id)}
                      className="px-3 py-1 rounded border themeButton button-style duration-500 bg-[#F8F8F8] border-0 h-7 w-7 aspect-square sm:h-8 sm:w-[2.5rem] flex justify-center items-center p-0"
                    >
                      <Plus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock & Delivery Info */}
             <StockAndDelivery />

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description :</h3>
                <p className="text-sm text-gray-600">
                  {currentProduct.description}
                 
                </p>
              </div>

              {/* Available offers */}
              <StaticOffers />
            </div>
          </div>
          {/* Features Section */}
          <div className="mt-8 border-t pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium">Free shipping for all orders over ₪200</h3>
                  <p className="text-sm text-muted-foreground">Only in this week</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Special discounts for customers</h3>
                  <p className="text-sm text-muted-foreground">Coupons up to ₪100</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Free gift wrapping</h3>
                  <p className="text-sm text-muted-foreground">With 100 letters custom note</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">Expert Customer Service</h3>
                  <p className="text-sm text-muted-foreground">8:00 - 20:00, 7 days/week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-8 border-t pt-8">
            <ItemDetails item={currentProduct} ></ItemDetails>
          </div>
 {/* Related Products */}
 <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4">You may also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
           <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
          {/* Top Review */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-lg font-semibold mb-4">Top Reviews</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 flex-wrap flex-col">
                {currentProduct.reviews? currentProduct.reviews.map((review, idx) => (
                  <div key={idx+'review'} className="">
                    <img src={`https://robohash.org/${review.name}`} alt={review.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? "text-yellow-400 fill-yellow-400" : i < review.rating ? "text-yellow-400 half-fill" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm font-semibold ml-1">{review.commentTitle}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Reviewed in {review.dateCommented}</p>
                      <p className="mt-2 text-sm">
                        {review.comment}  
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <button>Helpful</button>
                        <button>Report</button>
                      </div>
                    </div>
                  </div>
                )): ''}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Images</DialogTitle>
            <DialogDescription>Use arrow keys or buttons to navigate</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <img src={`${window.location.origin}/${currentProduct.additionalImages[carouselIndex]}`} alt={`Product image ${carouselIndex + 1}`} className="w-full h-auto" />
            <Button variant="outline" size="icon" className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevImage}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={nextImage}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            {currentProduct.additionalImages.map((_: any, idx: number) => (
              <Button key={idx} variant={idx === carouselIndex ? "default" : "outline"} size="sm" className="mx-1" onClick={() => setCarouselIndex(idx)}>
                {idx + 1}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailsPage;
