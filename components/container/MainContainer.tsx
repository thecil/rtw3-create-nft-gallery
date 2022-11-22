import { Container, Row, Col, Image } from "react-bootstrap";
import { ConnectBtn } from "../ConnectBtn";

type MyComponentProps = React.PropsWithChildren<{}>;

export default function MainContainer({ children }: MyComponentProps) {
  return (
    <Container fluid>
      <Row>
        <Col sm={8} className="flex space-x-2">
          <video autoPlay loop muted className="w-16 m-4 rounded">
            <source src="/video/au_video.mp4" />
          </video>
          <Image
            src="/img/logo/alchemy-logo-blue-gradient.png"
            className="w-48 self-center"
            alt="Alchemy Logo"
          />
        </Col>

        <Col sm={4} className="flex self-center justify-end">
          <ConnectBtn />
        </Col>
      </Row>

      <Row className="grid grid-cols-3 gap-2 justify-center my-4">{children}</Row>
    </Container>
  );
}
