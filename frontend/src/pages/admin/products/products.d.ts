interface ProductAddUpdateState {
  open: boolean;
  mode?: string;
  data?: Record<string, unknown>;
}

interface FileResponse {
  path: string;
  fileName: string;
  relativePath: string;
}
interface ProductInputs {
  name: string;
  parentCategory?: string;
  description?: string;
  files: FileResponse[];
}

interface ProductFormProps {
  isUpdateProduct?: boolean; // Flag to determine if the form is for updating a product (optional)
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  basePrice: string;
  discount: string;
  variations: Variation[];
  images: ImageData[];
  stock: string;
  sku: string;
}

interface Variation {
  color?: string;
  size?: string;
  storage?: string;
  price: number;
  discountPrice?: number;
  stock: number;
}

interface ImageResponse {
  fileName: string;
  key: string;
}

interface ImageData extends ImageResponse {
  imageUrl: string;
}
