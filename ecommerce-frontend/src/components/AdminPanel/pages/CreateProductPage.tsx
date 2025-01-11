// CreateProductPage.tsx
// Purpose: Renders the create product page within an admin layout.
// Main Functionalities:
// - Uses AdminLayout to provide a consistent layout for admin pages.
// - Renders the CreateProduct component to facilitate the creation of a new product.

import AdminLayout from "../AdminLayout";
import CreateProduct from "../components/CreateProduct";

export default function CreateProductPage() {
  return (
    <AdminLayout>
      <CreateProduct />
    </AdminLayout>
  );
}
