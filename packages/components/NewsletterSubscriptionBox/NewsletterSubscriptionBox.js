/* eslint-env browser */
import React from 'react';
import {
  PrimaryButton,
  Flex,
  Box,
  Input,
  ErrorMessage,
  SuccessMessage,
} from '@wa/design-system';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SUBSCRIBE_MUTATION = gql`
  mutation SubscribeMutation($email: String!) {
    subscribe(email: $email) {
      email
    }
  }
`;

export class NewsletterSubscriptionBox extends React.Component {
  static displayName = 'NewsletterSubscriptionBox';
  state = { subscribed: false };
  handleSuccessfulSubscription = formikBag => {
    formikBag.setSubmitting(false);
    formikBag.resetForm();
    this.setState({ subscribed: true });
  };
  render() {
    return (
      <Mutation mutation={SUBSCRIBE_MUTATION}>
        {subscribe => (
          <Formik
            validate={values => {
              // same as above, but feel free to move this into a class method now.
              const errors = {};
              if (!values.subscribeEmail) {
                errors.subscribeEmail = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                  values.subscribeEmail
                )
              ) {
                errors.subscribeEmail = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(formValues, formikBag) =>
              subscribe({
                variables: { email: formValues.subscribeEmail },
              }).then(
                () => {
                  this.handleSuccessfulSubscription(formikBag);
                },
                error => {
                  if (
                    error.graphQLErrors &&
                    error.graphQLErrors.some(
                      graphQlError => graphQlError.code === 3010
                    )
                  ) {
                    this.handleSuccessfulSubscription(formikBag);
                  } else {
                    formikBag.setErrors({ unkownError: true });
                    formikBag.setSubmitting(false);
                  }
                }
              )
            }
            render={formik => (
              <form onSubmit={formik.handleSubmit}>
                <Flex py={4} alignItems="baseline">
                  <Box width={2 / 4} px={2}>
                    <Input
                      name="subscribeEmail"
                      placeholder="Email"
                      value={formik.values.subscribeEmail}
                      disabled={formik.isSubmitting}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      px={2}
                    />
                    {this.state.subscribed && (
                      <SuccessMessage>
                        You&#39;ve been subscribed
                      </SuccessMessage>
                    )}
                    {formik.touched.subscribeEmail && (
                      <ErrorMessage>
                        {formik.errors.subscribeEmail}
                      </ErrorMessage>
                    )}
                    {formik.errors.unkownError && (
                      <ErrorMessage>
                        Something went wrong! Please try again
                      </ErrorMessage>
                    )}
                  </Box>
                  <Box width={1 / 4} px={2}>
                    <PrimaryButton disabled={formik.isSubmitting}>
                      Subscribe
                    </PrimaryButton>
                  </Box>
                </Flex>
              </form>
            )}
          />
        )}
      </Mutation>
    );
  }
}
