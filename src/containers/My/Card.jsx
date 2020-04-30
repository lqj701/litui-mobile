import React from 'react';
import propsType from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'core/components/Spinner';

import { getWxUserQrcode } from '../../actions/user';
import UserCard from '../Setting/UserCard';

class MyCard extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    userInfo: propsType.object,
    qrcode: propsType.object,
  };

  componentDidMount() {
    if (!this.props.userInfo) {
      return;
    }

    const { wxUser } = this.props.userInfo;
    this.fetchQrcode(wxUser);
  }

  fetchQrcode(wxUser) {
    this.props.dispatch(
      getWxUserQrcode(wxUser.wxOrganizationId, AppConf.api.salesToken)
    );
  }

  render() {
    const { userInfo, qrcode } = this.props;

    if (!userInfo) {
      return <Spinner />;
    }

    const { wxUser } = userInfo;

    return (
      <UserCard
        name={wxUser.name}
        job={wxUser.position}
        phone={wxUser.phone1}
        company={userInfo.websiteName}
        avatar={wxUser.avatar}
        qcode={qrcode}
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    user: { userInfo, qrcode },
  } = state;

  return { userInfo, qrcode };
}
export default connect(mapStateToProps)(MyCard);
