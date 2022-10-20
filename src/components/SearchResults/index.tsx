import { useMemo } from "react";
import { ProductItem } from "../ProductItem";
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";

interface SearchResultsProps {
  results: {
    products: Array<{
      id: number;
      price: number;
      title: string;
      formatedPrice: string;
    }>;
    totalPrice: number;
  };
  onAddToWishList: (id: number) => Promise<void>;
}

export function SearchResults({
  results,
  onAddToWishList,
}: SearchResultsProps): JSX.Element {
  /**
   * O use memo evita que esse calculo seja feito toda vez que o componente for renderizado,
   * agora ele só executa quando o results mudar.
   */

  /**
   * É possível afirmar que o código para gerar o totalPrice só vai executar no momento em que a api retornar os dados,
   * portanto, para evitar que essa comparação do 'results' seja feita, podemos colocar esse calculo ou até mesmo
   * fazer formatações após o retorno da api.
   */
  // const totalPrice = useMemo(
  //   () => results.reduce((acc, product) => acc + product.price, 0),
  //   [results]
  // );

  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results.products[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <p>{results.totalPrice}</p>

      {/* <List width={AutoSizer} /> */}

      {/* <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            rowCount={results.products.length}
            rowHeight={20}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer> */}

      {/* <List
        height={300}
        rowHeight={20}
        width={900}
        overscanRowCount={10}
        rowCount={results.products.length}
        rowRenderer={rowRenderer}
      /> */}

      {results.products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  );
}
