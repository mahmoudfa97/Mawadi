'use client'

import { useState } from 'react'
import { Eye, Edit, Trash2, Download, Upload, FileText, Plus, Star } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../UI/DropdownMenu"
import { Button } from "../../UI/button"
import {  Label } from "../../UI/label"
import { useAppSelector } from '../../../store/hooks'
import { Modal } from '../../ModalComponent/Modal'
import CreateProduct from './CreateProduct'
import EditProduct from './EditProduct'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../UI/Dialog'
import { Input } from '../../UI/Input'

interface Product {
  id: string
  name: string
  sizes: string[]
  price: number
  stock: {
    left: number
    sold: number
  }
  category: string
  rating: number
  reviews: number
  image: string
}



export default function ProductList() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { products } = useAppSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewProduct, setViewProduct] = useState<typeof products[0] | null>(null)
  const [editProduct, setEditProduct] = useState<typeof products[0] | null>(null)
  const [removeProduct, setRemoveProduct] = useState<typeof products[0] | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map(p => p.id))
    }
  }

  const handleSelectProduct = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleRemoveProduct = () => {
    // Implement remove logic here
    console.log('Removing product:', removeProduct)
    setRemoveProduct(null)
  }
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const toggleSelectAll = () => {
    if (selectedItems.length === products.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(products.map(product => `${product.id}`))
    }
  }

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <div className="flex items-center text-yellow-400">
          <Star className="h-4 w-4 fill-current" />
        </div>
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow container mx-auto px-4 py-8 mt-10">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Product List</h2>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={openModal}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === products.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name & Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(`${product.id}`)}
                      onChange={() => toggleSelectItem(`${product.id}`)}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          Size: {product.size?.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{product.inStock.left} Item Left</div>
                      <div className="text-gray-500">{product.inStock.sold} Sold</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {renderStarRating(product.rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        {product.reviews} Reviews
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" onClick={() => setViewProduct(product)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditProduct(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setRemoveProduct(product)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {products.length} of {products.length} products
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded-md bg-orange-500 text-white"
            >
              1
            </button>
            <button
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              2
            </button>
            <button
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              3
            </button>
            <button
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
            {/* View Product Modal */}
            <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Product</DialogTitle>
          </DialogHeader>
          {viewProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={viewProduct.name} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input id="category" value={viewProduct.category} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" value={`$${viewProduct.price}`} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input id="stock" value={`${viewProduct.inStock}`} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input id="status" value={`${viewProduct.status}`} className="col-span-3" readOnly />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editProduct && <EditProduct initialProduct={editProduct} />}
        </DialogContent>
      </Dialog>

      {/* Remove Product Modal */}
      <Dialog open={!!removeProduct} onOpenChange={() => setRemoveProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {removeProduct && (
            <div className="py-4">
              <p><strong>Product:</strong> {removeProduct.name}</p>
              <p><strong>Category:</strong> {removeProduct.category}</p>
              <p><strong>Price:</strong> ${removeProduct.price}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveProduct(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveProduct}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateProduct />
      </Modal>
    </div>
  )
}