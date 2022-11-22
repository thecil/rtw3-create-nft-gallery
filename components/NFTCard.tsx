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
}

const NFTCard: React.FC<nftCardProps> = ({ nft }) => {
  const splitGateway = nft.media[0].gateway.split(".");
  const fileType = splitGateway.slice(-1)[0];
  
  const toBN = (text: string) => {
    const _bn = ethers.BigNumber.from(text);
    return _bn.toString();
  };

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(nft.contract.address);
    alert("Copied");
  };

  const truncate = (str: string) => {
    if (str.length > 10) {
      return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
    } else {
      return str;
    }
  };

  return (
    <Col className="flex justify-center">
      <Card className="rounded bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl overflow-hidden">
        {fileType === "mp4" ? (
          <video loop autoPlay muted className="object-cover h-128 w-full">
            <source src={nft.media[0].gateway} type="video/mp4" />
          </video>
        ) : (
          <Card.Img variant="top" src={nft.media[0].gateway} />
        )}

        <Card.Header as={"h5"} className="font-sans text-white">
          {nft.title}
        </Card.Header>
        <Card.Body >
          <Card.Title className="text-white">ID: {truncate(toBN(nft.id.tokenId))}</Card.Title>
          <Card.Subtitle className="mb-2 text-white">
            {truncate(nft.contract.address)}
          </Card.Subtitle>
          <Card.Text className="text-white truncate">{nft.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NFTCard;
