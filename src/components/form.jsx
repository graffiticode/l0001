import React, { useState, useEffect } from 'react';

function isNonNullObject(obj) {
  return (typeof obj === "object" && obj !== null);
}

function renderJSON(data, depth = 0) {
  return (
    <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
  );
}

function render(data) {
  console.log("render() data=" + JSON.stringify(data));
  if (isNonNullObject(data)) {
    return renderJSON(data);
  } else {
    return data;
  }
}

export const Form = ({ state }) => {
  return (
    <div className="bg-gray-100 p-2">
      { render(state.val) }
    </div>
  );
}
