import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import FormField from '../utils/Form/formfield';
import { prepareFormData, update } from '../utils/Form/formActions';
import { tryAuth } from '../../store/actions';

class Login extends Component {
    state = {
      formError: false,
      formSuccess: '',
      formData: {
        email: {
          element: 'input',
          value: '',
          config: {
            name: 'email_input',
            type: 'email',
            placeholder: 'Enter your email',
          },
          validation: {
            required: true,
            email: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password_input',
            type: 'password',
            placeholder: 'Enter your password',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
      },
    };

    updateForm = element => {
      const updatedFormData = update(element, this.state.formData, 'login');
      this.setState({
        formError: false,
        formData: updatedFormData,
      });
    };

    _submitForm = async event => {
      event.preventDefault();
      const { data: _data, formIsValid } = prepareFormData(this.state.formData, 'login');
      if (formIsValid) {
        try {
          const _tryAuth = await this.props.tryAuth(_data);
          this.props.history.push('/');
          console.log(_tryAuth);
        } catch (e) {
          this.setState({ formError: true });
        }
      }
    };

    render() {
      const { formData, formError } = this.state;
      return (
        <div className="signin_wrapper">
          <form onSubmit={(event) => this._submitForm(event)}>

            <FormField
              id="email"
              formData={formData.email}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id="password"
              formData={formData.password}
              change={(element) => this.updateForm(element)}
            />

            {formError && <div className="error_label">Invalid Username or Password</div>}
            <button type="button" onClick={(event) => this._submitForm(event)}>
              {this.props.loading ? <CircularProgress size={28} /> : 'Log in'}
            </button>
          </form>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    loading: state.ui.formLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAuth: data => dispatch(tryAuth(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
