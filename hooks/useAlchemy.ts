import { useState, useMemo } from "react";

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

export const useAlchemy = () => {
    const [isFetching, setFetching] = useState(false);
    const [wallet, setWalletAddress] = useState("0x9B5416219dc491519cdf4523C0c2Ed290b780A9f");
    const [collection, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState<OwnedNfts[]>([]);
    const [fetchForCollection, setFetchForCollection] = useState(false);

    const api_key = process.env.NEXT_PUBLIC_ALCHEMY_ID;
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;


    const fetchNFTs = async () => {
        let nfts;
        setFetching(true);
        try {
            var requestOptions = {
                method: 'GET'
            };

            if (!collection.length) {
                const fetchURL = `${baseURL}?owner=${wallet}`;
                nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
            } else {
                console.log("fetching nfts for collection owned by address");
                const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
                nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
            }

            if (nfts) {
                
                setNFTs(nfts.ownedNfts);
                console.log("fetchNFTs:", {nfts}, {NFTs});
                setFetching(false);
            }
        } catch (error) {
            setFetching(false);
            console.log('fetchNFTs Error:', error);
        }

    }

    const fetchNFTsForCollection = async () => {
        if (collection.length) {
            setFetching(true);
            try {
                var requestOptions = {
                    method: 'GET'
                };
                const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
                const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
                if (nfts) {
                    console.log("fetchNFTsForCollection:", nfts);
                    setNFTs(nfts.nfts);
                    setFetching(false);
                }
            } catch (error) {
                setFetching(false);
                console.log('fetchNFTsForCollection Error:', error);
            }
        }
    }

    return {
        isFetching,
        wallet,
        collection,
        NFTs,
        fetchForCollection,
        fetchNFTs,
        fetchNFTsForCollection,
        setFetchForCollection,
        setWalletAddress,
        setCollectionAddress,
    };
};