import React from 'react';
import { compose, withState, withHandlers } from "recompose";
import Autocomplete from 'react-autocomplete';

var ApiService = require('../../services/Api').default;
var Api = new ApiService();

export const SearchAutocomplete = compose(
  withState('value', 'setValue', ''),
  withState('items', 'setItems', []),
  withState('requestTimer', 'setRequestTimer', null),
  withHandlers({
    onSelect: ({setValue, setItems, onChangeValue}) => (searchBy) => {
      setValue(searchBy);
      onChangeValue(searchBy);
      setItems([]);
    },
    onChange: ({setValue, setItems, requestTimer, setRequestTimer}) => (event, searchBy) => {
      setValue(searchBy);
      clearTimeout(requestTimer);
      const query = encodeURI(searchBy);
      const order_by = 'created_at';
      const per_page = '5';
      const url_places = `places/autocomplete?q=${query}&order_by=${order_by}&per_page=${per_page}`;
      const url_taxa = `taxa/autocomplete?q=${query}&is_active=true&order_by=${order_by}&per_page=${per_page}`;
      setRequestTimer(
        setTimeout(function(){
          Api.get(url_taxa).then(taxon => {
            taxon.results = taxon.results.slice(0,per_page).map(item => {
              return {id: item.id, name: item.preferred_common_name};
            });
            Api.get(url_places).then(places => {
              places.results = places.results.map(item => {
                return {id: item.id, name: item.display_name};
              });
              const results = taxon.results.concat(places.results);
              setItems(results);
            });
          });
        }, 300)
      );
    }
  })
)(props =>
  <Autocomplete
    value={props.value}
    items={props.items}
    getItemValue={(item) => item.name}
    onSelect={props.onSelect}
    onChange={props.onChange}
    renderMenu={children => (
      <div className="menu">
        {children}
      </div>
    )}
    renderItem={(item, isHighlighted) => (
      <div
        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
        key={item.id}
      >{item.name}</div>
    )}
  />
);
