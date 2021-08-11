import { connect } from 'react-redux';
import MoreResults from 'src/components/MoreResults';
import {showMoreResults} from 'src/actions/moreResults'

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onClickButton: () => {
    console.log('showmore result pass')
    dispatch(showMoreResults())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreResults);