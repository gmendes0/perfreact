import dynamic from "next/dynamic"; // No React sem Next é possível utilizar a func lazy
import { memo, useState } from "react";
// import { AddProductToWishList } from "../AddProductToWishList"; // usaremos lazy load aqui

// Agora, o AddProductToWishList só vai ser importado quando o componente for chamado e nao no bundle inicial
const AddProductToWishList = dynamic(
  () =>
    import("../AddProductToWishList").then((mod) => mod.AddProductToWishList),
  { loading: () => <span>carregando...</span> }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    formatedPrice: string;
  };
  onAddToWishList: (id: number) => Promise<void>;
}

function ProductItemComponent({
  product,
  onAddToWishList,
}: ProductItemProps): JSX.Element {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  // Também é possível importar libs somente quando precisarmos dela
  // async function showFormattedDate() {
  //   const {format} = await import('date-fns');

  //   format()
  // }

  return (
    <div>
      {product.title} - <strong>{product.formatedPrice}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Add to wishlist
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
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
