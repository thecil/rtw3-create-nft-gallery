import { Card, Col } from "react-bootstrap";
import { ethers } from "ethers";

export interface OwnedNfts {
  title: string;
  contract: { address: string };
  balance: string;
  contractMetada: { openSea: any; tokenType: string };
  description: string;
  id: { tokenId: string; tokenMetada: any };
  media: {
    bytes: number;
    format: string;
    gateway: string;
    thumbnail: string;
  }[];
  metadata: any;
  timeLastUpdate: string;
  tokenUri: { gateway: string; raw: string };
}

export interface nftCardProps {
  nft: OwnedNfts;
  index: number;
}

const NFTCard: React.FC<nftCardProps> = ({ nft, index }) => {
  const toBN = (text: string) => {
    const _bn = ethers.BigNumber.from(text);
    return _bn.toString();
  };

  return (
    <Col key={index} className="flex justify-center">
      <Card className="rounded w-64">
        <Card.Img variant="top" src={nft.media[0].gateway} />
        <Card.Header as={"h5"} className="font-sans">
          {nft.title}
        </Card.Header>
        <Card.Body>
          <Card.Title>{toBN(nft.id.tokenId)}</Card.Title>
          <Card.Subtitle className="mb-2 truncate">
            {nft.contract.address}
          </Card.Subtitle>
          <Card.Text className="text-black">{nft.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NFTCard;
