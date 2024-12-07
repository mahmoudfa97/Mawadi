'use client'

import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Upload } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../UI/select'
import { Label } from '../../UI/label'
import { Input } from '../../UI/Input'
import { Textarea } from '../../UI/Textarea'
import { Button } from '../../UI/button'
import { IProduct } from '../../../types/Constants'

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


export default function EditProduct({ initialProduct }: { initialProduct: IProduct }) {
  const [formData, setFormData] = useState<IProduct>(initialProduct)
  const [isTagClicked, setIsTagClicked] = useState(false)
  const [tag, setTag] = useState<string>('')

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
      reader.onload = (e: any) => {
        const newImage = e.target?.result as string
        setFormData((prev) => ({ ...prev, images: [newImage] }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes?.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }))
  }

  const handleColorToggle = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors?.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }))
  }

  const handleReset = () => {
    setFormData(initialProduct)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleAddTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTag(tag)
      setIsTagClicked(false)
    }
  }

  const addTag = (tag: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: [...prevFormData.tags, tag],
    }))
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Product Edit</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left column (Image Section) */}
        <div className="space-y-6 lg:space-y-8">
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
                    {formData.sizes?.map((size) => (
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

        {/* Right column (Form Section) */}
        <div className="space-y-8">
          {/* Image Upload */}
          <div
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed rounded-lg p-8 text-center mb-6"
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
                    onChange={(e: any) => {
                      if (e.target.files) {
                        handleImageSelection(Array.from(e.target.files))
                      }
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400">
                1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
              </p>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Product Information</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="category">Product Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e: any) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={6}
              />
            </div>
          </div>

          {/* Pricing Details */}
          <div>
            <h2 className="text-lg font-semibold">Pricing Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  value={formData.discount}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, discount: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="tax">Tax</Label>
                <Input
                  id="tax"
                  value={formData.tax}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, tax: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
