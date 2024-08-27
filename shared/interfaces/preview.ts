import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Preview {
  category?: string;
  id: number | string | undefined;
  imageLarge?: string | StaticImport;
  imageMedium?: string | StaticImport;
  imageSmall?: string | StaticImport;
  title?: string;
}
