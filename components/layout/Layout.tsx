import Head from "next/head";
import Image from "next/image";
import { SocialMedia } from "../social/SocialMedia";
import { ProjectLinks } from "../social/ProjectLinks";

type MyComponentProps = React.PropsWithChildren<{
  title: string;
  description: string;
}>;

export default function Layout({
  children,
  title,
  description,
}: MyComponentProps) {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main>{children}</main>

      <footer className="flex w-full items-center justify-evenly border-t">
        <SocialMedia />
        <ProjectLinks />
      </footer>
    </div>
  );
}
