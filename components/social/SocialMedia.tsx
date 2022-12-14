import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import infoData from "../../data/content.json";

interface dataInfo {
  content: {
    info: {
      infoLinks: {
        followSocials: any;
      };
    };
  };
}

export const SocialMedia: React.FC = () => {
  const {
    content: {
      info: {
        infoLinks: { followSocials },
      },
    },
  } = infoData as dataInfo;

  return (
    <div className="mt-3 flex flex-col">
      <h3 className="text-white">Follow Me:</h3>
      <div className="flex space-x-1 items-center">
        {followSocials.map((item: any, i: any) => (
          <Link href={item.LinkHref} key={i}>
            <a target="_blank">
              <Image className="m-2" key={i} src={item.LinkIcon} alt="join" />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
