import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { useRouter } from "next/router";

interface MemberProps {
  user: {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
  };
}

// diego3g
export async function getStaticPaths() {
  const response = await fetch(`https://api.github.com/orgs/rocketseat/members`);
  const data = await response.json();

  const paths = data?.map((member: any) => ({ params: { login: member.login } })) || [];

  return {
    paths,
    fallback: true, // Isso deixa passar para o getStaticProps
  };
}

export async function getStaticProps({ params }: GetServerSidePropsContext) {
  const login = params?.login;

  const response = await fetch(`https://api.github.com/users/${login}`);
  const user = await response.json();

  return {
    props: {
      user,
    },
    revalidate: 10, // 10 seconds
  };
}

export default function Member({ user }: MemberProps) {
  const { isFallback } = useRouter();

  if (isFallback) return <h1>Carregando...</h1>;

  return (
    <div>
      {/* <h1>Membro</h1> */}
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
