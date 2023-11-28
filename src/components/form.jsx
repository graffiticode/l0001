import React, { useState, useEffect } from 'react';

function isNonNullObject(obj) {
  return (typeof obj === "object" && obj !== null);
}

let key = 1;

function renderJSON(data, depth = 0) {
  if (Array.isArray(data)) {
    const elts = data.map(dat => {
      const val = renderJSON(dat, depth + 1);
      return <div key={key++}>{val}</div>
    });
    return (
      <>
        <div key={key++}>[</div>
        {elts}
        <div key={key++}>]</div>
      </>
    );
  } else if (isNonNullObject(data)) {
    const keys = Object.keys(data);
    const elts = keys.map(key => {
      const val = renderJSON(data[key], depth + 2);
      if (typeof data[key] !== "function") {
        return <div key={key++}>{key}: {val}</div>
      } else {
        return "";
      }
    });
    return (
      <>
        <div key={key++}>{"{"}</div>
        <div className={`ml-${depth}`}>
          {elts}
        </div>
        <div key={key++}>{"}"}</div>
      </>
    );
  } else {
    return data;
  }
}

function render(data) {
  if (Array.isArray(data)) {
    const elts = data.map(dat => {
      const val = render(dat);
      return <div key={key++}>{val}</div>
    });
    return elts;
  } else if (isNonNullObject(data)) {
    switch (data.type) {
    case "b":
      return <b key={key++}>{data.elts}</b>;
    case "p":
      return <div key={key++}>{render(data.elts)}</div>;
    default:
      return <div key={key++}>{JSON.stringify(data)}</div>;
    }
  } else {
    return data;
  }
}

export const Form = ({ state }) => {
  return (
    <div className="bg-blue-100 p-2">
      { render(state) }
    </div>
  );
}
