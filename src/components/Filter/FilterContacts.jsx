import PropTypes from 'prop-types';
import css from './FilterContacts.module.css';
import { useState } from 'react';

export const FilterContacts = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setSearchTerm(value);
    onFilter(value);
  };

  return (
    <>
      <h3 className={css.info}>Find contacts by name</h3>
      <label className={css.labelFilter}>
        <input
          type="text"
          className={css.filterInput}
          value={searchTerm}
          onChange={handleChange}
        />
      </label>
    </>
  );
};

FilterContacts.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
