import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { searchModal } from "@/store/general/thunks";
import {
  selectIsMobile,
  selectSearchText,
} from "@/store/general/selectors";

export default function InputSearch() {
  const dispatch = useDispatch();

  const isMobile = useSelector(selectIsMobile);
  const searchText = useSelector(selectSearchText);

  const [value, setValue] = useState(searchText);

  useEffect(() => {
    setValue(searchText);
  }, [searchText]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.trim() === "") {
        dispatch(searchModal(false, ""));
      } else {
        dispatch(searchModal(true, value));
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, dispatch]);

  const handleOnKeyDown = (event) => {
    if (event.key === "Escape") {
      setValue("");
      dispatch(searchModal(false, ""));
    }
  };

  return (
    <InputGroup className="m-2">
      <InputGroup.Text>
        <FontAwesomeIcon
          icon="search"
          className={isMobile ? "SearchIconMobile" : "SearchIcon"}
        />
      </InputGroup.Text>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleOnKeyDown}
        className={`${
          isMobile ? "SearchInputMobile" : "SearchInput"
        } InputSearchw form-control`}
        placeholder="Search foods..."
      />
    </InputGroup>
  );
}