import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Search from "./Components/Search/Search";
import SearchResultsModal from "./Components/Search/SearchResultsModal";
import DatePicker from "./Components/DatePicker/DatePicker";
import BasicInformation from "./Components/BasicInformation/BasicInformation";
import Goal from "./Components/Goal/Goal";
import PersonalPanel from "./Components/PersonalPanel/PersonalPanel";
import ListFood from "./Components/ListFood/ListFood";
import SearchCard from "./Components/SearchCard/SearchCard";
import AddCard from "./Components/AddCard/AddCard";
import Fab from "./Components/Fab/Fab";

import { mobileSet } from "./store/general/slice";
import { selectIsMobile } from "./store/general/selectors";
import { setPersonalData } from "./store/personal/thunks";

import { data } from "./data";

export default function App() {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);

  useEffect(() => {
    const updateWindowDimensions = () => {
      dispatch(mobileSet(window.innerWidth < 768));
    };

    updateWindowDimensions();

    dispatch(setPersonalData(data));

    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [dispatch]);

  return (
    <Container className={isMobile ? "p-0" : ""} fluid={isMobile}>
      <Row className={isMobile ? "m-0" : ""}>
        <Col lg={12} className={isMobile ? "p-0" : ""}>
          <Search />

          {isMobile ? (
            <>
              <BasicInformation />
              <DatePicker />
              <Goal />
              <ListFood />
            </>
          ) : (
            <Container fluid>
              <Row>
                <PersonalPanel />
                <ListFood />
              </Row>
            </Container>
          )}

          <SearchResultsModal />
          <AddCard />
          <Fab />
        </Col>
      </Row>
    </Container>
  );
}