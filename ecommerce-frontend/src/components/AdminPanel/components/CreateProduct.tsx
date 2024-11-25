'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Label } from '../../UI/label'
import { Input } from '../../UI/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../UI/select'
import { Button } from '../../UI/button'
import { Textarea } from '../../UI/Textarea'


interface ProductFormData {
  name: string
  brand: string
  weight: string
  gender: string
  sizes: string[]
  colors: string[]
  description: string
  tagNumber: string
  stock: string
  price: string
  discount: string
  tax: string
  images: File[]
}

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
const availableColors = [
  { name: 'Navy', value: '#000080' },
  { name: 'Yellow', value: '#FFD700' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Green', value: '#008000' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Blue', value: '#0000FF' },
]

export default function CreateProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    weight: '',
    gender: '',
    sizes: [],
    colors: [],
    description: '',
    tagNumber: '',
    stock: '',
    price: '',
    discount: '',
    tax: '',
    images: []
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

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
      setFormData(prev => ({ ...prev, images: [file] }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  const calculateFinalPrice = () => {
    const basePrice = parseFloat(formData.price) || 0
    const discount = parseFloat(formData.discount) || 0
    const discountedPrice = basePrice - (basePrice * (discount / 100))
    return discountedPrice.toFixed(2)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Product preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image selected
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${calculateFinalPrice()}</span>
                  {formData.discount && (
                    <span className="text-lg text-gray-500 line-through">${formData.price}</span>
                  )}
                </div>
                {formData.discount && (
                  <span className="text-sm text-green-600">{formData.discount}% OFF</span>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Size</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          formData.sizes.includes(size)
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Colors</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => handleColorToggle(color.value)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.colors.includes(color.value)
                            ? 'border-primary'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">Create Product</Button>
            <Button type="button" variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Upload */}
          <div
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
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
                    onChange={(e) => {
                      if (e.target.files) {
                        handleImageSelection(Array.from(e.target.files))
                      }
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400">
                1000 x 1000 (1:1) recommended. PNG, JPG and GIF files are allowed
              </p>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Product Information</h2>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Item Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="Brand Name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="In gm/kg"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Short description about the product"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tagNumber">Tag Number</Label>
                  <Input
                    id="tagNumber"
                    value={formData.tagNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagNumber: e.target.value }))}
                    placeholder="#####"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    placeholder="Quantity"
                  />
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
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount</Label>
                <div className="relative">
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                    className="pr-7"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tax">Tax</Label>
                <Input
                  id="tax"
                  type="number"
                  value={formData.tax}
                  onChange={(e) => setFormData(prev => ({ ...prev, tax: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}