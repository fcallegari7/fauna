import React from "react";
import { compose, withState, withHandlers } from "recompose";
import Autocomplete from "react-autocomplete";

var ApiService = require("../../services/Api").default;
var Api = new ApiService();

export const SearchAutocompleteLocation = compose(
  withState("valueId", "setIdValue", ""),
  withState("value", "setValue", ""),
  withState("items", "setItems", []),
  withState("requestTimer", "setRequestTimer", null),
  withHandlers({
    onSelect: ({ setIdValue, setValue, setItems, onChangeValue }) => searchBy => {
      setIdValue(searchBy.id);
      setValue(searchBy.name);
      onChangeValue(searchBy);
      setItems([]);
    },
    onChange: ({ setIdValue, setValue, setItems, requestTimer, setRequestTimer }) => (
      event,
      searchBy
    ) => {
      setIdValue(searchBy.id);
      setValue(searchBy.name);
      clearTimeout(requestTimer);
      const query = encodeURI(searchBy);
      const order_by = "created_at";
      const per_page = "5";
      const url_places = `places/autocomplete?q=${query}&order_by=${order_by}&per_page=${per_page}`;
      setRequestTimer(
        setTimeout(function() {
          Api.get(url_places).then(places => {console.log(places);
            places.results = places.results.map(item => {
              return { id: item.id, name: item.display_name };
            });
            const results = places.results;
            setItems(results);
          });
        }, 300)
      );
    }
  })
)(props => (
  <Autocomplete
    value={props.value}
    items={props.items}
    getItemValue={item => item.name}
    onSelect={props.onSelect}
    onChange={props.onChange}
    renderMenu={children => <div className="menu">{children}</div>}
    renderItem={(item, isHighlighted) => (
      <div
        className={`item ${isHighlighted ? "item-highlighted" : ""}`}
        key={item.id}
      >
        {item.name}
      </div>
    )}
  />
));
