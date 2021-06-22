import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onFilter }) => (
  <fieldset className={styles.Filter}>
    <legend className={styles.legend}>Quickly find the right contact</legend>
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        type="text"
        name="filter"
        value={value}
        onChange={onFilter}
      />
    </label>
  </fieldset>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
export default Filter;
