import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

function ProductItemComponent({ product }: ProductItemProps): JSX.Element {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
}

/**
 * shallow compare -> comparação rasa
 * {} === {} | false
 * igualdade referencial (compara se os obj então ocupando o mesmo espaço na memória)
 */

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) =>
  Object.is(prevProps.product, nextProps.product)
);
