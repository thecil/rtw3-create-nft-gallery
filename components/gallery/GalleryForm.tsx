import { Form, Row, Col, InputGroup, Button, Spinner } from "react-bootstrap";
import { useAccount } from "wagmi";
import { useMemo, useState } from "react";
import NFTCard from "../NFTCard";
import PaginationBar from "./PaginationBar";
import { OwnedNfts } from "../NFTCard";

const GalleryForm: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [isFetching, setFetching] = useState(false);
  const [wallet, setWalletAddress] = useState(
    "0x9B5416219dc491519cdf4523C0c2Ed290b780A9f"
  );
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState<OwnedNfts[]>([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageKeys, setPageKeys] = useState([""]);

  const api_key = process.env.NEXT_PUBLIC_ALCHEMY_ID;
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;

  const fetchNFTs = async () => {
    let nfts;
    setFetching(true);
    try {
      var requestOptions = {
        method: "GET",
      };

      if (!collection.length) {
        const fetchURL = `${baseURL}?owner=${wallet}`;
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
      } else {
        console.log("fetching nfts for collection owned by address");
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
      }

      if (nfts) {
        setNFTs(nfts.ownedNfts);
        console.log("fetchNFTs:", { nfts }, { NFTs });
        setFetching(false);
      }
    } catch (error) {
      setFetching(false);
      console.log("fetchNFTs Error:", error);
    }
  };

  const fetchNFTsForCollection = async (
    e: any,
    startToken = "",
    pageIndex = 0
  ) => {
    if (collection) {
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true&startToken=${startToken}`;

      try {
        const nfts = await fetch(fetchURL, {
          method: "GET",
        }).then((data) => data.json());

        if (nfts) {
          if (nfts.nextToken) {
            setPageKeys((prevKeys) => {
              const newKeys = [...prevKeys];
              newKeys[pageIndex + 1] = nfts.nextToken;

              return newKeys;
            });
          }
          setNFTs(nfts.nfts);
          setFetching(false);
        }
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    }
  };

  const onSearchClicked = async (e: any) => {
    e.preventDefault();
    fetchForCollection ? fetchNFTsForCollection(e, "", 0) : fetchNFTs();
  };

  //Onclick funtion that navigates pagination
  const onClickPage = (e: any, pageIndex: number) => {
    if (currentPage === pageIndex) return;

    try {
      fetchNFTsForCollection(e, pageKeys[pageIndex], pageIndex);
      setCurrentPage(pageIndex);
    } catch (error) {
      console.log(error);
    }
  };

  const nftsContent = useMemo(() => {
    if (NFTs.length >= 1) {
      return (
        <div className="grid grid-cols-3 gap-2 mt-6">
          {NFTs.map((nft, i) => {
            return <NFTCard nft={nft} key={i} />;
          })}
        </div>
      );
    } else {
      return <></>;
    }
  }, [NFTs]);

  return (
    <>
      <Row className="flex justify-center">
        <Col md={6} className="my-4">
          <Form onSubmit={onSearchClicked}>
            <Row>
              <Col className="rounded p-2 w-full border-2 border-slate-600">
                {isFetching ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <fieldset className="flex space-x-2 items-center">
                    <Form.Check
                      className="text-white space-x-2"
                      type="switch"
                      id="switch-fetchCollection"
                      onChange={({ target }) =>
                        setFetchForCollection(target.checked)
                      }
                    />
                    <InputGroup className="gap-2 " size="sm">
                      {fetchForCollection ? (
                        <>
                          <Form.Text className="text-white">
                            Collection:
                          </Form.Text>
                          <Form.Control
                            className="rounded"
                            name="collection"
                            type="text"
                            value={collection}
                            onChange={({ target }) =>
                              setCollectionAddress(target.value)
                            }
                            placeholder="Add the collection address"
                          />
                        </>
                      ) : (
                        <>
                          <Form.Text className="text-white">
                            Wallet/ENS:
                          </Form.Text>
                          <Form.Control
                            className="rounded"
                            name="wallet"
                            type="text"
                            value={wallet}
                            onChange={({ target }) =>
                              setWalletAddress(target.value)
                            }
                            placeholder="Add your wallet address"
                          />
                        </>
                      )}

                      <Button
                        type="submit"
                        variant="success"
                        size="sm"
                        className="w-max rounded"
                      >
                        Lets Go!
                      </Button>
                      <Button
                        hidden={!isConnected}
                        type="submit"
                        variant="success"
                        size="sm"
                        className="w-max rounded"
                        onClick={() => setWalletAddress(address as string)}
                      >
                        My Gallery
                      </Button>
                    </InputGroup>
                  </fieldset>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <>
        {pageKeys.length > 1 && (
          <PaginationBar
            currentPage={currentPage}
            pageKeys={pageKeys}
            onClickPage={onClickPage}
          />
        )}
        {nftsContent}{" "}
        {pageKeys.length > 1 && (
          <PaginationBar
            currentPage={currentPage}
            pageKeys={pageKeys}
            onClickPage={onClickPage}
          />
        )}
      </>
    </>
  );
};

export default GalleryForm;
