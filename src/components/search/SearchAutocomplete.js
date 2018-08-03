import React from 'react';
import { compose, withState, withHandlers, withProps} from "recompose";
import Autocomplete from 'react-autocomplete';
import { debounce } from 'lodash'

const PlaceIcon = require('../../images/pin.svg');
const AnimalIcon = require('../../images/raccoon.svg');
const ReptiliaIcon = require('../../images/reptile.svg');
const AvesIcon = require('../../images/bird.svg');
const MammaliaIcon = require('../../images/coyote.svg');

const ApiService = require('../../services/Api').default;
const Api = new ApiService();

export const SearchAutocomplete = compose(
  withState('value', 'setValue', ''),
  withState('items', 'setItems', []),
  withProps({
    getData: debounce((searchBy, setItems) => {
      if (searchBy.length < 3) {
        setItems([]);
        return;
      }

      const query = encodeURI(searchBy.toLowerCase());
      const order_by = 'created_at';
      const per_page = '5';
      const url_places = `places/autocomplete?q=${query}&order_by=${order_by}&per_page=${per_page}`;
      const url_taxa = `taxa/autocomplete?q=${query}&is_active=true&order_by=${order_by}&per_page=${per_page}`;
      Api.get(url_taxa).then(taxon => {
        taxon.results = taxon.results.slice(0,per_page).map(item => {
          let icon = '';
          if (item.iconic_taxon_name === 'Amphibia' || item.iconic_taxon_name === 'Mammalia') {
            icon = MammaliaIcon;
          }
          else if (item.iconic_taxon_name === 'Reptilia') {
            icon = ReptiliaIcon;
          }
          else if (item.iconic_taxon_name === 'Aves') {
            icon = AvesIcon;
          }
          else {
            icon = AnimalIcon;
          }
          return {id: item.id, type: 'animal', icon: icon, name: (item.preferred_common_name ? item.preferred_common_name : item.name), wikipedia_url: item.wikipedia_url};
        });
        Api.get(url_places).then(places => {
          places.results = places.results.map(item => {
            let position = {
              latitude: null,
              longitude: null
            };
            if (item.location) {
              let location = item.location.split(',');
              position = {
                latitude: parseFloat(location[0]),
                longitude: parseFloat(location[1])
              }
            }
            return {id: item.id, type: 'place', icon: PlaceIcon, name: item.display_name, position: position};
          });
          const results = taxon.results.concat(places.results);
          setItems(results);
        });
      });
    }, 500)
  }),
  withHandlers({
    onSelect: ({setValue, setItems, onChangeValue}) => (searchBy, item) => {
      setValue('');
      setItems([]);
      onChangeValue(item);
    },
    onChange: ({setValue, getData, setItems}) => (event, searchBy) => {
      setValue(searchBy);
      getData(searchBy, setItems);
    },
    onKeyPress: ({setValue, items, setItems, onChangeValue}) => (event) => {
      if(event.key === "Enter"){
        let searchBy = items.shift();
        setValue('');
        setItems([]);
        onChangeValue(searchBy);
      }
    }
  }),
)(props =>
  <Autocomplete
    value={props.value}
    items={props.items}
    getItemValue={(item) => item.name}
    onSelect={props.onSelect}
    onChange={props.onChange}
    sortItems={(a,b,c) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }}
    inputProps={{
      placeholder: "Search",
      onKeyPress: props.onKeyPress,
      autoFocus: true
    }}
    renderMenu={children => (
      <div className={children.length ? "menu" : ''}>
        {children}
      </div>
    )}
    wrapperProps={{className: 'searchFormInput'}}
    renderItem={(item, isHighlighted) => (
      <div
        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
        key={item.id}
      >
        {item.type==='place' && <img className="button-icon" src={item.icon} alt="" />}
        {item.type==='animal' && <img className="button-icon" src={AnimalIcon} alt="" />}
        <span>{item.name}</span>
      </div>
    )}
    menuStyle={{
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: '#FFF',
      padding: '2px 0',
      fontSize: '90%',
      position: 'absolute',
      overflow: 'auto',
      maxHeight: '50%',
    }}
  />
);
