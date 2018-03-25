import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import urlRegex from 'url-regex';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_POST = gql`
  mutation addPost($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      description
    }
  }
`;

const initialValues = {
  url: '',
  description: '',
};
const validate = values => {
  const errors = {};
  if (values.url.trim().length === 0) errors.url = 'missing';
  else if (!urlRegex({ exact: true }).test(values.url.trim()))
    errors.url = 'invalid';
  if (values.description.trim().length === 0) errors.description = 'missing';
  return errors;
};
export const AddPostForm = props => (
  <Mutation
    mutation={ADD_POST}
    update={(cache, { data: { post } }) => {
      // We need to manually update the cache for all queries using this info
      // https://www.apollographql.com/docs/react/essentials/mutations.html#update
      const { feed } = cache.readQuery({ query: props.query });
      cache.writeQuery({
        query: props.query,
        data: { feed: [...feed, post] },
      });
    }}
  >
    {mutate => (
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, formikBag) =>
          mutate({ variables: values }).then(res => {
            formikBag.resetForm();
            return res;
          })
        }
        render={formikBag => (
          <form onSubmit={formikBag.handleSubmit}>
            <label htmlFor="url">
              <p>Url</p>
              <input
                type="text"
                id="url"
                name="url"
                value={formikBag.values.url}
                onChange={formikBag.handleChange}
                onBlur={formikBag.handleBlur}
              />
              {formikBag.touched.url &&
                formikBag.errors.url === 'missing' && <div>Missing value</div>}
              {formikBag.touched.url &&
                formikBag.errors.url === 'invalid' && <div>Invalid value</div>}
            </label>
            <label htmlFor="description">
              <p>Description</p>
              <input
                type="text"
                id="description"
                name="description"
                value={formikBag.values.description}
                onChange={formikBag.handleChange}
                onBlur={formikBag.handleBlur}
              />
              {formikBag.touched.description &&
                formikBag.errors.description === 'missing' && (
                  <div>Missing value</div>
                )}
              <div>
                <input type="submit" disabled={formikBag.isSubmitting} />
              </div>
            </label>
          </form>
        )}
      />
    )}
  </Mutation>
);

AddPostForm.propTypes = {
  query: PropTypes.object.isRequired,
};
