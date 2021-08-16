import styled from "@emotion/styled";
import React from "react";
import { Controls } from "./components/Controls";
import { Notifications } from "./components/Notifications";
import { Statistics } from "./components/Statistics";
import { Topbar } from "./components/Topbar";
import { Transactions } from "./components/Transactions";
import { media } from "./style/media";

function App() {
  return (
    <>
      <Notifications />
      <Layout>
        <div style={{ gridArea: "top" }}>
          <Topbar />
        </div>
        <div style={{ gridArea: "statistics" }}>
          <Statistics />
        </div>
        <div style={{ gridArea: "content" }}>
          <Controls />
          <Transactions />
        </div>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: grid;
  flex-grow: 1;
  min-height: 100vh;

  grid-template:
    "top" auto
    "statistics" auto
    "content" 1fr / 1fr;

  ${media.md} {
    grid-template:
      "top top" auto
      "statistics content" 1fr / minmax(300px, 420px) 1fr;
  }
`;

export default App;
