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
  const res = await fetch("https://api.github.com/orgs/rocketseat", {
    cache: "force-cache",
    next: { revalidate: 10 }
  });

  const posts = await res.json();
  return posts;
}

export default async function Home() {
  const org = await getPosts();

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
