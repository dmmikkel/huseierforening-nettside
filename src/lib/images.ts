import type { Asset } from "contentful";

export const generateImageUrl = (
  asset: Asset,
  width: number,
  ratio: number
) => {
  return `${asset.fields.file.url}?w=${width}&h=${Math.round(
    width / ratio
  )}&q=70&fit=fill&fm=webp`;
};
