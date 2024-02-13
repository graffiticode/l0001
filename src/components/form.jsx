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
  if (data.val) {
    return data.val;
  } else {
    return renderJSON(data);
  }
}

export const Form = ({ state, setHeight }) => {
  console.log("Form() state=" + JSON.stringify(state, null, 2));
  const ref = useRef();
  useEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, [ref.current]);

  return (
    <div className="bg-gray-100 p-2" ref={ref}>
      { render({state}) }
    </div>
  );
}
