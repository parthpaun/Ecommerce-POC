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

type SpecificationDetail = {
  key: string;
  value: string;
};

type Specification = {
  section: string;
  attributes: SpecificationDetail[];
};

interface FormValues {
  name: string;
  description: string;
  brand: string;
  category: string;
  basePrice: string;
  discount: string;
  variations: Variation[];
  images: ImageData[];
  stock: string;
  sku: string;
  specifications: Specification[];
}

interface Variation {
  [key: string]: string | number;
}

interface ImageResponse {
  fileName: string;
  key: string;
}

interface ImageData extends ImageResponse {
  imageUrl: string;
}

