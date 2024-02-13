import React, { useState, useEffect, useRef } from 'react';

function isNonNullObject(obj) {
  return (typeof obj === "object" && obj !== null);
}

function renderJSON(data, depth = 0) {
  return (
    <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
  );
}

function render({state}) {
  const { data } = state;
  if (data.hello) {
    return <span className="text-sm">{`hello, ${data.hello}!`}</span>;
  } else {
    return renderJSON(data);
  }
}

export const Form = ({ state, setHeight }) => {
  const ref = useRef();
  useEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, [ref.current, state.data]);

  return (
    <div className="bg-gray-100 p-2" ref={ref}>
      { render({state}) }
    </div>
  );
}
