import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { compile } from '../swr/fetchers';
import { Form } from '../components/form';

function isNonNullObject(obj) {
  return (typeof obj === "object" && obj !== null);
}

let ticket = 1;

const View = (props = {}) => {
  const router = useRouter();
  const [elts, setElts] = useState([]);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
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

  console.log("Form() state=" + JSON.stringify(state, null, 2));

  const { isLoading } = resp;

  return (
    <Form state={state} />
  );
}

export default View;
