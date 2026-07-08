import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import InputSearch from "./InputSearch";
import DatePicker from "../DatePicker/DatePicker";

import { selectIsMobile } from "../../store/general/selectors";

import "./Search.css";

export default function Search() {
  const isMobile = useSelector(selectIsMobile);

  if (isMobile) {
    return (
      <div className="Search">
        <div className="d-flex flex-nowrap justify-content-center">
          <div className="w-100 p-3">
            <InputSearch />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container className="Search" fluid>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <InputSearch />
          <DatePicker />
        </Col>
      </Row>
    </Container>
  );
}