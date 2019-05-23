import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string,
  email: PropTypes.string.isRequired
});
