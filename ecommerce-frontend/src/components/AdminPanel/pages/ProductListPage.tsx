// ProductListPage.tsx
// Purpose: Renders the product list page within an admin layout.
// Main Functionalities:
// - Uses AdminLayout to provide a consistent layout for admin pages.
// - Renders the ProductListComponent to display the list of products.

import AdminLayout from "../AdminLayout";
import ProductListComponent from "../components/ProductList";

export default function ProductListPage() {
  return (
    <AdminLayout>
      <ProductListComponent />
    </AdminLayout>
  );
}
