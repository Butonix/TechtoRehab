import { Layout, Menu } from "antd";
import Wrapper from "components/global/wrapper";
import dynamic from "next/dynamic";
import { useState } from "react";
import obj from "../config.json";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { initializeApollo } from "lib/apolloClient";
import Head from "next/head";
import { useStoreState, useStoreActions } from "easy-peasy";

const query = gql`
  {
    settings {
      setting_name
      setting_value
    }
  }
`;

const { Content, Sider } = Layout;
export default function Home() {
  const { loading, error, data } = useQuery(query);
  const sidebar = useStoreState((state) => state.site.sidebar);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error Occured</div>;

  var title = data.settings[0].setting_value;

  return (
    <>
      <Head>
        <title>{obj.theme}</title>
      </Head>
      <Wrapper>
        <div style={{ width: 900 }} />
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: query,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}
