import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { compile } from '../swr/fetchers';
import useSWR from 'swr';
import { Form } from "../components/form";
import { createState } from "../lib/state";

function isNonNullNonEmptyObject(obj) {
  return (
    typeof obj === "object" &&
      obj !== null &&
      Object.keys(obj).length > 0
  );
}

const View = () => {
  const router = useRouter();
  const { access_token: accessToken, id } = router.query || props;
  const [ recompile, setRecompile ] = useState(true);
  const [ height, setHeight ] = useState(0);
  useEffect(() => {
    console.log("L0001 View() id=" + id);
    // If `id` changes, then recompile.
    if (id) {
      setRecompile(true);
    }
  }, [id]);

  const [ state ] = useState(createState({}, (data, { type, args }) => {
    switch (type) {
    case "compiled":
      return {
        ...data,
        ...args,
      };
    case "change":
      setRecompile(true);
      return {
        ...data,
        ...args,
      };
    default:
      console.error(false, `Unimplemented action type: ${type}`);
      return data;
    }
  }));

  const resp = useSWR(
    recompile && accessToken && id && {
      accessToken,
      id,
      data: state.data,
    },
    compile
  );

  if (resp.data) {
    state.apply({
      type: "compiled",
      args: resp.data,
    });
    setRecompile(false);
  }

  useEffect(() => {
    window.parent.postMessage({height}, "*");
  }, [height]);

  return (
    isNonNullNonEmptyObject(state.data) &&
      <Form state={state} setHeight={setHeight} /> ||
      <div />
  );
}

export default View;
