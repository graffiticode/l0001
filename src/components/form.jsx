import React, { useState, useEffect } from 'react';

function isNonNullObject(obj) {
  return (typeof obj === "object" && obj !== null);
}

let ticket = 1;

function renderJSON(data, depth = 0) {
  const x = depth * 15;
  if (Array.isArray(data)) {
    const elts = data.map(dat => {
      const val = renderJSON(dat, depth + 1);
      return <p key={ticket++}>{val}</p>
    });
    return (
      <>
        <div key={ticket++}>[</div>
        {elts}
        <div key={ticket++}>]</div>
      </>
    );
  } else if (isNonNullObject(data)) {
    data = JSON.parse(JSON.stringify(data));
    const keys = Object.keys(data);
    const elts = keys.map(key => {
      const val = renderJSON(data[key], depth + 1);
      if (typeof data[key] !== "function") {
        return <p key={ticket++}>{key}: {val}</p>
      } else {
        return "";
      }
    });
    return (
      elts.length === 0
        && <div />
        || <>
             <div key={ticket++}>{"{"}</div>
             {elts}
             <div key={ticket++}>{"}"}</div>
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
      return <p key={ticket++}>{val}</p>
    });
    return elts;
  } else if (isNonNullObject(data)) {
    switch (data.type) {
    case "b":
      return <b key={ticket++}>{data.elts}</b>
    case "p":
      return <p key={ticket++}>{render(data.elts)}</p>
    default:
      return renderJSON(data);
    }
  } else {
    return data;
  }  
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Form = ({ state }) => {
  return (
    <div className="bg-blue-100 p-2">
      { render(state) }
    </div>
  );
}
