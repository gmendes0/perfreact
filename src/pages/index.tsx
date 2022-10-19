import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "./components/SearchResults";

type TResults = {
  products: TProductsResponse;
  totalPrice: number;
};

type TProductsResponse = Array<{
  id: number;
  price: number;
  title: string;
  formatedPrice: string;
}>;

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<TResults>({
    totalPrice: 0,
    products: [],
  });

  const formater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);

    const data: TProductsResponse = await response.json();

    const totalPrice = data.reduce((acc, product) => acc + product.price, 0);

    const products = data.map((product) => ({
      ...product,
      formatedPrice: formater.format(product.price),
    }));

    setResults({
      products,
      totalPrice,
    });
  }

  /**
   * Toda vez que o componente for renderizado, todas as functions serão recriadas do 0 também, ou seja
   * ocuparão um novo espaço na memória.
   *
   * Como essa function está sendo passada nas props do SearchResults, e ela é uma função referencialmente diferente
   * da antiga, o React considerará que as props do SearchResults mudaram, e fará com que o componente seja renderizado
   * novamente com as props atualizadas.
   */

  // async function addToWishList(id: number) {
  //   console.log(`Added to wish list: ${id}`);
  // }

  const addToWishList = useCallback(async (id: number) => {
    console.log(`Added to wish list: ${id}`);
  }, []);

  return (
    <>
      <Head>
        <title>Performace Reaact</title>
      </Head>

      <div>
        <h1>Search</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        <SearchResults results={results} onAddToWishList={addToWishList} />
      </div>
    </>
  );
};

export default Home;
