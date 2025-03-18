interface CategoryAddUpdateState {
  open: boolean;
  mode?: string;
  data?: Record<string, unknown>;
}

interface CategoryFormValues {
  name: string;
  description: string;
  attributes: Record<string, unknown>[];
  images: ImageData[];
  parentCategory?: string; // Optional parent category
}

interface CategoryFormProps {
  isUpdate?: boolean; // Flag to determine if the form is for updating a category (optional)
}
