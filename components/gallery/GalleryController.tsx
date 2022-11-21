import React, { useEffect, useMemo, useState } from "react";

import Layout from "../layout/Layout";
import MainContainer from "../container/MainContainer";
import GalleryForm from "./GalleryForm";
import Spinner from "react-bootstrap/Spinner";

const UiStages = {
  error: -1,
  loading: 0,
  connect: 1,
  gallery: 2,
};

const GalleryController: React.FC = () => {
  const [stage, setStage] = useState(UiStages.gallery);


  const content = useMemo(() => {
    switch (stage) {
      case UiStages.loading:
        return <Spinner className="w-24 h-24 border " animation="border" variant="light" />;

      case UiStages.error:
        <div>Error</div>;
        break;

      case UiStages.connect:
        return <h1>Please Connect a Wallet first</h1>;

      case UiStages.gallery:
        return <GalleryForm />;

      default:
        <div />;
    }
  }, [stage]);

  return (
    <Layout
      title="Alchemy - Create an NFT Gallery"
      description="Alchemy - Create an NFT Gallery"
    >
      <MainContainer>
        {content}
      </MainContainer>
    
    </Layout>
  );
};

export default GalleryController;
