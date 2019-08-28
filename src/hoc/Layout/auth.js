import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getUser } from '../../store/actions';

export default function (ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
        state = {
          loading: true,
        };

        componentDidMount() {
          (async () => {
            try {
              await this.props.getUser();
              if (!this.props.user.isAuth) {
                if (reload) {
                  this.props.history.push('/registerLogin');
                }
              } else if (adminRoute && !this.props.user.isAdmin) {
                this.props.history.push('/user/dashBoard');
              } else if (reload === false) {
                this.props.history.push('/user/dashBoard');
              }
            } catch (e) {
              console.log(`error in componentDidMount:AuthenticationCheck ${e}`);
              if (reload) {
                this.props.history.push('/registerLogin');
              }
            } finally {
              this.setState({ loading: false });
            }
          })();
        }

        render() {
          if (this.state.loading) {
            return (
              <div className="main_loader">
                <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
              </div>
            );
          }
          return (
            <ComposedClass {...this.props} user={this.props.user} />
          );
        }
  }

  const mapStateToProps = state => {
    return {
      user: state.user.user,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      getUser: () => dispatch(getUser()),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}
