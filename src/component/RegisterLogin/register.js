import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

import { registerUser } from '../../store/actions';
import { prepareFormData, update } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';

class Register extends Component {
    state = {
      formError: false,
      formSuccess: false,
      formData: {
        name: {
          element: 'input',
          value: '',
          config: {
            name: 'name_input',
            type: 'text',
            placeholder: 'Enter your name',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
        lastName: {
          element: 'input',
          value: '',
          config: {
            name: 'lastName_input',
            type: 'text',
            placeholder: 'Enter your last name',
          },
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
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
        confirmPassword: {
          element: 'input',
          value: '',
          config: {
            name: 'confirm_password_input',
            type: 'password',
            placeholder: 'Confirm your password',
          },
          validation: {
            required: true,
            confirm: 'password',
          },
          valid: false,
          touched: false,
          validationMessage: '',
        },
      },
    };

    _submitForm = async event => {
      event.preventDefault();
      const { data: _data, formIsValid } = prepareFormData(this.state.formData, 'login');
      delete _data.confirmPassword;
      _data.firstName = _data.name;
      if (formIsValid) {
        try {
          const _register = await this.props.register(_data);
          this.setState({
            formError: false,
            formSuccess: true,
          });
          setTimeout(() => {
            this.props.history.push('/registerLogin');
          }, 3000);
          console.log(_register);
        } catch (e) {
          console.log(e);
          this.setState({ formError: true });
        }
      }
    };

    updateForm = element => {
      const updatedFormData = update(element, this.state.formData, 'register');
      this.setState({
        formError: false,
        formData: updatedFormData,
      });
    };

    render() {
      return (
        <div className="page_wrapper">
          <div className="container">
            <div className="register_login_container">
              <div className="left">
                <form onSubmit={(event) => this._submitForm(event)}>
                  <h2>Personal information</h2>
                  <div className="form_block_two">
                    <div className="block">
                      <FormField
                        id="name"
                        formData={this.state.formData.name}
                        change={(element) => this.updateForm(element)}
                      />
                    </div>
                    <div className="block">
                      <FormField
                        id="lastName"
                        formData={this.state.formData.lastName}
                        change={(element) => this.updateForm(element)}
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      id="email"
                      formData={this.state.formData.email}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <h2>Verify password</h2>
                  <div className="form_block_two">
                    <div className="block">
                      <FormField
                        id="password"
                        formData={this.state.formData.password}
                        change={(element) => this.updateForm(element)}
                      />
                    </div>
                    <div className="block">
                      <FormField
                        id="confirmPassword"
                        formData={this.state.formData.confirmPassword}
                        change={(element) => this.updateForm(element)}
                      />
                    </div>
                  </div>
                  <div>
                    { this.state.formError && (
                    <div className="error_label">
                                Please check your data
                    </div>
                    )}
                    <button type="button" onClick={(event) => this._submitForm(event)}>
                      {this.props.loading ? <CircularProgress size={28} /> : 'Create an account'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Dialog open={this.state.formSuccess}>
            <div className="dialog_alert">
              <div>Congratulations !!</div>
              <div>You will be redirected to the LOGIN in a couple seconds...</div>
            </div>
          </Dialog>
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
    register: data => dispatch(registerUser(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);
