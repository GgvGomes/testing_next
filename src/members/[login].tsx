import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Member({ user }: any) {
  const { isFallback } = useRouter();

  if (isFallback) return <h1>Carregando...</h1>;

  return (
    <div>
      <img
        src={user.avatar_url}
        alt={user.name}
        width="80"
        style={{ borderRadius: 40 }}
      />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}

// diego3g
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.github.com/orgs/rocketseat/members`);
  const data = await response.json();

  const paths = data.map((member: any) => ({ params: { login: member.login } }));

  return {
    paths,
    fallback: true, // Isso deixa passar para o getStaticProps
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params;
  const login = params?.login;

  const response = await fetch(`https://api.github.com/users/${login}`);
  const data = await response.json();

  return {
    props: {
      user: data,
    },
    notFound: true,
    redirect: 60 * 60 * 24, // 24 hours
    revalidate: 10, // 10 seconds
  };
};
