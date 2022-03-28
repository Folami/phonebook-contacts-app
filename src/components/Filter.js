import React from 'react';

const Filter = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
           Filter Contacts : <input value={props.filter} onChange={props.handleFilter} />
        <div>
        </div>
          <button type="submit">Display Filtered List</button>
        </div>
      </form>
    );
  };
  
  export default Filter;