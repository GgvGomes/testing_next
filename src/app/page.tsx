import { GetStaticProps } from "next";

import styles from "./page.module.css";

export default function Home({ org }: any) {
  return (
    <main className={styles.main}>
      <div>
        <h1>{org.login ? org.login : ""}</h1>
        {/* <h3>{org.description}</h3>

        <p>Site: <a href={org.blog}>{org.blog}</a></p> */}
      </div>
    </main>
  );
}

// Testar no novo next
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://api.github.com/orgs/rocketseat");
  const data = await response.json();
  console.log(data);

  return {
    props: {
      org: data,
    },
    revalidate: 10,
  };
};
