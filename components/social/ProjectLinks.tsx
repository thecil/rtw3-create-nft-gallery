import Link from "next/link";

export const ProjectLinks: React.FC = () => {
  return (
    <>
      <div className="mt-3 flex flex-col">
        <h3 className="text-white">Read more about this project:</h3>
        <ul className="list-disc pl-8">
          <li>
            <Link href="https://docs.alchemy.com/docs/4-how-to-create-an-nft-gallery#6-trigger-the-fetchnfts-and-fetchnftsbycollection-functions">
              <a target="_blank" className="text-blue-400 text-sm">
                How to Create an NFT Gallery
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/thecil/rtw3-pok-buy-me-a-coffee-defi">
              <a target="_blank" className="text-blue-400 text-sm">
                GitHub Repo
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
