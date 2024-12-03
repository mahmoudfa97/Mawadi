'use client'

import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Upload } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../UI/select'
import { Label } from '../../UI/label'
import { Input } from '../../UI/Input'
import { Textarea } from '../../UI/Textarea'
import { Button } from '../../UI/button'
import { IProduct } from '@/src/types/Constants'


const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
const availableColors = [
  { name: 'Navy', value: '#000080' },
  { name: 'Yellow', value: '#FFD700' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Green', value: '#008000' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Blue', value: '#0000FF' },
]

// Mock initial product data
const initialProduct: ProductFormData = {
  name: 'Men Black Slim Fit T-shirt',
  brand: 'Larkon Fashion',
  weight: '300gm',
  gender: 'Men',
  sizes: ['S', 'M', 'XL', 'XXL'],
  colors: ['#000080', '#FFD700', '#FFFFFF', '#FF0000'],
  description: 'Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem. Small metal text applique.',
  tagNumber: '36294007',
  stock: '465',
  price: '80',
  discount: '30',
  tax: '3',
  images: ['/placeholder.svg?height=400&width=400'],
  category: 'Fashion'
}
interface ProductFormData {
    id?: number;
    name: string;
    category: string;
    brand: string;
    weight: string;
    gender: string;
    sizes: string[];
    colors: string[];
    description: string;
    tagNumber: string;
    stock: string;
    price: string;
    discount: string;
    tax: string;
    images: string[];
    status?: string;
  }
interface EditProductProps {
    initialProduct: IProduct;
  }
export default function EditProduct({ initialProduct }: EditProductProps){
    const [formData, setFormData] = useState<IProduct>(initialProduct);
    const [isTagClicked, setisTagClicked] = useState<boolean>(false);
    const [tag, setTag] = useState<string>('');
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleImageSelection(files)
    }
  }

  const handleImageSelection = (files: File[]) => {
    const file = files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e:any) => {
        const newImage = e.target?.result as string
        setFormData(prev => ({ ...prev, images: [newImage] }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.size.includes(size)
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size]
    }))
  }

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }))
  }

  const handleReset = () => {
    setFormData(formData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }
  const handleAddTag = (e: ChangeEvent<HTMLInputElement>) =>{
    let value = e.target.value
    setTag(value)
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>)=>{
    if (e.key === 'Enter') {
      addTag(tag)
      setisTagClicked
    }
  }
  const addTag = (tag: string)=>{
    setFormData((prevFormData) => ({
      ...prevFormData, // Keep the existing formData
      tags: [...prevFormData.tags, tag], // Add the new tag to the tags array
    }));
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">PRODUCT EDIT</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white">
              <img
                src={formData.image}
                alt={formData.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-gray-500 line-through">${formData.price}</span>
                <span className="text-2xl font-bold">${formData.price}</span>
                <span className="text-sm text-green-600">{formData.discount}% OFF</span>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Size</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.size?.map((size) => (
                      <div
                        key={size}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Colors</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.colors?.map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Upload */}
          <div
            onDrop={handleImageDrop}
            onDragOver={(e:any) => e.preventDefault()}
            className="border-2 border-dashed rounded-lg p-8 text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <div className="text-sm text-gray-600">
                Drop your images here, or{' '}
                <label className="text-primary hover:underline cursor-pointer">
                  click to browse
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e:any) => {
                      if (e.target.files) {
                        handleImageSelection(Array.from(e.target.files))
                      }
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400">
                1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
              </p>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Product Information</h2>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Product Categories</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value:any) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value:any) => setFormData(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                      <SelectItem value="Unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Size</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        formData.size?.includes(size)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Colors</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {availableColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleColorToggle(color.value)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        formData.colors?.includes(color.value)
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e:any) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tagNumber">Tag Number</Label>
                  <Input
                    id="tagNumber"
                    value={formData.tagNumber}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, tagNumber: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    value={formData.inStock?.left}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Label>Tag</Label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {formData.tags?.map((tag)=>(
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-md text-sm font-medium">
                      {tag}
                    </span>)

                    )}
                    
                    {isTagClicked? (
                      <input className='px-3 py-1 bg-orange-100 text-orange-600 rounded-md text-sm font-medium' onKeyPress={(e)=>handleKeyPress(e)} onChange={(e)=>handleAddTag(e)} ></input> 
                    ): ''}
                    <button
                      type="button"
                      className="px-2 py-1 bg-orange-500 text-white rounded-md text-sm"
                      onClick={()=> setisTagClicked(true)}
                    >
                      +
                    </button>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Pricing Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="pl-7"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount</Label>
                <div className="relative">
                  <Input
                    id="discount"
                    value={formData.discount}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                    className="pr-7"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tax">Tax</Label>
                <div className="relative">
                  <Input
                    id="tax"
                    value={formData.tax}
                    onChange={(e:any) => setFormData(prev => ({ ...prev, tax: e.target.value }))}
                    className="pr-7"
                  />
                  <span className="/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Save
            </Button>
          </div>
        </div>
      </form>

     
    </div>
  )
}