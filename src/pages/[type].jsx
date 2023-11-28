import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { compile } from '../swr/fetchers';
import { Form } from '../components/form';

function isNonNullObject(obj) {
  return (
    typeof obj === "object" &&
      obj !== null &&
      Object.keys(JSON.parse(JSON.stringify(obj))).length !== 0
  );
}

let ticket = 1;

const View = (props = {}) => {
  const router = useRouter();
  const { access_token: accessToken, id } = router.query;
  const [ data, setData ] = useState({});
  const resp = useSWR(
    accessToken && id && {
      accessToken,
      id,
      data,
    },
    compile
  );

  const state = {
    ...data,
    ...resp.data,
    apply({ type, args = [] }) {
      // Apply actions to state.
      switch (type) {
      default:
        setData({
          ...state,
          // updated data here
        });
        break;
      }
    },
  };

  return (
    isNonNullObject(state)
      && <Form state={state} />
      || <div />
  );
}

export default View;
