import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Search from "@/components/nutrition/Search/Search";
import DatePicker from "@/components/dashboard/DatePicker/DatePicker";
import PersonalPanel from "@/components/dashboard/PersonalPanel/PersonalPanel";
import Goal from "@/components/nutrition/Goal/Goal";
import BasicInformation from "@/components/profile/BasicInformation/BasicInformation";
import ListFood from "@/components/nutrition/ListFood/ListFood";
import AddCard from "@/components/nutrition/AddCard/AddCard";
import SearchResultsModal from "@/components/nutrition/Search/SearchResultsModal";
import Fab from "@/components/shared/Fab/Fab";

import { mobileSet } from "@/store/general/slice";
import { selectIsMobile } from "@/store/general/selectors";
import { setPersonalData } from "@/store/personal/thunks";

export default function App() {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);

  useEffect(() => {
  const updateWindowDimensions = () => {
    dispatch(mobileSet(window.innerWidth < 768));
  };

  window.addEventListener("resize", updateWindowDimensions);
  updateWindowDimensions();

  dispatch(setPersonalData());

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