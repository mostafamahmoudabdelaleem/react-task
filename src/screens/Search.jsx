import React, { useState } from "react";
import { search } from "../js/api_helper";
import Current from './Current';

export default function Search(props) {
  const [query, setQuery] = useState("");
  const [list, setlist] = useState([]);
  const [listIsHidden, setlistIsHidden] = useState(true);
  const [loc, setloc] = useState('');

  const handleOnChange = (e) => {
    let newVal = e.target.value;
    setQuery(newVal);
    if (newVal === "") {
      setlistIsHidden(true);
    } else {
      search(newVal)
        .then((resp) => {
          if (resp.length > 0) {
            setlist(resp);
            setlistIsHidden(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOnClick = (val) => {
    setQuery(val.name);
    setlistIsHidden(true);
    if(props.redirect === 'same-page'){
      setloc(val.name);
    }else{
      props.history.push(`current/${val.url}`);
    }
  };

  return (
    <>
      <div className="mid-container">
        <div className="autocomplete-container">
          <input
            className="autocomplete-input"
            type="text"
            value={query}
            onChange={handleOnChange}
            placeholder="Enter city name Eg.(Cairo)"
          />
          <div className="autocomplete-list" hidden={listIsHidden}>
            {list.map((v, i) => {
              return (
                <p onClick={() => handleOnClick(v)} key={i}>
                  {v.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      {loc === '' ? '' : <Current location={loc} />}
    </>
  );
}
