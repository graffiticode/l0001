import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as d3 from 'd3';
//import './style.css';

function isNonNullObject(obj) {
  return (typeof obj === "object" && obj !== null);
}

function renderAttr(attr) {
  Object.keys(attr).forEach(key => {
    if (key.indexOf('on') === 0) {
      attr[key] = new Function('e', attr[key]);
    }
  });
  return attr;
}

let ticket = 1;

function renderJSON(data, depth = 0) {
  if (isNonNullObject(data)) {
    console.log("renderJSON() data=" + JSON.stringify(data, null, 2));
    const keys = Object.keys(data);
    const x = depth * 15;
    const elts = keys.map(key => {
      const val = renderJSON(data[key], depth + 1);
      return <tspan key={ticket++} x={x} dy="1rem">{key}: {val}</tspan>
    });
    console.log("renderJSON() elts=" + JSON.stringify(elts, null, 2));
    return elts;
  } else {
    return data;
  }
}

function render(data) {
  data = [].concat(data);
  const elts = [];
  data.forEach(d => {
    if (d === undefined) {
      return;
    }
    switch(d.type) {
    case 'b':
      elts.push(<b key={ticket++}>{render(d.elts)}</b>);
      break;
    default:
      if (isNonNullObject(d)) {
        d = renderJSON(d);
      }
      elts.push(<text key={ticket++} x="10" y="50" font-family="monospace">{d}</text>);
      break;
    }
  });
  return elts;
}

const Form = () => {
  const [ elts, setElts ] = useState([]);
  const router = useRouter();
  const { type, data } = router.query;
  useEffect(() => {
    if (data === undefined) {
      return;
    }
    console.log("Form() data=" + data);
    d3.select("svg").html("");
    const { url } = JSON.parse(data);
    console.log("Form() url=" + url);
    (async () => {
      const resp = await fetch(
        url,
        {
          headers: {'Content-Type': 'application/json'},
        }
      );
      const { data } = await resp.json();
      if (data === undefined) {
        return;
      }
      try {
        setElts(render(data));
      } catch (x) {
        // Bad data.
        console.log("Bad data in query: " + x);
      }
    })();
  }, [data]);
  return (
    <div key={ticket++} id="graffiti">
      <svg key={ticket++} height="100%">
        {elts}
      </svg>
    </div>
  );
}

export default Form;
