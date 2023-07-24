import { GetStaticProps } from "next";

import styles from "./page.module.css";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const response = await fetch("https://api.github.com/orgs/rocketseat");
//   const data = await response.json();

//   return {
//     props: {
//       org: data,
//     },
//     revalidate: 10,
//   };
// };
async function getPosts() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  // const staticData = await fetch(`https://api.github.com/orgs/rocketseat`, { cache: 'force-cache' })

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // const dynamicData = await fetch(`https://api.github.com/orgs/rocketseat`, { cache: 'no-store' })

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  // const revalidatedData = await fetch(`https://api.github.com/orgs/rocketseat`, {
  //   next: { revalidate: 10 },
  // })

  const res = await fetch("https://api.github.com/orgs/rocketseat");
  const posts = await res.json();
  return posts;
}

export default async function Home() {
  const org = await getPosts();
  console.log(org);

  return (
    <main className={styles.main}>
      <div>
        {/* <h1>Hello world</h1> */}
        <h1>{org.login ? org.login : ""}</h1>
        <h3>{org.description}</h3>

        <p>
          Site: <a href={org.blog}>{org.blog}</a>
        </p>
      </div>
    </main>
  );
}
