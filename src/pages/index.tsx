import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { SearchResults } from "./components/SearchResults";

type TResults = Array<{
  id: number;
  price: number;
  title: string;
}>;

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<TResults>([]);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);

    const data: TResults = await response.json();

    setResults(data);
  }

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

        <SearchResults results={results} />
      </div>
    </>
  );
};

export default Home;
