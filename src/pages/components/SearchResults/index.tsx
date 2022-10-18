import { useMemo } from "react";
import { ProductItem } from "../ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps): JSX.Element {
  /**
   * O use memo evita que esse calculo seja feito toda vez que o componente for renderizado,
   * agora ele só executa quando o results mudar.
   */
  const totalPrice = useMemo(
    () => results.reduce((acc, product) => acc + product.price, 0),
    [results]
  );

  return (
    <div>
      <p>{totalPrice}</p>

      {results.map((product) => (
        <ProductItem product={product} />
      ))}
    </div>
  );
}
