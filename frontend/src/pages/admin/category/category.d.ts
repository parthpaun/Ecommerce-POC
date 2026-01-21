interface CategoryAddUpdateState {
  open: boolean;
  mode?: string;
  data?: Record<string, unknown>;
}

interface CategoryImageData {
  name?: string | null;
  url?: string | null;
  key?: string | null;
  imageUrl?: string | null;
}

interface Category {
  name: string;
  description: string;
  _id: string;
  attributes: {
    name: string;
    options: string[]; // completely dynamic, product will define actual variant values later
  }[];
  parentCategory?: { _id: string; name: string };
  image?: ImageItem | null;
}

interface CategoryFormValues extends Category {
  parentCategory?: string;
}

interface CategoryFormProps {
  isUpdate?: boolean; // Flag to determine if the form is for updating a category (optional)
}
